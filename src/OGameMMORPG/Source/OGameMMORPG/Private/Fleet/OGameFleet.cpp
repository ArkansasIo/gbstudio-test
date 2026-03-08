// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Fleet/OGameFleet.h"
#include "Core/OGameConstants.h"
#include "Math/UnrealMathUtility.h"

bool UOGameFleet::HasArrived() const
{
    return FDateTime::UtcNow() >= ArrivalTime;
}

float UOGameFleet::GetProgressPercent() const
{
    FTimespan Total    = ArrivalTime   - DepartureTime;
    FTimespan Elapsed  = FDateTime::UtcNow() - DepartureTime;
    if (Total.GetTotalSeconds() <= 0.0)
    {
        return 100.0f;
    }
    return FMath::Clamp(static_cast<float>(Elapsed.GetTotalSeconds() / Total.GetTotalSeconds()) * 100.0f,
                        0.0f, 100.0f);
}

FTimespan UOGameFleet::GetTimeRemaining() const
{
    FDateTime Now = FDateTime::UtcNow();
    if (Now >= ArrivalTime)
    {
        return FTimespan::Zero();
    }
    return ArrivalTime - Now;
}

void UOGameFleet::Recall()
{
    if (bIsReturning || bIsRecalled)
    {
        return;
    }

    float Progress    = GetProgressPercent() / 100.0f;
    FTimespan Elapsed = FDateTime::UtcNow() - DepartureTime;

    // Recall: reverse destination and adjust arrival time
    bIsRecalled    = true;
    bIsReturning   = true;
    Destination    = Origin;
    ArrivalTime    = FDateTime::UtcNow() + Elapsed; // same time remaining to go back
}

FString UOGameFleet::GetFleetStatusText() const
{
    FString Status;
    FTimespan Remaining = GetTimeRemaining();
    int32 Hours   = static_cast<int32>(Remaining.GetTotalHours());
    int32 Minutes = Remaining.GetMinutes();
    int32 Seconds = Remaining.GetSeconds();

    FString MissionStr;
    switch (Mission)
    {
        case EFleetMission::Attack:     MissionStr = TEXT("Attack");    break;
        case EFleetMission::Transport:  MissionStr = TEXT("Transport"); break;
        case EFleetMission::Espionage:  MissionStr = TEXT("Espionage"); break;
        case EFleetMission::Colonize:   MissionStr = TEXT("Colonize");  break;
        case EFleetMission::Recycle:    MissionStr = TEXT("Recycle");   break;
        case EFleetMission::Expedition: MissionStr = TEXT("Expedition");break;
        case EFleetMission::Deploy:     MissionStr = TEXT("Deploy");    break;
        default:                        MissionStr = TEXT("Mission");   break;
    }

    Status += FString::Printf(TEXT("Fleet [%s]\n"), *FleetId);
    Status += FString::Printf(TEXT("Owner:   %s\n"), *OwnerPlayerId);
    Status += FString::Printf(TEXT("Mission: %s\n"), *MissionStr);
    Status += FString::Printf(TEXT("From:    %s\n"), *Origin.ToString());
    Status += FString::Printf(TEXT("To:      %s\n"), *Destination.ToString());
    Status += FString::Printf(TEXT("Ships:   %lld total\n"), Ships.GetTotalShips());
    if (HasArrived())
    {
        Status += TEXT("Status:  ARRIVED\n");
    }
    else
    {
        Status += FString::Printf(TEXT("ETA:     %02d:%02d:%02d  (%.1f%%)\n"),
                                  Hours, Minutes, Seconds, GetProgressPercent());
    }

    return Status;
}

// ── Static Helpers ────────────────────────────────────────────────────────────

double UOGameFleet::CalculateFleetSpeed(const FFleetComposition& Ships,
                                         const TMap<EResearchType, int32>& Research,
                                         float UniverseSpeedMultiplier)
{
    double MinSpeed = TNumericLimits<double>::Max();

    for (const auto& Pair : Ships.Ships)
    {
        if (Pair.Value <= 0) continue;

        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        double Speed = Stats.BaseSpeed;

        // Apply technology bonuses
        const int32* CombLevel = Research.Find(EResearchType::CombustionDrive);
        const int32* ImpLevel  = Research.Find(EResearchType::ImpulseDrive);
        const int32* HypLevel  = Research.Find(EResearchType::HyperspaceDrive);

        switch (Pair.Key)
        {
            case EShipType::SmallCargo:
            case EShipType::LargeCargo:
            case EShipType::LightFighter:
            case EShipType::HeavyFighter:
            case EShipType::Recycler:
            case EShipType::EspionageProbe:
            case EShipType::SolarSatelliteShip:
                Speed *= 1.0 + 0.1 * (CombLevel ? *CombLevel : 0);
                break;
            case EShipType::Bomber:
            case EShipType::ColonyShip:
            case EShipType::Cruiser:
                Speed *= 1.0 + 0.2 * (ImpLevel ? *ImpLevel : 0);
                break;
            case EShipType::Battleship:
            case EShipType::Battlecruiser:
            case EShipType::Destroyer:
            case EShipType::DeathStar:
            case EShipType::Reaper:
            case EShipType::Pathfinder:
                Speed *= 1.0 + 0.3 * (HypLevel ? *HypLevel : 0);
                break;
            default:
                break;
        }

        MinSpeed = FMath::Min(MinSpeed, Speed);
    }

    return MinSpeed == TNumericLimits<double>::Max() ? 0.0 : MinSpeed * UniverseSpeedMultiplier;
}

FTimespan UOGameFleet::CalculateTravelTime(const FCoordinates& From, const FCoordinates& To,
                                            double FleetSpeed)
{
    if (FleetSpeed <= 0.0)
    {
        return FTimespan::FromSeconds(1.0);
    }

    // OGame distance formula
    int64 Distance = 0;
    if (From.Galaxy != To.Galaxy)
    {
        Distance = 20000 * FMath::Abs(From.Galaxy - To.Galaxy);
    }
    else if (From.System != To.System)
    {
        Distance = 2700 + 95 * FMath::Abs(From.System - To.System);
    }
    else if (From.Position != To.Position)
    {
        Distance = 1000 + 5 * FMath::Abs(From.Position - To.Position);
    }
    else
    {
        Distance = 5; // same position (e.g. planet <-> moon)
    }

    // Travel time (seconds): 35000 / (speed-percent * FleetSpeed) * sqrt(Distance * 10) + 10
    double SpeedPercent  = 1.0; // 100%
    double TravelSeconds = (35000.0 / (SpeedPercent * 0.01 * FleetSpeed)) *
                           FMath::Sqrt(static_cast<double>(Distance) * 10.0) + 10.0;

    return FTimespan::FromSeconds(FMath::Max(1.0, TravelSeconds));
}

double UOGameFleet::CalculateFuelCost(const FFleetComposition& Ships,
                                       const FCoordinates& From, const FCoordinates& To,
                                       double FleetSpeed)
{
    int64 Distance = 0;
    if (From.Galaxy != To.Galaxy)
    {
        Distance = 20000 * FMath::Abs(From.Galaxy - To.Galaxy);
    }
    else if (From.System != To.System)
    {
        Distance = 2700 + 95 * FMath::Abs(From.System - To.System);
    }
    else
    {
        Distance = 1000 + 5 * FMath::Abs(From.Position - To.Position);
    }

    double TotalFuel = 0.0;
    for (const auto& Pair : Ships.Ships)
    {
        if (Pair.Value <= 0) continue;
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        double Fuel = Stats.FuelConsumption * Pair.Value *
                      Distance / 35000.0 *
                      FMath::Pow(FleetSpeed / Stats.BaseSpeed + 1.0, 2.0);
        TotalFuel += Fuel;
    }

    return FMath::Max(1.0, TotalFuel + 1.0);
}
