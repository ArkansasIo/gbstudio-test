// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Achievements/OGameAchievementManager.h"

UOGameAchievementManager::UOGameAchievementManager()
{
    InitialiseCatalogue();
}

void UOGameAchievementManager::InitialiseCatalogue()
{
    // ── Economy Achievements ──────────────────────────────────────────────────
    auto AddAch = [&](FString Id, FString Name, FString Desc,
                      EAchievementCategory Cat, EAchievementTier Tier,
                      double Target, int32 DM, FResources Reward = FResources())
    {
        FAchievement A;
        A.AchievementId    = Id;
        A.Name             = Name;
        A.Description      = Desc;
        A.Category         = Cat;
        A.Tier             = Tier;
        A.TargetValue      = Target;
        A.DarkMatterReward = DM;
        A.ResourceReward   = Reward;
        AchievementCatalogue.Add(A);
    };

    // Economy
    AddAch("eco_mine_1M",    "First Million",     "Mine 1,000,000 metal.",
           EAchievementCategory::Economy, EAchievementTier::Bronze, 1e6, 500);
    AddAch("eco_mine_100M",  "Metal Baron",       "Mine 100,000,000 metal.",
           EAchievementCategory::Economy, EAchievementTier::Silver, 1e8, 2500);
    AddAch("eco_mine_10B",   "Industrial Empire", "Mine 10,000,000,000 metal.",
           EAchievementCategory::Economy, EAchievementTier::Gold, 1e10, 10000);
    AddAch("eco_trader_10",  "Market Participant","Complete 10 trades.",
           EAchievementCategory::Economy, EAchievementTier::Bronze, 10, 250);
    AddAch("eco_trader_100", "Market Master",     "Complete 100 trades.",
           EAchievementCategory::Economy, EAchievementTier::Silver, 100, 2000);
    AddAch("eco_colony_2",   "Colonist",          "Own 2 planets.",
           EAchievementCategory::Economy, EAchievementTier::Bronze, 2, 500);
    AddAch("eco_colony_8",   "Empire Builder",    "Own 8 planets.",
           EAchievementCategory::Economy, EAchievementTier::Gold, 8, 5000);

    // Military
    AddAch("mil_combat_1",   "First Blood",        "Win your first combat.",
           EAchievementCategory::Military, EAchievementTier::Bronze, 1, 250);
    AddAch("mil_combat_50",  "Veteran",            "Win 50 combats.",
           EAchievementCategory::Military, EAchievementTier::Silver, 50, 2000);
    AddAch("mil_combat_500", "Warlord",            "Win 500 combats.",
           EAchievementCategory::Military, EAchievementTier::Gold, 500, 10000);
    AddAch("mil_destroy_1K", "Destroyer",          "Destroy 1,000 ships.",
           EAchievementCategory::Military, EAchievementTier::Bronze, 1000, 500);
    AddAch("mil_destroy_1M", "Annihilator",        "Destroy 1,000,000 ships.",
           EAchievementCategory::Military, EAchievementTier::Diamond, 1e6, 50000);
    AddAch("mil_fleet_1K",   "Fleet Commander",    "Have 1,000 ships stationed.",
           EAchievementCategory::Military, EAchievementTier::Silver, 1000, 1000);
    AddAch("mil_deathstar",  "Death Star Pilot",   "Build a Death Star.",
           EAchievementCategory::Military, EAchievementTier::Gold, 1, 25000);

    // Research
    AddAch("res_first",      "Scholar",            "Complete your first research.",
           EAchievementCategory::Research, EAchievementTier::Bronze, 1, 100);
    AddAch("res_all_basic",  "Scientist",          "Reach level 5 in all basic techs.",
           EAchievementCategory::Research, EAchievementTier::Silver, 1, 5000);
    AddAch("res_plasma",     "Plasma Engineer",    "Research Plasma Technology.",
           EAchievementCategory::Research, EAchievementTier::Gold, 1, 3000);
    AddAch("res_graviton",   "Graviton Master",    "Research Graviton Technology.",
           EAchievementCategory::Research, EAchievementTier::Diamond, 1, 100000);

    // Diplomacy
    AddAch("dip_join",       "Team Player",        "Join an alliance.",
           EAchievementCategory::Diplomacy, EAchievementTier::Bronze, 1, 100);
    AddAch("dip_lead",       "Alliance Leader",    "Found an alliance.",
           EAchievementCategory::Diplomacy, EAchievementTier::Silver, 1, 500);
    AddAch("dip_pact_5",     "Diplomat",           "Establish 5 diplomatic pacts.",
           EAchievementCategory::Diplomacy, EAchievementTier::Gold, 5, 2000);

    // Exploration
    AddAch("exp_first",      "Explorer",           "Complete your first expedition.",
           EAchievementCategory::Exploration, EAchievementTier::Bronze, 1, 200);
    AddAch("exp_100",        "Pathfinder",         "Complete 100 expeditions.",
           EAchievementCategory::Exploration, EAchievementTier::Silver, 100, 2000);
    AddAch("exp_ruins",      "Archaeologist",      "Discover Ancient Ruins on an expedition.",
           EAchievementCategory::Exploration, EAchievementTier::Gold, 1, 5000);
    AddAch("exp_moon",       "Moonwalker",         "Create your first moon.",
           EAchievementCategory::Exploration, EAchievementTier::Silver, 1, 1000);

    // Social
    AddAch("soc_message_10", "Communicator",       "Send 10 messages.",
           EAchievementCategory::Social, EAchievementTier::Bronze, 10, 50);
    AddAch("soc_spy_10",     "Shadow Agent",       "Successfully spy on 10 players.",
           EAchievementCategory::Social, EAchievementTier::Bronze, 10, 500);

    // Prestige
    AddAch("pre_rank_100",   "Rising Star",        "Reach rank 100 in the universe.",
           EAchievementCategory::Prestige, EAchievementTier::Silver, 1, 3000);
    AddAch("pre_rank_10",    "Elite",              "Reach rank 10 in the universe.",
           EAchievementCategory::Prestige, EAchievementTier::Gold, 1, 15000);
    AddAch("pre_rank_1",     "Number One",         "Reach rank 1 in the universe.",
           EAchievementCategory::Prestige, EAchievementTier::Diamond, 1, 100000);
}

TArray<FAchievement> UOGameAchievementManager::GetAchievementsByCategory(EAchievementCategory Category) const
{
    TArray<FAchievement> Result;
    for (const FAchievement& A : AchievementCatalogue)
    {
        if (A.Category == Category) Result.Add(A);
    }
    return Result;
}

bool UOGameAchievementManager::GetAchievement(const FString& AchievementId, FAchievement& OutAchievement) const
{
    for (const FAchievement& A : AchievementCatalogue)
    {
        if (A.AchievementId == AchievementId)
        {
            OutAchievement = A;
            return true;
        }
    }
    return false;
}

FPlayerAchievementProgress* UOGameAchievementManager::FindOrCreateProgress(
    const FString& PlayerId, const FString& AchievementId)
{
    TArray<FPlayerAchievementProgress>& ProgressList = PlayerProgress.FindOrAdd(PlayerId);
    for (FPlayerAchievementProgress& P : ProgressList)
    {
        if (P.AchievementId == AchievementId) return &P;
    }

    FPlayerAchievementProgress NewP;
    NewP.AchievementId = AchievementId;
    ProgressList.Add(NewP);
    return &ProgressList.Last();
}

void UOGameAchievementManager::UpdateProgress(const FString& PlayerId,
                                               const FString& AchievementId,
                                               double Delta)
{
    FAchievement Def;
    if (!GetAchievement(AchievementId, Def)) return;

    FPlayerAchievementProgress* P = FindOrCreateProgress(PlayerId, AchievementId);
    if (P->bUnlocked && !Def.bRepeatable) return;

    P->CurrentProgress += Delta;

    if (!P->bUnlocked && P->CurrentProgress >= Def.TargetValue)
    {
        P->bUnlocked  = true;
        P->UnlockedAt = FDateTime::UtcNow();
        OnAchievementUnlocked.Broadcast(PlayerId, Def);
        UE_LOG(LogTemp, Log, TEXT("Achievement '%s' unlocked by %s"), *Def.Name, *PlayerId);
    }
}

void UOGameAchievementManager::SetProgress(const FString& PlayerId,
                                            const FString& AchievementId,
                                            double Value)
{
    FAchievement Def;
    if (!GetAchievement(AchievementId, Def)) return;

    FPlayerAchievementProgress* P = FindOrCreateProgress(PlayerId, AchievementId);
    P->CurrentProgress = Value;

    if (!P->bUnlocked && P->CurrentProgress >= Def.TargetValue)
    {
        P->bUnlocked  = true;
        P->UnlockedAt = FDateTime::UtcNow();
        OnAchievementUnlocked.Broadcast(PlayerId, Def);
    }
}

bool UOGameAchievementManager::ClaimReward(const FString& PlayerId,
                                            const FString& AchievementId,
                                            FResources& OutResources,
                                            int32& OutDarkMatter)
{
    FAchievement Def;
    if (!GetAchievement(AchievementId, Def)) return false;

    FPlayerAchievementProgress* P = FindOrCreateProgress(PlayerId, AchievementId);
    if (!P->bUnlocked || P->bRewardClaimed) return false;

    P->bRewardClaimed = true;
    OutResources  = Def.ResourceReward;
    OutDarkMatter = Def.DarkMatterReward;
    return true;
}

TArray<FPlayerAchievementProgress> UOGameAchievementManager::GetPlayerProgress(
    const FString& PlayerId) const
{
    const TArray<FPlayerAchievementProgress>* Found = PlayerProgress.Find(PlayerId);
    return Found ? *Found : TArray<FPlayerAchievementProgress>();
}

int32 UOGameAchievementManager::GetUnlockedCount(const FString& PlayerId) const
{
    const TArray<FPlayerAchievementProgress>* Found = PlayerProgress.Find(PlayerId);
    if (!Found) return 0;

    int32 Count = 0;
    for (const FPlayerAchievementProgress& P : *Found)
    {
        if (P.bUnlocked) ++Count;
    }
    return Count;
}

FString UOGameAchievementManager::GetAchievementSummaryText(const FString& PlayerId) const
{
    TArray<FPlayerAchievementProgress> Progress = GetPlayerProgress(PlayerId);
    int32 Unlocked = GetUnlockedCount(PlayerId);

    FString Text;
    Text += FString::Printf(TEXT("=== Achievements (%d/%d unlocked) ===\n"),
                            Unlocked, AchievementCatalogue.Num());

    for (const FAchievement& A : AchievementCatalogue)
    {
        double CurProgress = 0.0;
        bool   bUnlocked   = false;
        bool   bClaimed    = false;

        for (const FPlayerAchievementProgress& P : Progress)
        {
            if (P.AchievementId == A.AchievementId)
            {
                CurProgress = P.CurrentProgress;
                bUnlocked   = P.bUnlocked;
                bClaimed    = P.bRewardClaimed;
                break;
            }
        }

        FString Status = bUnlocked ? (bClaimed ? TEXT("[DONE]") : TEXT("[CLAIM]")) : TEXT("[    ]");
        float Pct = A.TargetValue > 0.0 ? FMath::Clamp(static_cast<float>(CurProgress / A.TargetValue) * 100.0f, 0.0f, 100.0f) : 0.0f;

        Text += FString::Printf(TEXT("  %s [%-8s] %-36s %5.1f%%  DM: %d\n"),
                                *Status, *TierName(A.Tier), *A.Name, Pct, A.DarkMatterReward);
    }
    return Text;
}

FString UOGameAchievementManager::TierName(EAchievementTier Tier) const
{
    switch (Tier)
    {
        case EAchievementTier::Bronze:  return TEXT("Bronze");
        case EAchievementTier::Silver:  return TEXT("Silver");
        case EAchievementTier::Gold:    return TEXT("Gold");
        case EAchievementTier::Diamond: return TEXT("Diamond");
        default: return TEXT("?");
    }
}
