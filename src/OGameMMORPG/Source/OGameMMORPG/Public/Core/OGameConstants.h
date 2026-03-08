// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameConstants.h - Game balance constants for the OGame MMORPG.

#pragma once

#include "CoreMinimal.h"
#include "Core/OGameTypes.h"

namespace OGameConstants
{
    // ─────────────────────────────────────────────────────────────────────────
    // Universe Configuration
    // ─────────────────────────────────────────────────────────────────────────
    constexpr int32 MAX_GALAXIES      = 9;
    constexpr int32 MAX_SYSTEMS       = 499;
    constexpr int32 MAX_POSITIONS     = 15;
    constexpr float UNIVERSE_SPEED    = 1.0f;  // multiplier (1x normal)
    constexpr float FLEET_SPEED       = 1.0f;
    constexpr float ECONOMY_SPEED     = 1.0f;
    constexpr float RESEARCH_SPEED    = 1.0f;
    constexpr int32 BEGINNER_PROTECTION_POINTS = 5000;

    // ─────────────────────────────────────────────────────────────────────────
    // Resource Production Base Values (per hour at level 1)
    // ─────────────────────────────────────────────────────────────────────────
    constexpr double BASE_METAL_PRODUCTION      = 30.0;
    constexpr double BASE_CRYSTAL_PRODUCTION    = 15.0;
    constexpr double BASE_DEUTERIUM_PRODUCTION  = 0.0;

    // Mine production formula: Base * Level * 1.1^Level
    constexpr double MINE_BASE_FACTOR           = 30.0;
    constexpr double MINE_LEVEL_EXPONENT        = 1.1;

    // ─────────────────────────────────────────────────────────────────────────
    // Building Cost Formulas  (Base * 2^(Level-1))
    // ─────────────────────────────────────────────────────────────────────────
    struct FBuildingBaseCost
    {
        double Metal;
        double Crystal;
        double Deuterium;
        double CostFactor; // multiplier per level
    };

    inline FBuildingBaseCost GetBuildingBaseCost(EBuildingType Type)
    {
        switch (Type)
        {
            case EBuildingType::MetalMine:               return {60,    15,    0,    1.5};
            case EBuildingType::CrystalMine:             return {48,    24,    0,    1.6};
            case EBuildingType::DeuteriumSynthesizer:    return {225,   75,    0,    1.5};
            case EBuildingType::SolarPowerPlant:         return {75,    30,    0,    1.5};
            case EBuildingType::FusionReactor:           return {900,   360,   180,  1.8};
            case EBuildingType::MetalStorage:            return {1000,  0,     0,    2.0};
            case EBuildingType::CrystalStorage:          return {1000,  500,   0,    2.0};
            case EBuildingType::DeuteriumTank:           return {1000,  1000,  0,    2.0};
            case EBuildingType::RoboticsFactory:         return {400,   120,   200,  2.0};
            case EBuildingType::Shipyard:                return {400,   200,   100,  2.0};
            case EBuildingType::ResearchLab:             return {200,   400,   200,  2.0};
            case EBuildingType::AllianceDepot:           return {20000, 40000, 0,    2.0};
            case EBuildingType::MissileSilo:             return {20000, 20000, 1000, 2.0};
            case EBuildingType::NaniteFactory:           return {1000000, 500000, 100000, 2.0};
            case EBuildingType::Terraformer:             return {0,     50000, 100,  2.0};
            case EBuildingType::SpaceDock:               return {200,   0,     50,   2.0};
            case EBuildingType::LunarBase:               return {20000, 40000, 20000, 2.0};
            case EBuildingType::SensorPhalanx:           return {20000, 40000, 0,    2.0};
            case EBuildingType::JumpGate:                return {2000000, 4000000, 2000000, 2.0};
            default:                                     return {100,   50,    0,    2.0};
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Ship Stats (base values before technology bonuses)
    // ─────────────────────────────────────────────────────────────────────────
    struct FShipBaseStats
    {
        double MetalCost;
        double CrystalCost;
        double DeuteriumCost;
        double StructuralIntegrity; // hull
        double ShieldPower;
        double AttackPower;
        double CargoCapacity;
        double BaseSpeed;
        double FuelConsumption;
    };

    inline FShipBaseStats GetShipBaseStats(EShipType Type)
    {
        switch (Type)
        {
            case EShipType::SmallCargo:
                return {2000,    2000,    0,      4000,  10,  5,    5000,  5000,  10};
            case EShipType::LargeCargo:
                return {6000,    6000,    0,      12000, 25,  5,    25000, 7500,  50};
            case EShipType::LightFighter:
                return {3000,    1000,    0,      4000,  10,  50,   50,    12500, 20};
            case EShipType::HeavyFighter:
                return {6000,    4000,    0,      10000, 25,  150,  100,   10000, 75};
            case EShipType::Cruiser:
                return {20000,   7000,    2000,   27000, 50,  400,  800,   15000, 300};
            case EShipType::Battleship:
                return {45000,   15000,   0,      60000, 200, 1000, 1500,  10000, 500};
            case EShipType::ColonyShip:
                return {10000,   20000,   10000,  30000, 100, 50,   7500,  2500,  1000};
            case EShipType::Recycler:
                return {10000,   6000,    2000,   16000, 10,  1,    20000, 2000,  300};
            case EShipType::EspionageProbe:
                return {0,       1000,    0,      1000,  0,   0,    0,     100000000, 1};
            case EShipType::Bomber:
                return {50000,   25000,   15000,  75000, 500, 1000, 500,   4000,  1000};
            case EShipType::Destroyer:
                return {60000,   50000,   15000,  110000,500, 2000, 2000,  5000,  1000};
            case EShipType::DeathStar:
                return {5000000, 4000000, 1000000,9000000,50000,200000,1000000,100,1};
            case EShipType::Battlecruiser:
                return {30000,   40000,   15000,  70000, 400, 700,  750,   10000, 250};
            case EShipType::Crawler:
                return {2000,    2000,    1000,   4000,  1,   1,    0,     0,     0};
            case EShipType::Reaper:
                return {85000,   55000,   20000,  140000,700, 2800, 10000, 7000,  1100};
            case EShipType::Pathfinder:
                return {8000,    15000,   8000,   23000, 100, 150,  10000, 12000, 300};
            default:
                return {1000,    500,     0,      1000,  10,  10,   100,   1000,  10};
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Defense Stats
    // ─────────────────────────────────────────────────────────────────────────
    struct FDefenseBaseStats
    {
        double MetalCost;
        double CrystalCost;
        double DeuteriumCost;
        double StructuralIntegrity;
        double ShieldPower;
        double AttackPower;
    };

    inline FDefenseBaseStats GetDefenseBaseStats(EDefenseType Type)
    {
        switch (Type)
        {
            case EDefenseType::RocketLauncher:          return {2000,    0,      0,      2000,   20,     80};
            case EDefenseType::LightLaser:              return {1500,    500,    0,      2000,   25,     100};
            case EDefenseType::HeavyLaser:              return {6000,    2000,   0,      8000,   100,    250};
            case EDefenseType::GaussCannon:             return {20000,   15000,  2000,   35000,  200,    1100};
            case EDefenseType::IonCannon:               return {2000,    6000,   0,      8000,   500,    150};
            case EDefenseType::PlasmaTurret:            return {50000,   50000,  30000,  100000, 300,    3000};
            case EDefenseType::SmallShieldDome:         return {10000,   10000,  0,      20000,  2000,   1};
            case EDefenseType::LargeShieldDome:         return {50000,   50000,  0,      100000, 10000,  1};
            case EDefenseType::AntiBallisticMissile:    return {8000,    0,      2000,   8000,   1,      1};
            case EDefenseType::InterplanetaryMissile:   return {12500,   2500,   10000,  1,      1,      12000};
            default:                                    return {1000,    500,    0,      1000,   10,     50};
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Combat Constants
    // ─────────────────────────────────────────────────────────────────────────
    constexpr int32  MAX_COMBAT_ROUNDS          = 6;
    constexpr double LOOT_PERCENTAGE            = 0.5;    // 50% of resources can be looted
    constexpr double DEBRIS_METAL_PERCENTAGE    = 0.3;    // 30% of destroyed ship cost
    constexpr double DEBRIS_CRYSTAL_PERCENTAGE  = 0.3;
    constexpr double RAPID_FIRE_THRESHOLD       = 0.7;    // chance to shoot again
    constexpr double HULL_EXPLOSION_THRESHOLD   = 0.7;    // % of hull below which ships can explode
    constexpr double HULL_EXPLOSION_PROBABILITY = 0.01;   // per % below threshold

    // ─────────────────────────────────────────────────────────────────────────
    // Score Calculation
    // ─────────────────────────────────────────────────────────────────────────
    constexpr double POINTS_PER_RESOURCE_UNIT   = 1.0 / 1000.0; // 1 point per 1000 resources spent
    constexpr int64  NOOB_PROTECTION_RATIO       = 5;            // can't attack if score ratio > 5x
}
