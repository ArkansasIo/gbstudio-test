// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameCombatManager.h - Round-based combat simulator (OGame rules).

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameConstants.h"
#include "OGameCombatManager.generated.h"

class UOGamePlanet;
class UOGameFleet;

USTRUCT()
struct FCombatSide
{
    GENERATED_BODY()

    FString OwnerName;
    TArray<FCombatUnit> Units;

    double TotalAttack()  const;
    double TotalShield()  const;
    double TotalHull()    const;
    int64  TotalUnitCount() const;
    bool   IsDefeated() const;
};

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameCombatManager : public UObject
{
    GENERATED_BODY()

public:
    // Main entry point: resolve a full battle between attacker fleets and a defended planet
    UFUNCTION(BlueprintCallable, Category = "OGame|Combat")
    FCombatReport ResolveBattle(UOGamePlanet* DefenderPlanet,
                                TArray<UOGameFleet*>& AttackingFleets);

    // Simulate a single combat round; returns round log line
    UFUNCTION(BlueprintCallable, Category = "OGame|Combat")
    FString SimulateRound(FCombatSide& Attackers, FCombatSide& Defenders, int32 RoundNumber);

    // Build a combat side from a fleet array
    static FCombatSide BuildAttackerSide(TArray<UOGameFleet*>& Fleets,
                                          const TMap<EResearchType, int32>& Tech);

    // Build a combat side from a planet's defense + stationed fleet
    static FCombatSide BuildDefenderSide(UOGamePlanet* Planet,
                                          const TMap<EResearchType, int32>& Tech);

    // Calculate loot from a defeated defender planet
    static FResources CalculateLoot(UOGamePlanet* Planet, int64 AttackerCargoCapacity);

    // Calculate debris from losses
    static FResources CalculateDebris(const FCombatSide& Losers);

private:
    // Apply weapon-tech multipliers to attack/shield values
    static void ApplyTechnologyBonuses(FCombatSide& Side, const TMap<EResearchType, int32>& Tech);

    // One unit fires at a random enemy unit
    void FireUnit(FCombatUnit& Shooter, FCombatSide& TargetSide, FString& RoundLog);

    // Rapid-fire logic: returns true if unit may fire again
    static bool RollRapidFire(EShipType Shooter, EShipType Target);

    // Rebuild shields after a round
    static void RebuildShields(FCombatSide& Side, const TMap<EResearchType, int32>& Tech);
};
