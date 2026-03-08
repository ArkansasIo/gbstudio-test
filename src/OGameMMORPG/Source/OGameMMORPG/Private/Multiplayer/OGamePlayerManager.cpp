// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Multiplayer/OGamePlayerManager.h"
#include "Core/OGamePlayerState.h"
#include "Core/OGameConstants.h"
#include "Algo/Sort.h"

void UOGamePlayerManager::RegisterPlayer(AOGamePlayerState* PlayerState)
{
    if (!PlayerState) return;
    RegisteredPlayers.AddUnique(PlayerState);
    RecalculateRankings();
}

void UOGamePlayerManager::UnregisterPlayer(const FString& PlayerId)
{
    RegisteredPlayers.RemoveAll([&PlayerId](const AOGamePlayerState* PS)
    {
        return PS && PS->PlayerUniqueId == PlayerId;
    });
}

AOGamePlayerState* UOGamePlayerManager::GetPlayer(const FString& PlayerId) const
{
    for (AOGamePlayerState* PS : RegisteredPlayers)
    {
        if (PS && PS->PlayerUniqueId == PlayerId)
        {
            return PS;
        }
    }
    return nullptr;
}

void UOGamePlayerManager::TickAllResearchQueues()
{
    for (AOGamePlayerState* PS : RegisteredPlayers)
    {
        if (PS && PS->IsResearchComplete())
        {
            PS->CompleteResearch();
        }
    }
}

void UOGamePlayerManager::RecalculateRankings()
{
    Algo::Sort(RegisteredPlayers, [](const AOGamePlayerState* A, const AOGamePlayerState* B)
    {
        if (!A) return false;
        if (!B) return true;
        return A->Score.TotalPoints > B->Score.TotalPoints;
    });

    int32 Rank = 1;
    for (AOGamePlayerState* PS : RegisteredPlayers)
    {
        if (PS)
        {
            PS->Score.Rank = Rank++;
        }
    }
}

TArray<AOGamePlayerState*> UOGamePlayerManager::GetTopPlayers(int32 Count) const
{
    TArray<AOGamePlayerState*> Top;
    for (int32 i = 0; i < FMath::Min(Count, RegisteredPlayers.Num()); ++i)
    {
        if (RegisteredPlayers[i])
        {
            Top.Add(RegisteredPlayers[i]);
        }
    }
    return Top;
}

bool UOGamePlayerManager::IsUnderBeginnerProtection(const AOGamePlayerState* Player) const
{
    if (!Player) return false;
    return Player->Status == EPlayerStatus::Beginner &&
           Player->Score.TotalPoints < OGameConstants::BEGINNER_PROTECTION_POINTS;
}

bool UOGamePlayerManager::CanAttack(const AOGamePlayerState* Attacker,
                                     const AOGamePlayerState* Defender) const
{
    if (!Attacker || !Defender) return false;
    if (IsUnderBeginnerProtection(Defender)) return false;
    if (Defender->Status == EPlayerStatus::Vacation) return false;

    // Noob protection: can't attack someone with 5x lower score
    int64 AttackerPts = Attacker->Score.TotalPoints;
    int64 DefenderPts = Defender->Score.TotalPoints;

    if (DefenderPts > 0 && AttackerPts > DefenderPts * OGameConstants::NOOB_PROTECTION_RATIO)
    {
        return false; // Attacker is too strong
    }
    if (AttackerPts > 0 && DefenderPts > AttackerPts * OGameConstants::NOOB_PROTECTION_RATIO)
    {
        return false; // Defender is too strong (bashing rule)
    }

    return true;
}
