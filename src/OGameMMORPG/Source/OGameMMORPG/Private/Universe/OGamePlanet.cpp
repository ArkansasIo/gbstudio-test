// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Universe/OGamePlanet.h"
#include "Math/UnrealMathUtility.h"

UOGamePlanet::UOGamePlanet()
{
    // Seed all building levels at 0
    for (uint8 i = 0; i <= static_cast<uint8>(EBuildingType::JumpGate); ++i)
    {
        BuildingLevels.Add(static_cast<EBuildingType>(i), 0);
    }

    // Default storage caps
    StorageCapacity = FResources(10000.0, 10000.0, 10000.0, 0.0);
}

// ── Buildings ────────────────────────────────────────────────────────────────

int32 UOGamePlanet::GetBuildingLevel(EBuildingType Type) const
{
    const int32* Level = BuildingLevels.Find(Type);
    return Level ? *Level : 0;
}

bool UOGamePlanet::StartBuilding(EBuildingType Type, const FResources& Cost, FTimespan Duration)
{
    if (bBuildingInProgress)
    {
        return false;
    }
    if (!SpendResources(Cost))
    {
        return false;
    }

    bBuildingInProgress = true;
    CurrentBuilding     = Type;
    BuildingFinishTime  = FDateTime::UtcNow() + Duration;
    return true;
}

bool UOGamePlanet::IsBuildingComplete() const
{
    return bBuildingInProgress && FDateTime::UtcNow() >= BuildingFinishTime;
}

void UOGamePlanet::CompleteBuilding()
{
    if (!bBuildingInProgress)
    {
        return;
    }

    int32& Level = BuildingLevels.FindOrAdd(CurrentBuilding);
    ++Level;
    ++UsedFields;
    bBuildingInProgress = false;

    RecalculateStorageCapacity();
    OnBuildingCompleted.Broadcast(CurrentBuilding, Level);

    UE_LOG(LogTemp, Log, TEXT("Planet %s: Building %d completed -> level %d"),
           *PlanetName, static_cast<int32>(CurrentBuilding), Level);
}

// ── Resource Production ──────────────────────────────────────────────────────

double UOGamePlanet::CalculateMineProduction(EBuildingType MineType, int32 Level, float EnergyFactor) const
{
    if (Level <= 0)
    {
        return 0.0;
    }

    // OGame formula: 30 * Level * 1.1^Level (for Metal Mine)
    // Crystal: 20 * Level * 1.1^Level
    // Deuterium: 10 * Level * 1.1^Level * (-0.004 * MaxTemp + 1.36)
    double BaseProd = 0.0;
    switch (MineType)
    {
        case EBuildingType::MetalMine:
            BaseProd = OGameConstants::MINE_BASE_FACTOR * Level *
                       FMath::Pow(OGameConstants::MINE_LEVEL_EXPONENT, Level);
            break;
        case EBuildingType::CrystalMine:
            BaseProd = 20.0 * Level * FMath::Pow(1.1, Level);
            break;
        case EBuildingType::DeuteriumSynthesizer:
            BaseProd = 10.0 * Level * FMath::Pow(1.1, Level) *
                       (-0.004 * MaxTemperature + 1.36);
            BaseProd = FMath::Max(0.0, BaseProd);
            break;
        default:
            break;
    }

    return BaseProd * FMath::Clamp(EnergyFactor, 0.0f, 1.0f);
}

float UOGamePlanet::CalculateEnergyProduction() const
{
    int32 SolarLevel   = GetBuildingLevel(EBuildingType::SolarPowerPlant);
    int32 FusionLevel  = GetBuildingLevel(EBuildingType::FusionReactor);

    float SolarEnergy  = SolarLevel  > 0 ? 20.0f * SolarLevel  * FMath::Pow(1.1f, SolarLevel)  : 0.0f;
    float FusionEnergy = FusionLevel > 0 ? 30.0f * FusionLevel * FMath::Pow(1.05f, FusionLevel) : 0.0f;

    // Count solar satellites in stationed fleet
    const int64* SatCount = StationedFleet.Ships.Find(EShipType::SolarSatelliteShip);
    float SatEnergy = SatCount ? static_cast<float>(*SatCount) * FMath::Max(0.0f, MaxTemperature / 4.0f + 20.0f) : 0.0f;

    return SolarEnergy + FusionEnergy + SatEnergy;
}

float UOGamePlanet::CalculateEnergyConsumption() const
{
    int32 MetalLevel  = GetBuildingLevel(EBuildingType::MetalMine);
    int32 CrystalLevel = GetBuildingLevel(EBuildingType::CrystalMine);
    int32 DeutLevel   = GetBuildingLevel(EBuildingType::DeuteriumSynthesizer);
    int32 FusionLevel = GetBuildingLevel(EBuildingType::FusionReactor);

    float Cons = 0.0f;
    if (MetalLevel  > 0) Cons += 10.0f * MetalLevel   * FMath::Pow(1.1f, MetalLevel);
    if (CrystalLevel > 0) Cons += 10.0f * CrystalLevel * FMath::Pow(1.1f, CrystalLevel);
    if (DeutLevel   > 0) Cons += 20.0f * DeutLevel    * FMath::Pow(1.1f, DeutLevel);
    if (FusionLevel > 0) Cons += 10.0f * FusionLevel  * FMath::Pow(1.1f, FusionLevel);

    return Cons;
}

FResources UOGamePlanet::CalculateHourlyProduction(const TMap<EResearchType, int32>& PlayerResearch) const
{
    float EnergyProduced  = CalculateEnergyProduction();
    float EnergyConsumed  = CalculateEnergyConsumption();
    float EnergyFactor    = EnergyConsumed > 0.0f
                                ? FMath::Min(1.0f, EnergyProduced / EnergyConsumed)
                                : 1.0f;

    FResources Hourly;
    Hourly.Metal      = CalculateMineProduction(EBuildingType::MetalMine,
                             GetBuildingLevel(EBuildingType::MetalMine), EnergyFactor);
    Hourly.Crystal    = CalculateMineProduction(EBuildingType::CrystalMine,
                             GetBuildingLevel(EBuildingType::CrystalMine), EnergyFactor);
    Hourly.Deuterium  = CalculateMineProduction(EBuildingType::DeuteriumSynthesizer,
                             GetBuildingLevel(EBuildingType::DeuteriumSynthesizer), EnergyFactor);
    Hourly.Energy     = EnergyProduced - EnergyConsumed;

    // Base production (always running)
    Hourly.Metal     += OGameConstants::BASE_METAL_PRODUCTION;
    Hourly.Crystal   += OGameConstants::BASE_CRYSTAL_PRODUCTION;

    return Hourly;
}

void UOGamePlanet::ProduceResources(float Hours, const TMap<EResearchType, int32>& PlayerResearch)
{
    FResources Hourly = CalculateHourlyProduction(PlayerResearch);
    FResources Produced = Hourly * static_cast<double>(Hours);

    // Cap at storage
    StoredResources.Metal     = FMath::Min(StoredResources.Metal     + Produced.Metal,     StorageCapacity.Metal);
    StoredResources.Crystal   = FMath::Min(StoredResources.Crystal   + Produced.Crystal,   StorageCapacity.Crystal);
    StoredResources.Deuterium = FMath::Min(StoredResources.Deuterium + Produced.Deuterium, StorageCapacity.Deuterium);
    EnergyBalance             = static_cast<float>(Hourly.Energy);
}

bool UOGamePlanet::SpendResources(const FResources& Cost)
{
    if (!StoredResources.HasEnough(Cost))
    {
        return false;
    }
    StoredResources = StoredResources - Cost;
    return true;
}

void UOGamePlanet::AddResources(const FResources& Amount)
{
    StoredResources.Metal     = FMath::Min(StoredResources.Metal     + Amount.Metal,     StorageCapacity.Metal);
    StoredResources.Crystal   = FMath::Min(StoredResources.Crystal   + Amount.Crystal,   StorageCapacity.Crystal);
    StoredResources.Deuterium = FMath::Min(StoredResources.Deuterium + Amount.Deuterium, StorageCapacity.Deuterium);
}

void UOGamePlanet::RecalculateStorageCapacity()
{
    auto CalcStorage = [](int32 Level) -> double
    {
        return 5000.0 * FMath::Pow(2.0, Level);
    };

    StorageCapacity.Metal     = CalcStorage(GetBuildingLevel(EBuildingType::MetalStorage));
    StorageCapacity.Crystal   = CalcStorage(GetBuildingLevel(EBuildingType::CrystalStorage));
    StorageCapacity.Deuterium = CalcStorage(GetBuildingLevel(EBuildingType::DeuteriumTank));

    if (StorageCapacity.Metal     < 10000.0) StorageCapacity.Metal     = 10000.0;
    if (StorageCapacity.Crystal   < 10000.0) StorageCapacity.Crystal   = 10000.0;
    if (StorageCapacity.Deuterium < 10000.0) StorageCapacity.Deuterium = 10000.0;
}

// ── Fleet ────────────────────────────────────────────────────────────────────

bool UOGamePlanet::SendFleet(const FFleetComposition& Fleet, const FResources& CargoLoad)
{
    // Validate fleet is available
    for (const auto& Pair : Fleet.Ships)
    {
        const int64* Available = StationedFleet.Ships.Find(Pair.Key);
        if (!Available || *Available < Pair.Value)
        {
            return false;
        }
    }

    if (!SpendResources(CargoLoad))
    {
        return false;
    }

    // Deduct fleet from station
    for (const auto& Pair : Fleet.Ships)
    {
        int64& Available = StationedFleet.Ships.FindOrAdd(Pair.Key);
        Available -= Pair.Value;
        if (Available <= 0)
        {
            StationedFleet.Ships.Remove(Pair.Key);
        }
    }

    OnFleetDeparted.Broadcast(Fleet);
    return true;
}

void UOGamePlanet::ReceiveFleet(const FFleetComposition& Fleet, const FResources& Cargo)
{
    for (const auto& Pair : Fleet.Ships)
    {
        int64& Count = StationedFleet.Ships.FindOrAdd(Pair.Key);
        Count += Pair.Value;
    }
    AddResources(Cargo);
}

// ── Shipyard ─────────────────────────────────────────────────────────────────

bool UOGamePlanet::QueueShipBuild(EShipType Type, int64 Count)
{
    if (GetBuildingLevel(EBuildingType::Shipyard) == 0)
    {
        return false;
    }

    FShipCount Entry;
    Entry.Type  = Type;
    Entry.Count = Count;
    ShipyardQueue.Add(Entry);
    return true;
}

void UOGamePlanet::CompleteShipyardBatch()
{
    if (ShipyardQueue.IsEmpty())
    {
        return;
    }

    FShipCount& Batch = ShipyardQueue[0];
    int64& Count = StationedFleet.Ships.FindOrAdd(Batch.Type);
    Count += Batch.Count;
    ShipyardQueue.RemoveAt(0);

    UE_LOG(LogTemp, Log, TEXT("Planet %s: Built %lld x ship type %d"),
           *PlanetName, Batch.Count, static_cast<int32>(Batch.Type));
}

// ── Defense ──────────────────────────────────────────────────────────────────

bool UOGamePlanet::BuildDefense(EDefenseType Type, int64 Count, const FResources& Cost)
{
    if (!SpendResources(Cost))
    {
        return false;
    }
    int64& Existing = DefenseUnits.FindOrAdd(Type);
    Existing += Count;
    return true;
}

int64 UOGamePlanet::GetDefenseCount(EDefenseType Type) const
{
    const int64* Count = DefenseUnits.Find(Type);
    return Count ? *Count : 0;
}

// ── Text Summary ─────────────────────────────────────────────────────────────

FString UOGamePlanet::GetPlanetSummaryText() const
{
    FString Summary;
    Summary += FString::Printf(TEXT("=== %s %s ===\n"), *PlanetName, *Coordinates.ToString());
    Summary += FString::Printf(TEXT("Fields: %d / %d  |  Temp: %d°C to %d°C\n"),
                               UsedFields, MaxFields, MinTemperature, MaxTemperature);
    Summary += FString::Printf(TEXT("Metal:     %.0f / %.0f\n"), StoredResources.Metal,     StorageCapacity.Metal);
    Summary += FString::Printf(TEXT("Crystal:   %.0f / %.0f\n"), StoredResources.Crystal,   StorageCapacity.Crystal);
    Summary += FString::Printf(TEXT("Deuterium: %.0f / %.0f\n"), StoredResources.Deuterium, StorageCapacity.Deuterium);
    Summary += FString::Printf(TEXT("Energy:    %+.0f\n"), EnergyBalance);
    Summary += TEXT("--- Buildings ---\n");

    for (const auto& Pair : BuildingLevels)
    {
        if (Pair.Value > 0)
        {
            Summary += FString::Printf(TEXT("  Building[%d]: Level %d\n"),
                                       static_cast<int32>(Pair.Key), Pair.Value);
        }
    }

    Summary += TEXT("--- Fleet ---\n");
    for (const auto& Pair : StationedFleet.Ships)
    {
        if (Pair.Value > 0)
        {
            Summary += FString::Printf(TEXT("  Ship[%d]: %lld\n"),
                                       static_cast<int32>(Pair.Key), Pair.Value);
        }
    }

    return Summary;
}
