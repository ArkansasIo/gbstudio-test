// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Combat/OGameCombatManager.h"
#include "Universe/OGamePlanet.h"
#include "Fleet/OGameFleet.h"
#include "Math/UnrealMathUtility.h"

// ── FCombatSide helpers ───────────────────────────────────────────────────────

double FCombatSide::TotalAttack() const
{
    double Total = 0.0;
    for (const FCombatUnit& Unit : Units)
    {
        Total += Unit.Attack * Unit.Count;
    }
    return Total;
}

double FCombatSide::TotalShield() const
{
    double Total = 0.0;
    for (const FCombatUnit& Unit : Units)
    {
        Total += Unit.Shield * Unit.Count;
    }
    return Total;
}

double FCombatSide::TotalHull() const
{
    double Total = 0.0;
    for (const FCombatUnit& Unit : Units)
    {
        Total += Unit.Hull * Unit.Count;
    }
    return Total;
}

int64 FCombatSide::TotalUnitCount() const
{
    int64 Total = 0;
    for (const FCombatUnit& Unit : Units)
    {
        Total += Unit.Count;
    }
    return Total;
}

bool FCombatSide::IsDefeated() const
{
    return TotalUnitCount() <= 0;
}

// ── UOGameCombatManager ───────────────────────────────────────────────────────

FCombatReport UOGameCombatManager::ResolveBattle(UOGamePlanet* DefenderPlanet,
                                                   TArray<UOGameFleet*>& AttackingFleets)
{
    FCombatReport Report;
    Report.CombatTime = FDateTime::UtcNow();

    if (!DefenderPlanet || AttackingFleets.IsEmpty())
    {
        Report.Outcome = ECombatOutcome::Draw;
        return Report;
    }

    Report.DefenderName = DefenderPlanet->OwnerPlayerId;
    Report.Location     = DefenderPlanet->Coordinates;

    if (!AttackingFleets.IsEmpty() && AttackingFleets[0])
    {
        Report.AttackerName = AttackingFleets[0]->OwnerPlayerId;
    }

    TMap<EResearchType, int32> EmptyTech;

    FCombatSide Attackers = BuildAttackerSide(AttackingFleets, EmptyTech);
    FCombatSide Defenders = BuildDefenderSide(DefenderPlanet, EmptyTech);

    ApplyTechnologyBonuses(Attackers, EmptyTech);
    ApplyTechnologyBonuses(Defenders, EmptyTech);

    FCombatSide InitialAttackers = Attackers;
    FCombatSide InitialDefenders = Defenders;

    int32 Round = 0;
    while (Round < OGameConstants::MAX_COMBAT_ROUNDS && !Attackers.IsDefeated() && !Defenders.IsDefeated())
    {
        ++Round;
        FString RoundLog = SimulateRound(Attackers, Defenders, Round);
        Report.RoundLogs.Add(RoundLog);

        RebuildShields(Attackers, EmptyTech);
        RebuildShields(Defenders, EmptyTech);
    }

    // Determine outcome
    if (Attackers.IsDefeated() && Defenders.IsDefeated())
    {
        Report.Outcome = ECombatOutcome::Draw;
    }
    else if (Defenders.IsDefeated() || (!Attackers.IsDefeated() && Round >= OGameConstants::MAX_COMBAT_ROUNDS
             && Defenders.TotalUnitCount() < Attackers.TotalUnitCount()))
    {
        Report.Outcome = ECombatOutcome::AttackerWins;

        // Calculate loot
        int64 TotalCargo = 0;
        for (const UOGameFleet* Fleet : AttackingFleets)
        {
            if (!Fleet) continue;
            for (const auto& Pair : Fleet->Ships.Ships)
            {
                OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
                TotalCargo += static_cast<int64>(Stats.CargoCapacity) * Pair.Value;
            }
        }
        Report.LootedResources = CalculateLoot(DefenderPlanet, TotalCargo);
        DefenderPlanet->SpendResources(Report.LootedResources);
    }
    else
    {
        Report.Outcome = ECombatOutcome::DefenderWins;
    }

    // Calculate losses and debris
    Report.AttackerLosses = CalculateDebris(InitialAttackers);  // resource equivalent of losses
    Report.DefenderLosses = CalculateDebris(InitialDefenders);
    Report.DebrisField    = Report.AttackerLosses + Report.DefenderLosses;

    DefenderPlanet->DebrisField = DefenderPlanet->DebrisField + Report.DebrisField;

    return Report;
}

FString UOGameCombatManager::SimulateRound(FCombatSide& Attackers, FCombatSide& Defenders,
                                            int32 RoundNumber)
{
    FString Log = FString::Printf(TEXT("--- Round %d ---\n"), RoundNumber);

    // Attackers fire at defenders
    for (FCombatUnit& Unit : Attackers.Units)
    {
        if (Unit.Count <= 0) continue;
        FireUnit(Unit, Defenders, Log);
    }

    // Defenders fire at attackers
    for (FCombatUnit& Unit : Defenders.Units)
    {
        if (Unit.Count <= 0) continue;
        FireUnit(Unit, Attackers, Log);
    }

    Log += FString::Printf(TEXT("Attackers: %lld units remaining\n"), Attackers.TotalUnitCount());
    Log += FString::Printf(TEXT("Defenders: %lld units remaining\n"), Defenders.TotalUnitCount());
    return Log;
}

void UOGameCombatManager::FireUnit(FCombatUnit& Shooter, FCombatSide& TargetSide, FString& RoundLog)
{
    if (TargetSide.Units.IsEmpty()) return;

    // Select random target
    int32 TargetIdx = FMath::RandRange(0, TargetSide.Units.Num() - 1);
    FCombatUnit& Target = TargetSide.Units[TargetIdx];
    if (Target.Count <= 0) return;

    double Damage = Shooter.Attack * Shooter.Count;

    // Absorb with shield first
    if (Target.Shield > 0.0)
    {
        double ShieldAbsorb = FMath::Min(Damage, Target.Shield * Target.Count);
        Damage -= ShieldAbsorb;
        // Shields reduce; in simplified version we take off proportionally
        Target.Shield -= ShieldAbsorb / FMath::Max(1.0, static_cast<double>(Target.Count));
        Target.Shield = FMath::Max(0.0, Target.Shield);
    }

    if (Damage > 0.0)
    {
        // Hull damage
        double HullDmgPerUnit = Damage / FMath::Max(1.0, static_cast<double>(Target.Count));
        Target.Hull -= HullDmgPerUnit;

        // Check if units are destroyed
        if (Target.Hull <= 0.0)
        {
            int64 Destroyed = Target.Count;
            Target.Count = 0;
            RoundLog += FString::Printf(TEXT("  %s destroyed %lld x %s\n"),
                *Shooter.Name, Destroyed, *Target.Name);
        }
        else if (Target.Hull < Target.Shield * OGameConstants::HULL_EXPLOSION_THRESHOLD)
        {
            // Random explosion chance
            if (FMath::FRand() < OGameConstants::HULL_EXPLOSION_PROBABILITY * Target.Count)
            {
                --Target.Count;
                if (Target.Count <= 0) Target.Count = 0;
            }
        }
    }
}

void UOGameCombatManager::RebuildShields(FCombatSide& Side, const TMap<EResearchType, int32>& Tech)
{
    // Shields regenerate 0% per round in OGame (no regeneration)
    // This function exists for future expansion (shield regen mods).
}

FCombatSide UOGameCombatManager::BuildAttackerSide(TArray<UOGameFleet*>& Fleets,
                                                    const TMap<EResearchType, int32>& Tech)
{
    FCombatSide Side;
    Side.OwnerName = Fleets.IsEmpty() || !Fleets[0] ? TEXT("Attacker") : Fleets[0]->OwnerPlayerId;

    TMap<EShipType, int64> TotalShips;
    for (const UOGameFleet* Fleet : Fleets)
    {
        if (!Fleet) continue;
        for (const auto& Pair : Fleet->Ships.Ships)
        {
            TotalShips.FindOrAdd(Pair.Key) += Pair.Value;
        }
    }

    for (const auto& Pair : TotalShips)
    {
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name    = FString::Printf(TEXT("Ship[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield  = Stats.ShieldPower;
        Unit.Hull    = Stats.StructuralIntegrity;
        Unit.Attack  = Stats.AttackPower;
        Unit.Count   = Pair.Value;
        Side.Units.Add(Unit);
    }

    return Side;
}

FCombatSide UOGameCombatManager::BuildDefenderSide(UOGamePlanet* Planet,
                                                    const TMap<EResearchType, int32>& Tech)
{
    FCombatSide Side;
    Side.OwnerName = Planet ? Planet->OwnerPlayerId : TEXT("Defender");

    if (!Planet) return Side;

    // Fleet
    for (const auto& Pair : Planet->StationedFleet.Ships)
    {
        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name    = FString::Printf(TEXT("Ship[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield  = Stats.ShieldPower;
        Unit.Hull    = Stats.StructuralIntegrity;
        Unit.Attack  = Stats.AttackPower;
        Unit.Count   = Pair.Value;
        Side.Units.Add(Unit);
    }

    // Defense
    for (const auto& Pair : Planet->DefenseUnits)
    {
        OGameConstants::FDefenseBaseStats Stats = OGameConstants::GetDefenseBaseStats(Pair.Key);
        FCombatUnit Unit;
        Unit.Name    = FString::Printf(TEXT("Defense[%d]"), static_cast<int32>(Pair.Key));
        Unit.Shield  = Stats.ShieldPower;
        Unit.Hull    = Stats.StructuralIntegrity;
        Unit.Attack  = Stats.AttackPower;
        Unit.Count   = Pair.Value;
        Side.Units.Add(Unit);
    }

    return Side;
}

FResources UOGameCombatManager::CalculateLoot(UOGamePlanet* Planet, int64 AttackerCargoCapacity)
{
    if (!Planet) return FResources();

    double MaxMetal     = Planet->StoredResources.Metal     * OGameConstants::LOOT_PERCENTAGE;
    double MaxCrystal   = Planet->StoredResources.Crystal   * OGameConstants::LOOT_PERCENTAGE;
    double MaxDeuterium = Planet->StoredResources.Deuterium * OGameConstants::LOOT_PERCENTAGE;
    double TotalAvail   = MaxMetal + MaxCrystal + MaxDeuterium;

    if (TotalAvail <= 0.0 || AttackerCargoCapacity <= 0)
    {
        return FResources();
    }

    double CapRatio = FMath::Min(1.0, AttackerCargoCapacity / TotalAvail);

    return FResources(MaxMetal     * CapRatio,
                      MaxCrystal   * CapRatio,
                      MaxDeuterium * CapRatio);
}

FResources UOGameCombatManager::CalculateDebris(const FCombatSide& Losers)
{
    FResources Debris;
    for (const FCombatUnit& Unit : Losers.Units)
    {
        // In a full implementation we'd look up original cost; simplified here
        double LostCount = Unit.Count; // simplistic: assume all lost as debris
        Debris.Metal   += LostCount * 1000.0 * OGameConstants::DEBRIS_METAL_PERCENTAGE;
        Debris.Crystal += LostCount * 500.0  * OGameConstants::DEBRIS_CRYSTAL_PERCENTAGE;
    }
    return Debris;
}

void UOGameCombatManager::ApplyTechnologyBonuses(FCombatSide& Side,
                                                   const TMap<EResearchType, int32>& Tech)
{
    const int32* WepLevel    = Tech.Find(EResearchType::WeaponsTechnology);
    const int32* ShieldLevel = Tech.Find(EResearchType::ShieldingTechnology);
    const int32* ArmourLevel = Tech.Find(EResearchType::ArmourTechnology);

    double WeaponBonus  = 1.0 + 0.1 * (WepLevel    ? *WepLevel    : 0);
    double ShieldBonus  = 1.0 + 0.1 * (ShieldLevel ? *ShieldLevel : 0);
    double ArmourBonus  = 1.0 + 0.1 * (ArmourLevel ? *ArmourLevel : 0);

    for (FCombatUnit& Unit : Side.Units)
    {
        Unit.Attack *= WeaponBonus;
        Unit.Shield *= ShieldBonus;
        Unit.Hull   *= ArmourBonus;
    }
}

bool UOGameCombatManager::RollRapidFire(EShipType Shooter, EShipType Target)
{
    // Simplified rapid-fire table (OGame rules subset)
    if (Shooter == EShipType::Cruiser      && Target == EShipType::LightFighter) return FMath::FRand() < 0.833f;
    if (Shooter == EShipType::Battleship   && Target == EShipType::EspionageProbe) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::SmallCargo) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::LargeCargo) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::LightFighter) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::HeavyFighter) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::Cruiser) return true;
    if (Shooter == EShipType::DeathStar    && Target == EShipType::Battleship) return true;
    return false;
}
