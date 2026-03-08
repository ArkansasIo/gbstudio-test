// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Quests/OGameQuestManager.h"
#include "Math/UnrealMathUtility.h"

UOGameQuestManager::UOGameQuestManager()
{
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

FQuestDefinition* UOGameQuestManager::FindQuestMutable(const FString& PlayerId,
                                                         const FString& QuestId)
{
    TArray<FQuestDefinition>* Quests = PlayerQuests.Find(PlayerId);
    if (!Quests) return nullptr;
    for (FQuestDefinition& Q : *Quests)
    {
        if (Q.QuestId == QuestId) return &Q;
    }
    return nullptr;
}

const FQuestDefinition* UOGameQuestManager::FindQuest(const FString& PlayerId,
                                                        const FString& QuestId) const
{
    const TArray<FQuestDefinition>* Quests = PlayerQuests.Find(PlayerId);
    if (!Quests) return nullptr;
    for (const FQuestDefinition& Q : *Quests)
    {
        if (Q.QuestId == QuestId) return &Q;
    }
    return nullptr;
}

// ─────────────────────────────────────────────────────────────────────────────
// Assignment
// ─────────────────────────────────────────────────────────────────────────────

TArray<FQuestDefinition> UOGameQuestManager::AssignDailyQuests(const FString& PlayerId,
                                                                int32 Count)
{
    TArray<FQuestDefinition> Pool  = BuildDailyQuestPool();
    TArray<FQuestDefinition> Picks;
    FDateTime Now = FDateTime::UtcNow();

    // Remove any existing daily quests from today
    TArray<FQuestDefinition>& Existing = PlayerQuests.FindOrAdd(PlayerId);
    Existing.RemoveAll([](const FQuestDefinition& Q)
    {
        return Q.QuestType == EQuestType::Daily &&
               Q.Status    == EQuestStatus::Available;
    });

    int32 NumPick = FMath::Min(Count, Pool.Num());
    TArray<int32> Indices;
    for (int32 i = 0; i < Pool.Num(); ++i) Indices.Add(i);

    for (int32 i = 0; i < NumPick; ++i)
    {
        int32 RandIdx = FMath::RandRange(i, Indices.Num() - 1);
        Indices.Swap(i, RandIdx);

        FQuestDefinition Q = Pool[Indices[i]];
        Q.QuestId    = FString::Printf(TEXT("%s_%s_%lld"), *Q.QuestId, *PlayerId, Now.GetTicks() + i);
        Q.AssignedAt = Now;
        Q.ExpiresAt  = FDateTime(Now.GetDate()) + FTimespan::FromDays(1);
        Q.Status     = EQuestStatus::Active;

        Existing.Add(Q);
        Picks.Add(Q);
        OnQuestAssigned.Broadcast(PlayerId, Q);
    }
    return Picks;
}

TArray<FQuestDefinition> UOGameQuestManager::AssignWeeklyQuests(const FString& PlayerId,
                                                                  int32 Count)
{
    TArray<FQuestDefinition> Pool = BuildWeeklyQuestPool();
    TArray<FQuestDefinition> Picks;
    FDateTime Now = FDateTime::UtcNow();

    TArray<FQuestDefinition>& Existing = PlayerQuests.FindOrAdd(PlayerId);
    Existing.RemoveAll([](const FQuestDefinition& Q)
    {
        return Q.QuestType == EQuestType::Weekly &&
               Q.Status    == EQuestStatus::Available;
    });

    int32 NumPick = FMath::Min(Count, Pool.Num());
    for (int32 i = 0; i < NumPick; ++i)
    {
        int32 RandIdx = FMath::RandRange(i, Pool.Num() - 1);
        Pool.Swap(i, RandIdx);

        FQuestDefinition Q = Pool[i];
        Q.QuestId    = FString::Printf(TEXT("%s_%s_%lld"), *Q.QuestId, *PlayerId, Now.GetTicks() + i);
        Q.AssignedAt = Now;
        Q.ExpiresAt  = Now + FTimespan::FromDays(7);
        Q.Status     = EQuestStatus::Active;

        Existing.Add(Q);
        Picks.Add(Q);
        OnQuestAssigned.Broadcast(PlayerId, Q);
    }
    return Picks;
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress
// ─────────────────────────────────────────────────────────────────────────────

void UOGameQuestManager::NotifyAction(const FString& PlayerId,
                                       EQuestObjectiveType Action,
                                       double Amount)
{
    TArray<FQuestDefinition>* Quests = PlayerQuests.Find(PlayerId);
    if (!Quests) return;

    for (FQuestDefinition& Q : *Quests)
    {
        if (Q.Status != EQuestStatus::Active) continue;

        bool bAllDone = true;
        for (FQuestObjective& Obj : Q.Objectives)
        {
            if (Obj.Type == Action && !Obj.bCompleted)
            {
                Obj.CurrentProgress += Amount;
                if (Obj.CurrentProgress >= Obj.TargetAmount)
                {
                    Obj.CurrentProgress = Obj.TargetAmount;
                    Obj.bCompleted      = true;
                }
            }
            if (!Obj.bCompleted) bAllDone = false;
        }

        if (bAllDone && Q.Status == EQuestStatus::Active)
        {
            Q.Status = EQuestStatus::Completed;
            OnQuestCompleted.Broadcast(PlayerId, Q);
        }
    }
}

void UOGameQuestManager::UpdateObjective(const FString& PlayerId, const FString& QuestId,
                                          const FString& ObjectiveId, double Delta)
{
    FQuestDefinition* Q = FindQuestMutable(PlayerId, QuestId);
    if (!Q || Q->Status != EQuestStatus::Active) return;

    bool bAllDone = true;
    for (FQuestObjective& Obj : Q->Objectives)
    {
        if (Obj.ObjectiveId == ObjectiveId && !Obj.bCompleted)
        {
            Obj.CurrentProgress = FMath::Min(Obj.CurrentProgress + Delta, Obj.TargetAmount);
            if (Obj.CurrentProgress >= Obj.TargetAmount) Obj.bCompleted = true;
        }
        if (!Obj.bCompleted) bAllDone = false;
    }

    if (bAllDone)
    {
        Q->Status = EQuestStatus::Completed;
        OnQuestCompleted.Broadcast(PlayerId, *Q);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Claiming
// ─────────────────────────────────────────────────────────────────────────────

bool UOGameQuestManager::ClaimReward(const FString& PlayerId, const FString& QuestId,
                                      FResources& OutResources, int32& OutDarkMatter,
                                      int64& OutPoints)
{
    FQuestDefinition* Q = FindQuestMutable(PlayerId, QuestId);
    if (!Q || Q->Status != EQuestStatus::Completed) return false;

    Q->Status     = EQuestStatus::Claimed;
    OutResources  = Q->ResourceReward;
    OutDarkMatter = Q->DarkMatterReward;
    OutPoints     = Q->PointsReward;

    UE_LOG(LogTemp, Log, TEXT("Quest reward claimed: '%s' by %s"), *Q->Title, *PlayerId);
    return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query
// ─────────────────────────────────────────────────────────────────────────────

TArray<FQuestDefinition> UOGameQuestManager::GetActiveQuests(const FString& PlayerId) const
{
    TArray<FQuestDefinition> Result;
    const TArray<FQuestDefinition>* Quests = PlayerQuests.Find(PlayerId);
    if (!Quests) return Result;

    for (const FQuestDefinition& Q : *Quests)
    {
        if (Q.Status == EQuestStatus::Active) Result.Add(Q);
    }
    return Result;
}

TArray<FQuestDefinition> UOGameQuestManager::GetCompletedQuests(const FString& PlayerId) const
{
    TArray<FQuestDefinition> Result;
    const TArray<FQuestDefinition>* Quests = PlayerQuests.Find(PlayerId);
    if (!Quests) return Result;

    for (const FQuestDefinition& Q : *Quests)
    {
        if (Q.Status == EQuestStatus::Completed || Q.Status == EQuestStatus::Claimed)
        {
            Result.Add(Q);
        }
    }
    return Result;
}

bool UOGameQuestManager::GetQuest(const FString& PlayerId, const FString& QuestId,
                                   FQuestDefinition& OutQuest) const
{
    const FQuestDefinition* Q = FindQuest(PlayerId, QuestId);
    if (!Q) return false;
    OutQuest = *Q;
    return true;
}

FString UOGameQuestManager::GetQuestLogText(const FString& PlayerId) const
{
    TArray<FQuestDefinition> Active = GetActiveQuests(PlayerId);

    FString Text;
    Text += TEXT("=== Quest Log ===\n");

    if (Active.IsEmpty())
    {
        Text += TEXT("  No active quests. Visit the quest board for new missions.\n");
        return Text;
    }

    for (const FQuestDefinition& Q : Active)
    {
        FString TypeTag;
        switch (Q.QuestType)
        {
            case EQuestType::Daily:   TypeTag = TEXT("[DAILY]");   break;
            case EQuestType::Weekly:  TypeTag = TEXT("[WEEKLY]");  break;
            case EQuestType::Story:   TypeTag = TEXT("[STORY]");   break;
            case EQuestType::Event:   TypeTag = TEXT("[EVENT]");   break;
            default:                  TypeTag = TEXT("[QUEST]");   break;
        }

        Text += FString::Printf(TEXT("  %s %s\n"), *TypeTag, *Q.Title);
        Text += FString::Printf(TEXT("    %s\n"), *Q.Description);

        for (const FQuestObjective& Obj : Q.Objectives)
        {
            FString DoneStr = Obj.bCompleted ? TEXT("[✓]") : TEXT("[ ]");
            Text += FString::Printf(TEXT("    %s %s  (%.0f / %.0f)\n"),
                                    *DoneStr, *Obj.Description,
                                    Obj.CurrentProgress, Obj.TargetAmount);
        }

        if (Q.ResourceReward.Metal > 0 || Q.ResourceReward.Crystal > 0 || Q.ResourceReward.Deuterium > 0)
        {
            Text += FString::Printf(TEXT("    Reward: M:%.0f  C:%.0f  D:%.0f  DM:%d\n"),
                                    Q.ResourceReward.Metal, Q.ResourceReward.Crystal,
                                    Q.ResourceReward.Deuterium, Q.DarkMatterReward);
        }
        Text += TEXT("\n");
    }
    return Text;
}

void UOGameQuestManager::TickExpiry()
{
    FDateTime Now = FDateTime::UtcNow();
    for (auto& Pair : PlayerQuests)
    {
        for (FQuestDefinition& Q : Pair.Value)
        {
            if (Q.Status == EQuestStatus::Active && Q.ExpiresAt < Now)
            {
                Q.Status = EQuestStatus::Expired;
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Quest Pool Builders
// ─────────────────────────────────────────────────────────────────────────────

TArray<FQuestDefinition> UOGameQuestManager::BuildDailyQuestPool() const
{
    TArray<FQuestDefinition> Pool;

    auto MakeObj = [](EQuestObjectiveType T, FString Desc, double Target) -> FQuestObjective
    {
        FQuestObjective O;
        O.ObjectiveId   = UEnum::GetValueAsString(T);
        O.Type          = T;
        O.Description   = Desc;
        O.TargetAmount  = Target;
        return O;
    };

    auto MakeQuest = [&](FString Id, FString Title, FString Desc,
                          TArray<FQuestObjective> Objs,
                          FResources Reward, int32 DM) -> FQuestDefinition
    {
        FQuestDefinition Q;
        Q.QuestId         = Id;
        Q.Title           = Title;
        Q.Description     = Desc;
        Q.QuestType       = EQuestType::Daily;
        Q.Objectives      = Objs;
        Q.ResourceReward  = Reward;
        Q.DarkMatterReward= DM;
        Q.PointsReward    = 100;
        return Q;
    };

    Pool.Add(MakeQuest("daily_mine", "Daily Miner",
                       "Mine resources today.",
                       { MakeObj(EQuestObjectiveType::MineResources, "Mine 50,000 metal", 50000) },
                       FResources(10000, 5000, 0), 0));

    Pool.Add(MakeQuest("daily_build", "Daily Builder",
                       "Start a building upgrade.",
                       { MakeObj(EQuestObjectiveType::BuildBuilding, "Upgrade any building", 1) },
                       FResources(5000, 2500, 1000), 0));

    Pool.Add(MakeQuest("daily_fleet", "Fleet Dispatch",
                       "Launch at least one fleet mission today.",
                       { MakeObj(EQuestObjectiveType::SendFleet, "Send 1 fleet", 1) },
                       FResources(0, 0, 5000), 50));

    Pool.Add(MakeQuest("daily_spy", "Intelligence Officer",
                       "Spy on another player.",
                       { MakeObj(EQuestObjectiveType::SpyOnPlayer, "Spy on 1 player", 1) },
                       FResources(0, 3000, 0), 25));

    Pool.Add(MakeQuest("daily_research", "Daily Scholar",
                       "Complete a research.",
                       { MakeObj(EQuestObjectiveType::CompleteResearch, "Finish 1 research", 1) },
                       FResources(0, 10000, 5000), 0));

    Pool.Add(MakeQuest("daily_ships", "Shipyard Shift",
                       "Build ships today.",
                       { MakeObj(EQuestObjectiveType::BuildShips, "Build 10 ships", 10) },
                       FResources(5000, 5000, 2000), 0));

    Pool.Add(MakeQuest("daily_exp", "Expedition Day",
                       "Run an expedition.",
                       { MakeObj(EQuestObjectiveType::RunExpedition, "Run 1 expedition", 1) },
                       FResources(0, 0, 0), 100));

    return Pool;
}

TArray<FQuestDefinition> UOGameQuestManager::BuildWeeklyQuestPool() const
{
    TArray<FQuestDefinition> Pool;

    auto MakeObj = [](EQuestObjectiveType T, FString Desc, double Target) -> FQuestObjective
    {
        FQuestObjective O;
        O.ObjectiveId   = UEnum::GetValueAsString(T);
        O.Type          = T;
        O.Description   = Desc;
        O.TargetAmount  = Target;
        return O;
    };

    FQuestDefinition Warlord;
    Warlord.QuestId         = TEXT("weekly_combat");
    Warlord.Title           = TEXT("Weekly Warlord");
    Warlord.Description     = TEXT("Win 5 combat engagements this week.");
    Warlord.QuestType       = EQuestType::Weekly;
    Warlord.ResourceReward  = FResources(100000, 50000, 20000);
    Warlord.DarkMatterReward= 500;
    Warlord.PointsReward    = 500;
    Warlord.Objectives.Add(MakeObj(EQuestObjectiveType::WinCombat, "Win 5 combats", 5));
    Pool.Add(Warlord);

    FQuestDefinition Miner;
    Miner.QuestId         = TEXT("weekly_mine");
    Miner.Title           = TEXT("Resource Tycoon");
    Miner.Description     = TEXT("Mine 1,000,000 metal this week.");
    Miner.QuestType       = EQuestType::Weekly;
    Miner.ResourceReward  = FResources(0, 100000, 50000);
    Miner.DarkMatterReward= 250;
    Miner.PointsReward    = 500;
    Miner.Objectives.Add(MakeObj(EQuestObjectiveType::MineResources, "Mine 1M metal", 1000000));
    Pool.Add(Miner);

    FQuestDefinition Explorer;
    Explorer.QuestId         = TEXT("weekly_explore");
    Explorer.Title           = TEXT("Galactic Explorer");
    Explorer.Description     = TEXT("Complete 5 expeditions this week.");
    Explorer.QuestType       = EQuestType::Weekly;
    Explorer.ResourceReward  = FResources(50000, 50000, 50000);
    Explorer.DarkMatterReward= 1000;
    Explorer.PointsReward    = 500;
    Explorer.Objectives.Add(MakeObj(EQuestObjectiveType::RunExpedition, "Run 5 expeditions", 5));
    Pool.Add(Explorer);

    return Pool;
}

FString UOGameQuestManager::ObjectiveTypeName(EQuestObjectiveType Type) const
{
    return UEnum::GetValueAsString(Type);
}
