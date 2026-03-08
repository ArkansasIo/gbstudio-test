// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGamePlayerManager.h - Manages all registered players: research queues, leaderboards.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGamePlayerManager.generated.h"

class AOGamePlayerState;

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGamePlayerManager : public UObject
{
    GENERATED_BODY()

public:
    // ── Registration ──────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Players")
    void RegisterPlayer(AOGamePlayerState* PlayerState);

    UFUNCTION(BlueprintCallable, Category = "OGame|Players")
    void UnregisterPlayer(const FString& PlayerId);

    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    AOGamePlayerState* GetPlayer(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    TArray<AOGamePlayerState*> GetAllPlayers() const { return RegisteredPlayers; }

    // ── Server Ticks ─────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickAllResearchQueues();

    // ── Leaderboard ───────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Players")
    void RecalculateRankings();

    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    TArray<AOGamePlayerState*> GetTopPlayers(int32 Count = 100) const;

    // ── Beginner Protection ───────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    bool IsUnderBeginnerProtection(const AOGamePlayerState* Player) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    bool CanAttack(const AOGamePlayerState* Attacker, const AOGamePlayerState* Defender) const;

private:
    UPROPERTY()
    TArray<AOGamePlayerState*> RegisteredPlayers;

    static bool SortByTotalPoints(const AOGamePlayerState* A, const AOGamePlayerState* B);
};
