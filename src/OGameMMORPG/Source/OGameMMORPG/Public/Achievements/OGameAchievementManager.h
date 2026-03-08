// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameAchievementManager.h - Achievement definitions, progress tracking, and reward distribution.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameAchievementManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnAchievementUnlocked,
                                              const FString&, PlayerId,
                                              const FAchievement&, Achievement);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameAchievementManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameAchievementManager();

    // ── Events ────────────────────────────────────────────────────────────────
    UPROPERTY(BlueprintAssignable, Category = "OGame|Achievements|Events")
    FOnAchievementUnlocked OnAchievementUnlocked;

    // ── Catalogue ─────────────────────────────────────────────────────────────

    /** All defined achievements. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    const TArray<FAchievement>& GetAllAchievements() const { return AchievementCatalogue; }

    /** Achievements for a specific category. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    TArray<FAchievement> GetAchievementsByCategory(EAchievementCategory Category) const;

    /** Look up a single achievement definition. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    bool GetAchievement(const FString& AchievementId, FAchievement& OutAchievement) const;

    // ── Player Progress ───────────────────────────────────────────────────────

    /** Update numeric progress for a player (e.g. ships destroyed += 50). */
    UFUNCTION(BlueprintCallable, Category = "OGame|Achievements")
    void UpdateProgress(const FString& PlayerId, const FString& AchievementId, double Delta);

    /** Force-set the progress (useful for computed values like total score). */
    UFUNCTION(BlueprintCallable, Category = "OGame|Achievements")
    void SetProgress(const FString& PlayerId, const FString& AchievementId, double Value);

    /** Claim the reward for a completed achievement. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Achievements")
    bool ClaimReward(const FString& PlayerId, const FString& AchievementId,
                     FResources& OutResources, int32& OutDarkMatter);

    /** Get all progress records for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    TArray<FPlayerAchievementProgress> GetPlayerProgress(const FString& PlayerId) const;

    /** Count of unlocked achievements for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    int32 GetUnlockedCount(const FString& PlayerId) const;

    /** Formatted achievement summary text for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Achievements")
    FString GetAchievementSummaryText(const FString& PlayerId) const;

private:
    TArray<FAchievement> AchievementCatalogue;

    // PlayerId -> array of progress
    TMap<FString, TArray<FPlayerAchievementProgress>> PlayerProgress;

    void InitialiseCatalogue();
    FPlayerAchievementProgress* FindOrCreateProgress(const FString& PlayerId,
                                                      const FString& AchievementId);
    FString TierName(EAchievementTier Tier) const;
};
