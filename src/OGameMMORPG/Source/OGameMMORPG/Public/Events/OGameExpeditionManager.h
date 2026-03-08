// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameExpeditionManager.h - Expedition outcome simulation with narrative generation.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameExpeditionManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnExpeditionReturned,
                                              const FString&, PlayerId,
                                              const FExpeditionReport&, Report);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameExpeditionManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameExpeditionManager();

    UPROPERTY(BlueprintAssignable, Category = "OGame|Expedition|Events")
    FOnExpeditionReturned OnExpeditionReturned;

    /** Simulate and resolve an expedition. Returns a filled-in report. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Expedition")
    FExpeditionReport ResolveExpedition(const FString& PlayerId,
                                         const FCoordinates& Target,
                                         const FFleetComposition& SentFleet,
                                         int32 AstrophysicsLevel,
                                         int32 ExpeditionSpeed = 100);

    /** Dispatched expeditions still in transit. */
    UFUNCTION(BlueprintPure, Category = "OGame|Expedition")
    TArray<FExpeditionReport> GetActiveExpeditions(const FString& PlayerId) const;

    /** Historical expedition reports for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Expedition")
    TArray<FExpeditionReport> GetExpeditionHistory(const FString& PlayerId,
                                                    int32 MaxResults = 20) const;

    /** Register a dispatched expedition (to be resolved on return). */
    UFUNCTION(BlueprintCallable, Category = "OGame|Expedition")
    FString DispatchExpedition(const FString& PlayerId,
                                const FCoordinates& Target,
                                const FFleetComposition& SentFleet,
                                int32 AstrophysicsLevel,
                                FDateTime ReturnTime);

    /** Check whether any expeditions have returned; resolves them. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Expedition")
    TArray<FExpeditionReport> ProcessReturnedExpeditions();

    /** Maximum simultaneous expeditions for the given Astrophysics level. */
    UFUNCTION(BlueprintPure, Category = "OGame|Expedition")
    static int32 GetMaxExpeditions(int32 AstrophysicsLevel);

private:
    struct FPendingExpedition
    {
        FExpeditionReport Report;
        FFleetComposition SentFleet;
        int32 AstrophysicsLevel = 0;
    };

    TArray<FPendingExpedition> PendingExpeditions;
    TArray<FExpeditionReport>  CompletedExpeditions;

    EExpeditionResult RollOutcome(int32 AstrophysicsLevel) const;
    FExpeditionReport BuildReport(const FString& PlayerId, const FCoordinates& Target,
                                   const FFleetComposition& Fleet,
                                   EExpeditionResult Result, int32 AstrophysicsLevel) const;
    FString GenerateNarrative(EExpeditionResult Result, const FResources& Res,
                               int32 DarkMatter, const FFleetComposition& ShipsFound) const;
    int64 FleetStrength(const FFleetComposition& Fleet) const;
};
