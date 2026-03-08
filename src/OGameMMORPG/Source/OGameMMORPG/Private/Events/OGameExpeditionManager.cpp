// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Events/OGameExpeditionManager.h"
#include "Core/OGameConstants.h"
#include "Math/UnrealMathUtility.h"

UOGameExpeditionManager::UOGameExpeditionManager()
{
}

int32 UOGameExpeditionManager::GetMaxExpeditions(int32 AstrophysicsLevel)
{
    return (AstrophysicsLevel + 2) / 2;  // OGame formula: floor((Astro+2)/2) but capped at 8
}

FExpeditionReport UOGameExpeditionManager::ResolveExpedition(
    const FString& PlayerId,
    const FCoordinates& Target,
    const FFleetComposition& SentFleet,
    int32 AstrophysicsLevel,
    int32 ExpeditionSpeed)
{
    EExpeditionResult Result = RollOutcome(AstrophysicsLevel);
    FExpeditionReport Report = BuildReport(PlayerId, Target, SentFleet, Result, AstrophysicsLevel);

    CompletedExpeditions.Add(Report);
    OnExpeditionReturned.Broadcast(PlayerId, Report);

    return Report;
}

FString UOGameExpeditionManager::DispatchExpedition(
    const FString& PlayerId,
    const FCoordinates& Target,
    const FFleetComposition& SentFleet,
    int32 AstrophysicsLevel,
    FDateTime ReturnTime)
{
    FPendingExpedition Pending;
    Pending.AstrophysicsLevel = AstrophysicsLevel;
    Pending.SentFleet         = SentFleet;
    Pending.Report.ExpeditionId   = FString::Printf(TEXT("exp_%s_%lld"), *PlayerId, ReturnTime.GetTicks());
    Pending.Report.OwnerPlayerId  = PlayerId;
    Pending.Report.Location       = Target;
    Pending.Report.ReturnTime     = ReturnTime;

    PendingExpeditions.Add(Pending);
    return Pending.Report.ExpeditionId;
}

TArray<FExpeditionReport> UOGameExpeditionManager::ProcessReturnedExpeditions()
{
    TArray<FExpeditionReport> Returned;
    FDateTime Now = FDateTime::UtcNow();

    for (int32 i = PendingExpeditions.Num() - 1; i >= 0; --i)
    {
        FPendingExpedition& Pending = PendingExpeditions[i];
        if (Pending.Report.ReturnTime <= Now)
        {
            EExpeditionResult Result = RollOutcome(Pending.AstrophysicsLevel);
            FExpeditionReport Report = BuildReport(
                Pending.Report.OwnerPlayerId,
                Pending.Report.Location,
                Pending.SentFleet,
                Result,
                Pending.AstrophysicsLevel);
            Report.ExpeditionId = Pending.Report.ExpeditionId;
            Report.ReturnTime   = Pending.Report.ReturnTime;

            CompletedExpeditions.Add(Report);
            Returned.Add(Report);
            OnExpeditionReturned.Broadcast(Report.OwnerPlayerId, Report);
            PendingExpeditions.RemoveAt(i);
        }
    }
    return Returned;
}

TArray<FExpeditionReport> UOGameExpeditionManager::GetActiveExpeditions(
    const FString& PlayerId) const
{
    TArray<FExpeditionReport> Result;
    for (const FPendingExpedition& P : PendingExpeditions)
    {
        if (P.Report.OwnerPlayerId == PlayerId) Result.Add(P.Report);
    }
    return Result;
}

TArray<FExpeditionReport> UOGameExpeditionManager::GetExpeditionHistory(
    const FString& PlayerId, int32 MaxResults) const
{
    TArray<FExpeditionReport> Result;
    for (int32 i = CompletedExpeditions.Num() - 1; i >= 0 && Result.Num() < MaxResults; --i)
    {
        if (CompletedExpeditions[i].OwnerPlayerId == PlayerId)
        {
            Result.Add(CompletedExpeditions[i]);
        }
    }
    return Result;
}

EExpeditionResult UOGameExpeditionManager::RollOutcome(int32 AstrophysicsLevel) const
{
    // Weighted outcome table; higher Astrophysics improves positive outcomes
    float AstroBonus = FMath::Clamp(AstrophysicsLevel * 0.02f, 0.0f, 0.3f);

    float Roll = FMath::FRand();

    if (Roll < 0.04f)                       return EExpeditionResult::BlackHole;
    if (Roll < 0.10f)                       return EExpeditionResult::AlienEncounter;
    if (Roll < 0.15f)                       return EExpeditionResult::PirateAttack;
    if (Roll < 0.18f + AstroBonus)         return EExpeditionResult::AncientRuins;
    if (Roll < 0.24f + AstroBonus)         return EExpeditionResult::DarkMatterFind;
    if (Roll < 0.35f + AstroBonus)         return EExpeditionResult::FleetFind;
    if (Roll < 0.70f + AstroBonus * 0.5f) return EExpeditionResult::ResourceFind;
    if (Roll < 0.80f)                       return EExpeditionResult::EarlyReturn;

    return EExpeditionResult::Nothing;
}

FExpeditionReport UOGameExpeditionManager::BuildReport(
    const FString& PlayerId,
    const FCoordinates& Target,
    const FFleetComposition& Fleet,
    EExpeditionResult Result,
    int32 AstrophysicsLevel) const
{
    FExpeditionReport Report;
    Report.ExpeditionId  = FString::Printf(TEXT("exp_%s_%lld"), *PlayerId, FDateTime::UtcNow().GetTicks());
    Report.OwnerPlayerId = PlayerId;
    Report.Location      = Target;
    Report.Result        = Result;

    int64 Strength = FleetStrength(Fleet);
    float MultiplierFromStrength = FMath::Clamp(FMath::Loge(static_cast<float>(FMath::Max(1LL, Strength))) / 30.0f, 0.1f, 2.0f);

    switch (Result)
    {
        case EExpeditionResult::ResourceFind:
        {
            double BaseM = 50000.0 * MultiplierFromStrength * (1.0 + AstrophysicsLevel * 0.05);
            Report.ResourcesFound = FResources(
                BaseM * FMath::FRandRange(0.5f, 1.5f),
                BaseM * FMath::FRandRange(0.2f, 0.8f) * 0.5f,
                BaseM * FMath::FRandRange(0.1f, 0.5f) * 0.1f);
            break;
        }
        case EExpeditionResult::FleetFind:
        {
            // Find some smaller ships
            Report.ShipsFound.Ships.Add(EShipType::SmallCargo,
                FMath::RandRange(1, static_cast<int32>(5 + AstrophysicsLevel)));
            if (FMath::FRand() > 0.5f)
            {
                Report.ShipsFound.Ships.Add(EShipType::LightFighter,
                    FMath::RandRange(1, static_cast<int32>(3 + AstrophysicsLevel)));
            }
            break;
        }
        case EExpeditionResult::DarkMatterFind:
            Report.DarkMatterFound = FMath::RandRange(50, 250 + AstrophysicsLevel * 25);
            break;

        case EExpeditionResult::BlackHole:
        {
            // Lose a portion of the fleet
            FFleetComposition Lost;
            for (const auto& Pair : Fleet.Ships)
            {
                int64 LostCount = static_cast<int64>(Pair.Value * FMath::FRandRange(0.1f, 0.5f));
                if (LostCount > 0) Lost.Ships.Add(Pair.Key, LostCount);
            }
            Report.ShipsLost = Lost;
            break;
        }
        case EExpeditionResult::PirateAttack:
        {
            FFleetComposition Lost;
            for (const auto& Pair : Fleet.Ships)
            {
                int64 LostCount = static_cast<int64>(Pair.Value * FMath::FRandRange(0.0f, 0.2f));
                if (LostCount > 0) Lost.Ships.Add(Pair.Key, LostCount);
            }
            Report.ShipsLost = Lost;
            // Also find some resources if we won
            if (FMath::FRand() > 0.4f)
            {
                Report.ResourcesFound = FResources(
                    FMath::FRandRange(10000, 50000),
                    FMath::FRandRange(5000, 20000),
                    FMath::FRandRange(1000, 5000));
            }
            break;
        }
        case EExpeditionResult::AlienEncounter:
        {
            // Engage alien fleet — might gain ships or lose them
            if (FMath::FRand() > 0.5f)
            {
                Report.ShipsFound.Ships.Add(EShipType::LightFighter,
                    FMath::RandRange(0, static_cast<int32>(10 + AstrophysicsLevel * 2)));
            }
            else
            {
                FFleetComposition Lost;
                for (const auto& Pair : Fleet.Ships)
                {
                    int64 LostCount = static_cast<int64>(Pair.Value * FMath::FRandRange(0.0f, 0.15f));
                    if (LostCount > 0) Lost.Ships.Add(Pair.Key, LostCount);
                }
                Report.ShipsLost = Lost;
            }
            break;
        }
        case EExpeditionResult::AncientRuins:
        {
            Report.DarkMatterFound = FMath::RandRange(500, 2500 + AstrophysicsLevel * 100);
            double BaseM = 100000.0 * MultiplierFromStrength;
            Report.ResourcesFound = FResources(BaseM, BaseM * 0.5, BaseM * 0.1);
            break;
        }
        case EExpeditionResult::EarlyReturn:
        case EExpeditionResult::Nothing:
        default:
            break;
    }

    Report.NarrativeText = GenerateNarrative(Result, Report.ResourcesFound,
                                              Report.DarkMatterFound, Report.ShipsFound);
    return Report;
}

FString UOGameExpeditionManager::GenerateNarrative(EExpeditionResult Result,
                                                     const FResources& Res,
                                                     int32 DarkMatter,
                                                     const FFleetComposition& ShipsFound) const
{
    switch (Result)
    {
        case EExpeditionResult::ResourceFind:
            return FString::Printf(
                TEXT("Your expedition discovered a rich asteroid field! The fleet mined %.0f metal, %.0f crystal, and %.0f deuterium."),
                Res.Metal, Res.Crystal, Res.Deuterium);

        case EExpeditionResult::FleetFind:
            return FString::Printf(
                TEXT("Your scouts found derelict spacecraft drifting in space! %lld ships were recovered and joined the fleet."),
                ShipsFound.GetTotalShips());

        case EExpeditionResult::DarkMatterFind:
            return FString::Printf(
                TEXT("Sensors detected a dark matter concentration! The fleet collected %d units of dark matter."),
                DarkMatter);

        case EExpeditionResult::BlackHole:
            return TEXT("A gravitational anomaly pulled your fleet off course and into a black hole's gravity well. Severe losses were sustained.");

        case EExpeditionResult::PirateAttack:
            return TEXT("A pirate fleet intercepted your expedition! After a fierce battle your forces prevailed, capturing some of their resources.");

        case EExpeditionResult::AlienEncounter:
            return TEXT("Your expedition encountered an alien fleet of unknown origin. First contact was tense, but ultimately proved advantageous.");

        case EExpeditionResult::AncientRuins:
            return FString::Printf(
                TEXT("Incredible! Your expedition discovered ancient alien ruins on a remote moon. The ruins yielded %d dark matter and vast resource caches."),
                DarkMatter);

        case EExpeditionResult::EarlyReturn:
            return TEXT("Navigation systems malfunctioned and the fleet returned early with no findings. No resources were lost.");

        case EExpeditionResult::Nothing:
        default:
            return TEXT("Your expedition found nothing of interest in the void of space and returned safely.");
    }
}

int64 UOGameExpeditionManager::FleetStrength(const FFleetComposition& Fleet) const
{
    int64 Strength = 0;
    for (const auto& Pair : Fleet.Ships)
    {
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        Strength += static_cast<int64>(Stats.AttackPower * Pair.Value);
    }
    return Strength;
}
