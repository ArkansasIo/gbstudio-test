// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Universe/OGameUniverseManager.h"
#include "Universe/OGameSolarSystem.h"
#include "Universe/OGamePlanet.h"
#include "Fleet/OGameFleet.h"
#include "Combat/OGameCombatManager.h"
#include "Math/UnrealMathUtility.h"

UOGameUniverseManager::UOGameUniverseManager()
{
}

void UOGameUniverseManager::InitializeUniverse(int32 NumGalaxies, int32 NumSystems)
{
    MaxGalaxies = NumGalaxies;
    MaxSystems  = NumSystems;
    SolarSystems.Empty();
    ActiveFleets.Empty();
    PlanetIndex.Empty();

    UE_LOG(LogTemp, Log, TEXT("Universe initialized: %d galaxies x %d systems"), MaxGalaxies, MaxSystems);
}

UOGameSolarSystem* UOGameUniverseManager::GetOrCreateSystem(int32 Galaxy, int32 System)
{
    FString Key = MakeSystemKey(Galaxy, System);
    if (UOGameSolarSystem** Found = SolarSystems.Find(Key))
    {
        return *Found;
    }

    UOGameSolarSystem* NewSystem  = NewObject<UOGameSolarSystem>(this);
    NewSystem->GalaxyIndex        = Galaxy;
    NewSystem->SystemIndex        = System;
    NewSystem->StarName           = FString::Printf(TEXT("Star-%d-%d"), Galaxy, System);
    SolarSystems.Add(Key, NewSystem);
    return NewSystem;
}

UOGameSolarSystem* UOGameUniverseManager::GetSolarSystem(int32 Galaxy, int32 System) const
{
    FString Key = MakeSystemKey(Galaxy, System);
    UOGameSolarSystem* const* Found = SolarSystems.Find(Key);
    return Found ? *Found : nullptr;
}

UOGamePlanet* UOGameUniverseManager::GetPlanet(const FCoordinates& Coords) const
{
    UOGameSolarSystem* Sys = GetSolarSystem(Coords.Galaxy, Coords.System);
    return Sys ? Sys->GetPlanetAtPosition(Coords.Position) : nullptr;
}

UOGamePlanet* UOGameUniverseManager::GetPlanetById(const FString& PlanetId) const
{
    UOGamePlanet* const* Found = PlanetIndex.Find(PlanetId);
    return Found ? *Found : nullptr;
}

FString UOGameUniverseManager::FindAndAssignFreePlanet(const FString& PlayerId)
{
    // Search galaxy 1 first, then expand outward
    for (int32 G = 1; G <= MaxGalaxies; ++G)
    {
        // Pick a random system in that galaxy
        for (int32 Attempt = 0; Attempt < 50; ++Attempt)
        {
            int32 S = FMath::RandRange(1, MaxSystems);
            UOGameSolarSystem* System = GetOrCreateSystem(G, S);
            int32 FreePos = System->GetFirstFreePosition();
            if (FreePos > 0)
            {
                UOGamePlanet* Planet = System->CreatePlanetAtPosition(FreePos, PlayerId, TEXT(""));
                if (Planet)
                {
                    PlanetIndex.Add(Planet->PlanetId, Planet);
                    return Planet->PlanetId;
                }
            }
        }
    }
    return FString();
}

UOGamePlanet* UOGameUniverseManager::ColonizePlanet(const FCoordinates& Coords,
                                                      const FString& PlayerId,
                                                      const FString& Name)
{
    UOGameSolarSystem* System = GetOrCreateSystem(Coords.Galaxy, Coords.System);
    if (!System || !System->IsPositionFree(Coords.Position))
    {
        return nullptr;
    }

    UOGamePlanet* Planet = System->CreatePlanetAtPosition(Coords.Position, PlayerId, Name);
    if (Planet)
    {
        PlanetIndex.Add(Planet->PlanetId, Planet);
    }
    return Planet;
}

FString UOGameUniverseManager::LaunchFleet(const FString& OwnerPlayerId,
                                             const FCoordinates& Origin,
                                             const FCoordinates& Destination,
                                             const FFleetComposition& Ships,
                                             const FResources& Cargo,
                                             EFleetMission Mission)
{
    UOGamePlanet* OriginPlanet = GetPlanet(Origin);
    if (!OriginPlanet)
    {
        return FString();
    }

    if (!OriginPlanet->SendFleet(Ships, Cargo))
    {
        return FString();
    }

    // Build research map (simplified: empty - full integration requires PlayerState lookup)
    TMap<EResearchType, int32> EmptyResearch;
    double Speed       = UOGameFleet::CalculateFleetSpeed(Ships, EmptyResearch);
    FTimespan TravelT  = UOGameFleet::CalculateTravelTime(Origin, Destination, Speed);
    double FuelCost    = UOGameFleet::CalculateFuelCost(Ships, Origin, Destination, Speed);

    UOGameFleet* Fleet       = NewObject<UOGameFleet>(this);
    Fleet->FleetId           = FString::Printf(TEXT("fleet_%s_%lld"), *OwnerPlayerId, FDateTime::UtcNow().GetTicks());
    Fleet->OwnerPlayerId     = OwnerPlayerId;
    Fleet->Ships             = Ships;
    Fleet->CargoLoad         = Cargo;
    Fleet->Origin            = Origin;
    Fleet->Destination       = Destination;
    Fleet->Mission           = Mission;
    Fleet->DepartureTime     = FDateTime::UtcNow();
    Fleet->ArrivalTime       = FDateTime::UtcNow() + TravelT;
    Fleet->FuelConsumed      = FuelCost;

    ActiveFleets.Add(Fleet);

    UE_LOG(LogTemp, Log, TEXT("Fleet %s launched from %s to %s, ETA: %.0f s"),
           *Fleet->FleetId, *Origin.ToString(), *Destination.ToString(),
           TravelT.GetTotalSeconds());

    return Fleet->FleetId;
}

bool UOGameUniverseManager::RecallFleet(const FString& FleetId)
{
    for (UOGameFleet* Fleet : ActiveFleets)
    {
        if (Fleet && Fleet->FleetId == FleetId && !Fleet->bIsReturning)
        {
            Fleet->Recall();
            return true;
        }
    }
    return false;
}

TArray<UOGameFleet*> UOGameUniverseManager::GetFleetsOwnedBy(const FString& PlayerId) const
{
    TArray<UOGameFleet*> Result;
    for (UOGameFleet* Fleet : ActiveFleets)
    {
        if (Fleet && Fleet->OwnerPlayerId == PlayerId)
        {
            Result.Add(Fleet);
        }
    }
    return Result;
}

TArray<UOGameFleet*> UOGameUniverseManager::GetFleetsTargeting(const FCoordinates& Coords) const
{
    TArray<UOGameFleet*> Result;
    for (UOGameFleet* Fleet : ActiveFleets)
    {
        if (Fleet && Fleet->Destination == Coords && !Fleet->bIsReturning)
        {
            Result.Add(Fleet);
        }
    }
    return Result;
}

void UOGameUniverseManager::TickAllPlanetsProduction()
{
    TMap<EResearchType, int32> EmptyResearch;
    for (auto& Pair : SolarSystems)
    {
        UOGameSolarSystem* System = Pair.Value;
        if (!System) continue;

        for (UOGamePlanet* Planet : System->Planets)
        {
            if (Planet && !Planet->OwnerPlayerId.IsEmpty())
            {
                Planet->ProduceResources(1.0f, EmptyResearch);
            }
        }
    }
}

void UOGameUniverseManager::TickAllFleets()
{
    TArray<UOGameFleet*> ArrivedFleets;

    for (UOGameFleet* Fleet : ActiveFleets)
    {
        if (Fleet && Fleet->HasArrived())
        {
            ArrivedFleets.Add(Fleet);
        }
    }

    for (UOGameFleet* Fleet : ArrivedFleets)
    {
        ArriveFleet(Fleet);
        ActiveFleets.Remove(Fleet);
    }
}

void UOGameUniverseManager::TickAllBuildingQueues()
{
    for (auto& Pair : SolarSystems)
    {
        UOGameSolarSystem* System = Pair.Value;
        if (!System) continue;

        for (UOGamePlanet* Planet : System->Planets)
        {
            if (Planet && Planet->IsBuildingComplete())
            {
                Planet->CompleteBuilding();
            }
        }
    }
}

void UOGameUniverseManager::ArriveFleet(UOGameFleet* Fleet)
{
    if (!Fleet) return;

    UOGamePlanet* DestPlanet = GetPlanet(Fleet->Destination);

    if (Fleet->bIsReturning)
    {
        // Return fleet to origin planet
        UOGamePlanet* OriginPlanet = GetPlanet(Fleet->Origin);
        if (OriginPlanet)
        {
            OriginPlanet->ReceiveFleet(Fleet->Ships, Fleet->CargoLoad);
            UE_LOG(LogTemp, Log, TEXT("Fleet %s returned to %s"), *Fleet->FleetId, *Fleet->Origin.ToString());
        }
        return;
    }

    switch (Fleet->Mission)
    {
        case EFleetMission::Transport:
        case EFleetMission::Deploy:
            if (DestPlanet)
            {
                DestPlanet->ReceiveFleet(Fleet->Ships, Fleet->CargoLoad);
            }
            break;

        case EFleetMission::Attack:
            if (DestPlanet && DestPlanet->OwnerPlayerId != Fleet->OwnerPlayerId)
            {
                TArray<UOGameFleet*> Attackers;
                Attackers.Add(Fleet);
                ResolveCombat(DestPlanet, Attackers);
            }
            break;

        case EFleetMission::Colonize:
            if (!DestPlanet)
            {
                ColonizePlanet(Fleet->Destination, Fleet->OwnerPlayerId, TEXT("Colony"));
            }
            break;

        case EFleetMission::Recycle:
            if (DestPlanet)
            {
                Fleet->CargoLoad = Fleet->CargoLoad + DestPlanet->DebrisField;
                DestPlanet->DebrisField = FResources();
                // Fleet returns home
                Fleet->bIsReturning = true;
                Fleet->Destination  = Fleet->Origin;
                FTimespan ReturnTime = UOGameFleet::CalculateTravelTime(
                    Fleet->ArrivalTime == Fleet->DepartureTime ? Fleet->Origin : Fleet->Destination,
                    Fleet->Origin,
                    1.0);
                Fleet->ArrivalTime = FDateTime::UtcNow() + ReturnTime;
                ActiveFleets.Add(Fleet);
            }
            break;

        case EFleetMission::Espionage:
            UE_LOG(LogTemp, Log, TEXT("Espionage fleet %s arrived at %s"),
                   *Fleet->FleetId, *Fleet->Destination.ToString());
            // Espionage report generation handled elsewhere
            Fleet->bIsReturning = true;
            Fleet->Destination  = Fleet->Origin;
            Fleet->ArrivalTime  = FDateTime::UtcNow() +
                FTimespan::FromSeconds(30.0);
            ActiveFleets.Add(Fleet);
            break;

        default:
            break;
    }
}

void UOGameUniverseManager::ResolveCombat(UOGamePlanet* DefenderPlanet,
                                           TArray<UOGameFleet*>& AttackingFleets)
{
    // Delegate to the combat manager
    UOGameCombatManager* CombatMgr = NewObject<UOGameCombatManager>(this);
    FCombatReport Report = CombatMgr->ResolveBattle(DefenderPlanet, AttackingFleets);

    UE_LOG(LogTemp, Log, TEXT("Combat at %s - Outcome: %d"),
           *DefenderPlanet->Coordinates.ToString(),
           static_cast<int32>(Report.Outcome));
}

void UOGameUniverseManager::ProcessPendingCombats()
{
    // Processed inline in TickAllFleets -> ArriveFleet
}

FString UOGameUniverseManager::GetGalaxyMapText(int32 Galaxy) const
{
    FString Map = FString::Printf(TEXT("=== Galaxy %d ===\n"), Galaxy);
    for (int32 S = 1; S <= MaxSystems; ++S)
    {
        const UOGameSolarSystem* Sys = GetSolarSystem(Galaxy, S);
        if (!Sys) continue;

        for (int32 P = 1; P <= UOGameSolarSystem::MAX_POSITIONS; ++P)
        {
            const UOGamePlanet* Planet = Sys->GetPlanetAtPosition(P);
            if (Planet)
            {
                Map += FString::Printf(TEXT("[%d:%d:%d] %s (Player: %s)\n"),
                    Galaxy, S, P, *Planet->PlanetName, *Planet->OwnerPlayerId);
            }
        }
    }
    return Map;
}
