// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameHonorSystem.h - PvP honor points, rank titles, and kill-to-death tracking.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameHonorSystem.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnHonorRankChanged,
                                              const FString&, PlayerId,
                                              EHonorRank, NewRank);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameHonorSystem : public UObject
{
    GENERATED_BODY()

public:
    UOGameHonorSystem();

    UPROPERTY(BlueprintAssignable, Category = "OGame|Honor|Events")
    FOnHonorRankChanged OnHonorRankChanged;

    // ── Record combat outcomes ─────────────────────────────────────────────────

    /**
     * Called after combat resolution.
     * Distributes honor points and updates kill/death stats.
     * Honorable attack = attacking someone with a similar score.
     * Dishonorable attack = attacking a much weaker player.
     */
    UFUNCTION(BlueprintCallable, Category = "OGame|Honor")
    void RecordCombat(const FString& AttackerId, int64 AttackerScore,
                       const FString& DefenderId, int64 DefenderScore,
                       ECombatOutcome Outcome,
                       int64 AttackerShipsLost, int64 DefenderShipsLost);

    // ── Honor Points ──────────────────────────────────────────────────────────

    UFUNCTION(BlueprintCallable, Category = "OGame|Honor")
    void AddHonorPoints(const FString& PlayerId, double Amount);

    UFUNCTION(BlueprintCallable, Category = "OGame|Honor")
    void DeductHonorPoints(const FString& PlayerId, double Amount);

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    double GetHonorPoints(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    EHonorRank GetHonorRank(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    FString GetHonorRankName(EHonorRank Rank) const;

    // ── Leaderboard ───────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    TArray<FHonorRecord> GetHonorLeaderboard(int32 TopN = 20) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    FHonorRecord GetRecord(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    FString GetHonorLeaderboardText(int32 TopN = 20) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Honor")
    FString GetPlayerHonorText(const FString& PlayerId) const;

private:
    TMap<FString, FHonorRecord> Records;

    FHonorRecord& FindOrCreate(const FString& PlayerId);
    EHonorRank CalculateRank(double HonorPoints) const;
    double CalculateHonorGain(int64 AttackerScore, int64 DefenderScore, bool bWon) const;
};
