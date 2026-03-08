// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Core/OGameBlueprintLibrary.h"
#include "Universe/OGamePlanet.h"
#include "Buildings/OGameBuildingManager.h"
#include "Research/OGameResearchManager.h"
#include "Fleet/OGameFleet.h"
#include "Combat/OGameCombatManager.h"
#include "UI/OGameTextUIManager.h"
#include "Math/UnrealMathUtility.h"

// ── Resources ────────────────────────────────────────────────────────────────

FResources UOGameBlueprintLibrary::MakeResources(double Metal, double Crystal,
                                                   double Deuterium, double Energy)
{
    return FResources(Metal, Crystal, Deuterium, Energy);
}

FResources UOGameBlueprintLibrary::AddResources(const FResources& A, const FResources& B)
{
    return A + B;
}

FResources UOGameBlueprintLibrary::SubtractResources(const FResources& A, const FResources& B)
{
    return A - B;
}

bool UOGameBlueprintLibrary::ResourcesHasEnough(const FResources& Available, const FResources& Cost)
{
    return Available.HasEnough(Cost);
}

FResources UOGameBlueprintLibrary::ScaleResources(const FResources& Res, double Scalar)
{
    return Res * Scalar;
}

// ── Coordinates ──────────────────────────────────────────────────────────────

FCoordinates UOGameBlueprintLibrary::MakeCoordinates(int32 Galaxy, int32 System,
                                                       int32 Position, EPlanetType Type)
{
    return FCoordinates(Galaxy, System, Position, Type);
}

FString UOGameBlueprintLibrary::CoordinatesToString(const FCoordinates& Coords)
{
    return Coords.ToString();
}

bool UOGameBlueprintLibrary::CoordinatesEqual(const FCoordinates& A, const FCoordinates& B)
{
    return A == B;
}

// ── Buildings ────────────────────────────────────────────────────────────────

FResources UOGameBlueprintLibrary::GetBuildingUpgradeCost(EBuildingType Type, int32 CurrentLevel)
{
    return UOGameBuildingManager::GetBuildingCost(Type, CurrentLevel);
}

FTimespan UOGameBlueprintLibrary::GetBuildingDuration(EBuildingType Type, int32 CurrentLevel,
                                                        int32 RoboticsLevel, int32 NaniteLevel,
                                                        float EconomySpeed)
{
    return UOGameBuildingManager::GetBuildingDuration(Type, CurrentLevel, RoboticsLevel,
                                                       NaniteLevel, EconomySpeed);
}

FString UOGameBlueprintLibrary::GetBuildingName(EBuildingType Type)
{
    return UOGameBuildingManager::GetBuildingName(Type);
}

FString UOGameBlueprintLibrary::GetBuildingDescription(EBuildingType Type)
{
    return UOGameBuildingManager::GetBuildingDescription(Type);
}

// ── Research ─────────────────────────────────────────────────────────────────

FResources UOGameBlueprintLibrary::GetResearchCost(EResearchType Type, int32 CurrentLevel)
{
    return UOGameResearchManager::GetResearchCost(Type, CurrentLevel);
}

FTimespan UOGameBlueprintLibrary::GetResearchDuration(EResearchType Type, int32 CurrentLevel,
                                                        int32 ResearchLabLevel,
                                                        float SpeedMultiplier)
{
    return UOGameResearchManager::GetResearchDuration(Type, CurrentLevel, ResearchLabLevel,
                                                       0, SpeedMultiplier);
}

FString UOGameBlueprintLibrary::GetResearchName(EResearchType Type)
{
    return UOGameResearchManager::GetResearchName(Type);
}

// ── Ships ─────────────────────────────────────────────────────────────────────

void UOGameBlueprintLibrary::GetShipStats(EShipType Type,
                                           double& OutMetalCost, double& OutCrystalCost,
                                           double& OutDeuteriumCost,
                                           double& OutHull, double& OutShield, double& OutAttack,
                                           double& OutCargoCapacity, double& OutBaseSpeed)
{
    OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Type);
    OutMetalCost      = Stats.MetalCost;
    OutCrystalCost    = Stats.CrystalCost;
    OutDeuteriumCost  = Stats.DeuteriumCost;
    OutHull           = Stats.StructuralIntegrity;
    OutShield         = Stats.ShieldPower;
    OutAttack         = Stats.AttackPower;
    OutCargoCapacity  = Stats.CargoCapacity;
    OutBaseSpeed      = Stats.BaseSpeed;
}

FTimespan UOGameBlueprintLibrary::CalculateTravelTime(const FCoordinates& From,
                                                        const FCoordinates& To,
                                                        double FleetSpeed)
{
    return UOGameFleet::CalculateTravelTime(From, To, FleetSpeed);
}

// ── Combat ───────────────────────────────────────────────────────────────────

ECombatOutcome UOGameBlueprintLibrary::QuickBattleSim(const FFleetComposition& AttackerFleet,
                                                        const FFleetComposition& DefenderFleet,
                                                        const TMap<EDefenseType, int64>& DefenderDefense)
{
    TMap<EResearchType, int32> EmptyTech;

    FCombatSide Attackers;
    Attackers.OwnerName = TEXT("Attacker");
    for (const auto& Pair : AttackerFleet.Ships)
    {
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name   = FString::Printf(TEXT("Ship[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield = Stats.ShieldPower;
        Unit.Hull   = Stats.StructuralIntegrity;
        Unit.Attack = Stats.AttackPower;
        Unit.Count  = Pair.Value;
        Attackers.Units.Add(Unit);
    }

    FCombatSide Defenders;
    Defenders.OwnerName = TEXT("Defender");
    for (const auto& Pair : DefenderFleet.Ships)
    {
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name   = FString::Printf(TEXT("Ship[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield = Stats.ShieldPower;
        Unit.Hull   = Stats.StructuralIntegrity;
        Unit.Attack = Stats.AttackPower;
        Unit.Count  = Pair.Value;
        Defenders.Units.Add(Unit);
    }
    for (const auto& Pair : DefenderDefense)
    {
        OGameConstants::FDefenseBaseStats Stats = OGameConstants::GetDefenseBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name   = FString::Printf(TEXT("Def[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield = Stats.ShieldPower;
        Unit.Hull   = Stats.StructuralIntegrity;
        Unit.Attack = Stats.AttackPower;
        Unit.Count  = Pair.Value;
        Defenders.Units.Add(Unit);
    }

    UOGameCombatManager* Mgr = NewObject<UOGameCombatManager>();
    for (int32 Round = 0; Round < OGameConstants::MAX_COMBAT_ROUNDS; ++Round)
    {
        if (Attackers.IsDefeated() || Defenders.IsDefeated()) break;
        FString Log;
        Mgr->SimulateRound(Attackers, Defenders, Round + 1);
    }

    if (Attackers.IsDefeated() && Defenders.IsDefeated()) return ECombatOutcome::Draw;
    if (Defenders.IsDefeated()) return ECombatOutcome::AttackerWins;
    if (Attackers.IsDefeated()) return ECombatOutcome::DefenderWins;
    return ECombatOutcome::Draw;
}

// ── Score ─────────────────────────────────────────────────────────────────────

int64 UOGameBlueprintLibrary::ResourcesToPoints(const FResources& Res)
{
    double Total = Res.Metal + Res.Crystal + Res.Deuterium;
    return static_cast<int64>(Total * OGameConstants::POINTS_PER_RESOURCE_UNIT);
}

// ── Formatting ────────────────────────────────────────────────────────────────

FString UOGameBlueprintLibrary::FormatGameNumber(double Value)
{
    return UOGameTextUIManager::FormatNumber(Value);
}

FString UOGameBlueprintLibrary::FormatGameTimespan(FTimespan Span)
{
    return UOGameTextUIManager::FormatTimespan(Span);
}

FString UOGameBlueprintLibrary::FormatResourcesText(const FResources& Res)
{
    return UOGameTextUIManager::FormatResources(Res);
}

// ── Planet ────────────────────────────────────────────────────────────────────

FString UOGameBlueprintLibrary::GetPlanetSummary(UOGamePlanet* Planet)
{
    return Planet ? Planet->GetPlanetSummaryText() : TEXT("No planet.");
}

FResources UOGameBlueprintLibrary::GetHourlyProduction(UOGamePlanet* Planet)
{
    if (!Planet) return FResources();
    TMap<EResearchType, int32> EmptyResearch;
    return Planet->CalculateHourlyProduction(EmptyResearch);
}
