// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameStatisticsManager.h - Universe-wide and per-player analytics.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameStatisticsManager.generated.h"

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameStatisticsManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameStatisticsManager();

    // ── Recording Events ──────────────────────────────────────────────────────

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordResourcesMined(const FString& PlayerId, const FResources& Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordResourcesSpentBuilding(const FString& PlayerId, const FResources& Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordResourcesSpentResearch(const FString& PlayerId, const FResources& Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordResourcesSpentFleet(const FString& PlayerId, const FResources& Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordLootGained(const FString& PlayerId, const FResources& Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordFleetLaunched(const FString& PlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordCombatResult(const FString& PlayerId, bool bWon, int64 ShipsDestroyed,
                             int64 ShipsLost);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordExpedition(const FString& PlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordPlayerLogin(const FString& PlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void RecordPlayerLogout(const FString& PlayerId, int64 OnlineSeconds);

    // ── Player Stats ──────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    FPlayerStatistics GetPlayerStats(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    FString GetPlayerStatsText(const FString& PlayerId) const;

    // ── Universe Stats ────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    FUniverseStatistics GetUniverseStats() const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Stats")
    void UpdateUniverseStats(int32 TotalPlayers, int32 ActivePlayers,
                              int32 TotalPlanets, int32 TotalMoons, int32 TotalAlliances);

    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    FString GetUniverseStatsText() const;

    // ── Top Lists ─────────────────────────────────────────────────────────────

    /** Top N players by resources mined. */
    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    TArray<FString> GetTopMinerIds(int32 TopN = 10) const;

    /** Top N players by combat wins. */
    UFUNCTION(BlueprintPure, Category = "OGame|Stats")
    TArray<FString> GetTopCombatantIds(int32 TopN = 10) const;

private:
    TMap<FString, FPlayerStatistics> PlayerStats;
    FUniverseStatistics UniverseStats;

    FPlayerStatistics& FindOrCreatePlayerStats(const FString& PlayerId);
};
