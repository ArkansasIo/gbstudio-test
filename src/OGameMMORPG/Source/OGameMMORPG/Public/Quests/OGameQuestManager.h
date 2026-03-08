// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameQuestManager.h - Daily, weekly, story, and event quest system.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameQuestManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnQuestCompleted,
                                              const FString&, PlayerId,
                                              const FQuestDefinition&, Quest);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnQuestAssigned,
                                              const FString&, PlayerId,
                                              const FQuestDefinition&, Quest);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameQuestManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameQuestManager();

    UPROPERTY(BlueprintAssignable, Category = "OGame|Quests|Events")
    FOnQuestCompleted OnQuestCompleted;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Quests|Events")
    FOnQuestAssigned OnQuestAssigned;

    // ── Assignment ────────────────────────────────────────────────────────────

    /** Assign the daily quest set to a player. Resets if already completed that day. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    TArray<FQuestDefinition> AssignDailyQuests(const FString& PlayerId, int32 Count = 3);

    /** Assign the weekly quest set. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    TArray<FQuestDefinition> AssignWeeklyQuests(const FString& PlayerId, int32 Count = 2);

    // ── Progress ──────────────────────────────────────────────────────────────

    /** Notify the quest system that a player performed an action. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    void NotifyAction(const FString& PlayerId, EQuestObjectiveType Action, double Amount = 1.0);

    /** Directly update a specific objective on a quest. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    void UpdateObjective(const FString& PlayerId, const FString& QuestId,
                          const FString& ObjectiveId, double Delta);

    // ── Claiming ──────────────────────────────────────────────────────────────

    /** Claim reward for a completed quest. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    bool ClaimReward(const FString& PlayerId, const FString& QuestId,
                      FResources& OutResources, int32& OutDarkMatter, int64& OutPoints);

    // ── Query ─────────────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|Quests")
    TArray<FQuestDefinition> GetActiveQuests(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Quests")
    TArray<FQuestDefinition> GetCompletedQuests(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Quests")
    bool GetQuest(const FString& PlayerId, const FString& QuestId,
                   FQuestDefinition& OutQuest) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Quests")
    FString GetQuestLogText(const FString& PlayerId) const;

    /** Expire quests that are past their deadline. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Quests")
    void TickExpiry();

private:
    // PlayerId -> quests
    TMap<FString, TArray<FQuestDefinition>> PlayerQuests;

    TArray<FQuestDefinition> BuildDailyQuestPool() const;
    TArray<FQuestDefinition> BuildWeeklyQuestPool() const;
    FString ObjectiveTypeName(EQuestObjectiveType Type) const;

    FQuestDefinition* FindQuestMutable(const FString& PlayerId, const FString& QuestId);
    const FQuestDefinition* FindQuest(const FString& PlayerId, const FString& QuestId) const;
};
