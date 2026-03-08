// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Honor/OGameHonorSystem.h"

UOGameHonorSystem::UOGameHonorSystem()
{
}

FHonorRecord& UOGameHonorSystem::FindOrCreate(const FString& PlayerId)
{
    FHonorRecord* R = Records.Find(PlayerId);
    if (R) return *R;

    FHonorRecord NewR;
    NewR.PlayerId = PlayerId;
    Records.Add(PlayerId, NewR);
    return Records[PlayerId];
}

void UOGameHonorSystem::RecordCombat(const FString& AttackerId, int64 AttackerScore,
                                      const FString& DefenderId, int64 DefenderScore,
                                      ECombatOutcome Outcome,
                                      int64 AttackerShipsLost, int64 DefenderShipsLost)
{
    FHonorRecord& Attacker = FindOrCreate(AttackerId);
    FHonorRecord& Defender = FindOrCreate(DefenderId);

    bool bAttackerWon = (Outcome == ECombatOutcome::AttackerWins);
    bool bDefenderWon = (Outcome == ECombatOutcome::DefenderWins);

    // Update kill/death stats
    Attacker.ShipsDestroyed += DefenderShipsLost;
    Attacker.ShipsLost      += AttackerShipsLost;
    Defender.ShipsDestroyed += AttackerShipsLost;
    Defender.ShipsLost      += DefenderShipsLost;

    if (bAttackerWon) { ++Attacker.AttacksWon;  ++Defender.DefensesLost; }
    else              { ++Attacker.AttacksLost; ++Defender.DefensesWon;  }

    // Honor point distribution
    double HonorGain = CalculateHonorGain(AttackerScore, DefenderScore, bAttackerWon);
    double HonorLoss = CalculateHonorGain(DefenderScore, AttackerScore, bDefenderWon) * 0.5;

    if (HonorGain > 0.0)
    {
        AddHonorPoints(AttackerId, HonorGain);
    }
    else
    {
        // Dishonorable attack
        DeductHonorPoints(AttackerId, FMath::Abs(HonorGain));
    }

    if (bDefenderWon)
    {
        AddHonorPoints(DefenderId, HonorLoss);
    }
}

void UOGameHonorSystem::AddHonorPoints(const FString& PlayerId, double Amount)
{
    FHonorRecord& R = FindOrCreate(PlayerId);
    R.HonorPoints  += Amount;

    EHonorRank OldRank = R.Rank;
    R.Rank = CalculateRank(R.HonorPoints);

    if (R.Rank != OldRank)
    {
        OnHonorRankChanged.Broadcast(PlayerId, R.Rank);
        UE_LOG(LogTemp, Log, TEXT("%s promoted to honor rank: %s"),
               *PlayerId, *GetHonorRankName(R.Rank));
    }
}

void UOGameHonorSystem::DeductHonorPoints(const FString& PlayerId, double Amount)
{
    FHonorRecord& R = FindOrCreate(PlayerId);
    R.HonorPoints   = FMath::Max(0.0, R.HonorPoints - Amount);
    R.Rank          = CalculateRank(R.HonorPoints);
}

double UOGameHonorSystem::GetHonorPoints(const FString& PlayerId) const
{
    const FHonorRecord* R = Records.Find(PlayerId);
    return R ? R->HonorPoints : 0.0;
}

EHonorRank UOGameHonorSystem::GetHonorRank(const FString& PlayerId) const
{
    const FHonorRecord* R = Records.Find(PlayerId);
    return R ? R->Rank : EHonorRank::Recruit;
}

FString UOGameHonorSystem::GetHonorRankName(EHonorRank Rank) const
{
    switch (Rank)
    {
        case EHonorRank::Recruit:           return TEXT("Recruit");
        case EHonorRank::Soldier:           return TEXT("Soldier");
        case EHonorRank::Sergeant:          return TEXT("Sergeant");
        case EHonorRank::Lieutenant:        return TEXT("Lieutenant");
        case EHonorRank::Captain:           return TEXT("Captain");
        case EHonorRank::Major:             return TEXT("Major");
        case EHonorRank::Colonel:           return TEXT("Colonel");
        case EHonorRank::GeneralOfTheArmy:  return TEXT("General of the Army");
        case EHonorRank::HighAdmiral:       return TEXT("High Admiral");
        default: return TEXT("Unknown");
    }
}

TArray<FHonorRecord> UOGameHonorSystem::GetHonorLeaderboard(int32 TopN) const
{
    TArray<FHonorRecord> All;
    for (const auto& Pair : Records) All.Add(Pair.Value);

    All.Sort([](const FHonorRecord& A, const FHonorRecord& B)
    {
        return A.HonorPoints > B.HonorPoints;
    });

    if (All.Num() > TopN) All.SetNum(TopN);
    return All;
}

FHonorRecord UOGameHonorSystem::GetRecord(const FString& PlayerId) const
{
    const FHonorRecord* R = Records.Find(PlayerId);
    return R ? *R : FHonorRecord();
}

FString UOGameHonorSystem::GetHonorLeaderboardText(int32 TopN) const
{
    TArray<FHonorRecord> Board = GetHonorLeaderboard(TopN);

    FString Text;
    Text += TEXT("=== Honor Leaderboard ===\n");
    Text += FString::Printf(TEXT("  %-4s  %-20s  %-20s  %-12s  %-8s  %-8s\n"),
                            TEXT("Rank"), TEXT("Player"), TEXT("Honor Rank"),
                            TEXT("Honor Pts"), TEXT("Wins"), TEXT("Win%"));
    Text += TEXT("─────────────────────────────────────────────────────────────\n");

    for (int32 i = 0; i < Board.Num(); ++i)
    {
        const FHonorRecord& R = Board[i];
        Text += FString::Printf(TEXT("  %-4d  %-20s  %-20s  %-12.0f  %-8d  %-8.1f%%\n"),
                                i + 1, *R.PlayerId, *GetHonorRankName(R.Rank),
                                R.HonorPoints, R.AttacksWon,
                                R.GetWinRate() * 100.0);
    }
    return Text;
}

FString UOGameHonorSystem::GetPlayerHonorText(const FString& PlayerId) const
{
    FHonorRecord R = GetRecord(PlayerId);
    FString Text;
    Text += FString::Printf(TEXT("=== Honor Record: %s ===\n"), *PlayerId);
    Text += FString::Printf(TEXT("  Rank:             %s (%s)\n"),
                            *GetHonorRankName(R.Rank), *UEnum::GetValueAsString(R.Rank));
    Text += FString::Printf(TEXT("  Honor Points:     %.0f\n"), R.HonorPoints);
    Text += FString::Printf(TEXT("  Attacks Won:      %d  Lost: %d  Win Rate: %.1f%%\n"),
                            R.AttacksWon, R.AttacksLost,
                            R.GetWinRate() * 100.0);
    Text += FString::Printf(TEXT("  Defenses Won:     %d  Lost: %d\n"),
                            R.DefensesWon, R.DefensesLost);
    Text += FString::Printf(TEXT("  Ships Destroyed:  %lld  Ships Lost: %lld\n"),
                            R.ShipsDestroyed, R.ShipsLost);
    return Text;
}

EHonorRank UOGameHonorSystem::CalculateRank(double HonorPoints) const
{
    if (HonorPoints >= 500000.0) return EHonorRank::HighAdmiral;
    if (HonorPoints >= 200000.0) return EHonorRank::GeneralOfTheArmy;
    if (HonorPoints >= 80000.0)  return EHonorRank::Colonel;
    if (HonorPoints >= 30000.0)  return EHonorRank::Major;
    if (HonorPoints >= 10000.0)  return EHonorRank::Captain;
    if (HonorPoints >= 3000.0)   return EHonorRank::Lieutenant;
    if (HonorPoints >= 1000.0)   return EHonorRank::Sergeant;
    if (HonorPoints >= 250.0)    return EHonorRank::Soldier;
    return EHonorRank::Recruit;
}

double UOGameHonorSystem::CalculateHonorGain(int64 AttackerScore, int64 DefenderScore,
                                               bool bWon) const
{
    if (DefenderScore <= 0 || AttackerScore <= 0) return 0.0;

    double Ratio    = static_cast<double>(DefenderScore) / static_cast<double>(AttackerScore);
    double BaseGain = 100.0;

    // Dishonorable if attacker is 5x stronger
    if (Ratio < 0.2) return -200.0;
    // Fair fight
    if (Ratio >= 0.5) BaseGain *= 1.5;
    // Underdog bonus
    if (Ratio > 2.0)  BaseGain *= Ratio;

    return bWon ? BaseGain : BaseGain * 0.3;
}
