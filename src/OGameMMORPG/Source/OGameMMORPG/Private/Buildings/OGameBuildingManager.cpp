// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Buildings/OGameBuildingManager.h"
#include "Math/UnrealMathUtility.h"

FResources UOGameBuildingManager::GetBuildingCost(EBuildingType Type, int32 CurrentLevel)
{
    OGameConstants::FBuildingBaseCost Base = OGameConstants::GetBuildingBaseCost(Type);
    double Factor = FMath::Pow(Base.CostFactor, CurrentLevel);
    return FResources(FMath::FloorToDouble(Base.Metal     * Factor),
                      FMath::FloorToDouble(Base.Crystal   * Factor),
                      FMath::FloorToDouble(Base.Deuterium * Factor));
}

FTimespan UOGameBuildingManager::GetBuildingDuration(EBuildingType Type, int32 CurrentLevel,
                                                       int32 RoboticsLevel, int32 NaniteLevel,
                                                       float EconomySpeed)
{
    FResources Cost = GetBuildingCost(Type, CurrentLevel);
    double TotalCost = Cost.Metal + Cost.Crystal;

    // OGame formula: hours = (Metal + Crystal) / (2500 * (1+Robotics) * 2^Nanite * EcoSpeed)
    double Divisor = 2500.0 * (1.0 + RoboticsLevel) *
                     FMath::Pow(2.0, NaniteLevel) *
                     FMath::Max(0.1f, EconomySpeed);
    double Hours = TotalCost / Divisor;

    return FTimespan::FromSeconds(FMath::Max(1.0, Hours * 3600.0));
}

float UOGameBuildingManager::GetEnergyDelta(EBuildingType Type, int32 Level)
{
    if (Level <= 0) return 0.0f;

    switch (Type)
    {
        case EBuildingType::SolarPowerPlant:
            return 20.0f * Level * FMath::Pow(1.1f, Level);

        case EBuildingType::FusionReactor:
            return 30.0f * Level * FMath::Pow(1.05f, Level);

        case EBuildingType::MetalMine:
            return -(10.0f * Level * FMath::Pow(1.1f, Level));

        case EBuildingType::CrystalMine:
            return -(10.0f * Level * FMath::Pow(1.1f, Level));

        case EBuildingType::DeuteriumSynthesizer:
            return -(20.0f * Level * FMath::Pow(1.1f, Level));

        default:
            return 0.0f;
    }
}

FResources UOGameBuildingManager::GetHourlyProduction(EBuildingType Type, int32 Level,
                                                        float EnergyFactor, int32 MaxTemperature)
{
    if (Level <= 0) return FResources();

    FResources Prod;
    switch (Type)
    {
        case EBuildingType::MetalMine:
            Prod.Metal = 30.0 * Level * FMath::Pow(1.1, Level) * EnergyFactor
                        + OGameConstants::BASE_METAL_PRODUCTION;
            break;

        case EBuildingType::CrystalMine:
            Prod.Crystal = 20.0 * Level * FMath::Pow(1.1, Level) * EnergyFactor
                          + OGameConstants::BASE_CRYSTAL_PRODUCTION;
            break;

        case EBuildingType::DeuteriumSynthesizer:
            Prod.Deuterium = FMath::Max(0.0,
                10.0 * Level * FMath::Pow(1.1, Level) * EnergyFactor *
                (-0.004 * MaxTemperature + 1.36));
            break;

        default:
            break;
    }

    return Prod;
}

FString UOGameBuildingManager::GetBuildingName(EBuildingType Type)
{
    switch (Type)
    {
        case EBuildingType::MetalMine:              return TEXT("Metal Mine");
        case EBuildingType::CrystalMine:            return TEXT("Crystal Mine");
        case EBuildingType::DeuteriumSynthesizer:   return TEXT("Deuterium Synthesizer");
        case EBuildingType::SolarPowerPlant:        return TEXT("Solar Power Plant");
        case EBuildingType::FusionReactor:          return TEXT("Fusion Reactor");
        case EBuildingType::MetalStorage:           return TEXT("Metal Storage");
        case EBuildingType::CrystalStorage:         return TEXT("Crystal Storage");
        case EBuildingType::DeuteriumTank:          return TEXT("Deuterium Tank");
        case EBuildingType::RoboticsFactory:        return TEXT("Robotics Factory");
        case EBuildingType::Shipyard:               return TEXT("Shipyard");
        case EBuildingType::ResearchLab:            return TEXT("Research Lab");
        case EBuildingType::AllianceDepot:          return TEXT("Alliance Depot");
        case EBuildingType::MissileSilo:            return TEXT("Missile Silo");
        case EBuildingType::NaniteFactory:          return TEXT("Nanite Factory");
        case EBuildingType::Terraformer:            return TEXT("Terraformer");
        case EBuildingType::SpaceDock:              return TEXT("Space Dock");
        case EBuildingType::LunarBase:              return TEXT("Lunar Base");
        case EBuildingType::SensorPhalanx:          return TEXT("Sensor Phalanx");
        case EBuildingType::JumpGate:               return TEXT("Jump Gate");
        default:                                    return TEXT("Unknown Building");
    }
}

FString UOGameBuildingManager::GetBuildingDescription(EBuildingType Type)
{
    switch (Type)
    {
        case EBuildingType::MetalMine:
            return TEXT("Extracts metal from the planet's crust. Each level increases metal production.");
        case EBuildingType::CrystalMine:
            return TEXT("Mines crystal deposits. Each level increases crystal production.");
        case EBuildingType::DeuteriumSynthesizer:
            return TEXT("Synthesizes deuterium from oceans. Production depends on planet temperature.");
        case EBuildingType::SolarPowerPlant:
            return TEXT("Harnesses solar energy to power buildings and mines.");
        case EBuildingType::FusionReactor:
            return TEXT("Fuses deuterium to generate large amounts of energy.");
        case EBuildingType::MetalStorage:
            return TEXT("Increases metal storage capacity. Only 10% of stored resources can be looted.");
        case EBuildingType::CrystalStorage:
            return TEXT("Increases crystal storage capacity.");
        case EBuildingType::DeuteriumTank:
            return TEXT("Increases deuterium storage capacity.");
        case EBuildingType::RoboticsFactory:
            return TEXT("Speeds up building construction times on this planet.");
        case EBuildingType::Shipyard:
            return TEXT("Allows construction of ships and defense units on this planet.");
        case EBuildingType::ResearchLab:
            return TEXT("Enables and accelerates all research on this planet.");
        case EBuildingType::AllianceDepot:
            return TEXT("Allows supply of allied fleets with deuterium during ACS operations.");
        case EBuildingType::MissileSilo:
            return TEXT("Stores Anti-Ballistic and Interplanetary Missiles.");
        case EBuildingType::NaniteFactory:
            return TEXT("Dramatically speeds up all construction using nanotechnology.");
        case EBuildingType::Terraformer:
            return TEXT("Expands the number of building fields by 5 per level.");
        case EBuildingType::SpaceDock:
            return TEXT("Enables rapid repair of damaged ships in orbit.");
        case EBuildingType::LunarBase:
            return TEXT("Moon only. Enables construction of Sensor Phalanx and Jump Gate.");
        case EBuildingType::SensorPhalanx:
            return TEXT("Moon only. Allows scanning of nearby solar systems for fleet movements.");
        case EBuildingType::JumpGate:
            return TEXT("Moon only. Teleports fleets between moons instantly (24h cooldown).");
        default:
            return TEXT("No description available.");
    }
}

int32 UOGameBuildingManager::GetFieldsRequired(EBuildingType Type, int32 Level)
{
    if (Type == EBuildingType::Terraformer)
    {
        return 0; // Terraformer adds fields, doesn't consume them
    }
    return 1;
}
