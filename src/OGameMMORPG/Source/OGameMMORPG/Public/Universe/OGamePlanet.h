// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGamePlanet.h - A colonised planet (or moon) in the OGame universe.
//                Holds buildings, fleet, defense, and resource data.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameConstants.h"
#include "OGamePlanet.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnBuildingCompleted, EBuildingType, Building, int32, NewLevel);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnFleetDeparted, const FFleetComposition&, Fleet);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGamePlanet : public UObject
{
    GENERATED_BODY()

public:
    UOGamePlanet();

    // ── Events ────────────────────────────────────────────────────────────────
    UPROPERTY(BlueprintAssignable, Category = "OGame|Events")
    FOnBuildingCompleted OnBuildingCompleted;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Events")
    FOnFleetDeparted OnFleetDeparted;

    // ── Identity ──────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    FString PlanetId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    FString PlanetName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    FString OwnerPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    FCoordinates Coordinates;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    EPlanetType PlanetType = EPlanetType::Planet;

    // ── Physical Properties ───────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    int32 Diameter = 12800;       // km

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    int32 MaxFields = 163;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    int32 UsedFields = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    int32 MinTemperature = -40;   // Celsius

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Planet")
    int32 MaxTemperature = 20;

    // ── Resources ─────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    FResources StoredResources;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    FResources StorageCapacity;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    float EnergyBalance = 0.0f;

    // ── Buildings ─────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Buildings")
    TMap<EBuildingType, int32> BuildingLevels;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Buildings")
    bool bBuildingInProgress = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Buildings")
    EBuildingType CurrentBuilding = EBuildingType::MetalMine;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Buildings")
    FDateTime BuildingFinishTime;

    // ── Fleet (stationed) ─────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FFleetComposition StationedFleet;

    // ── Defense ───────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Defense")
    TMap<EDefenseType, int64> DefenseUnits;

    // ── Shipyard Build Queue ───────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Shipyard")
    TArray<FShipCount> ShipyardQueue;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Shipyard")
    FDateTime ShipyardFinishTime;

    // ── Debris Field (orbiting) ───────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Debris")
    FResources DebrisField;

    // ── Moon reference ────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FString MoonId;

    // ── API ───────────────────────────────────────────────────────────────────

    // Buildings
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    int32 GetBuildingLevel(EBuildingType Type) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Buildings")
    bool StartBuilding(EBuildingType Type, const FResources& Cost, FTimespan Duration);

    UFUNCTION(BlueprintCallable, Category = "OGame|Buildings")
    bool IsBuildingComplete() const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Buildings")
    void CompleteBuilding();

    // Resources
    UFUNCTION(BlueprintPure, Category = "OGame|Resources")
    FResources CalculateHourlyProduction(const TMap<EResearchType, int32>& PlayerResearch) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Resources")
    void ProduceResources(float Hours, const TMap<EResearchType, int32>& PlayerResearch);

    UFUNCTION(BlueprintCallable, Category = "OGame|Resources")
    bool SpendResources(const FResources& Cost);

    UFUNCTION(BlueprintCallable, Category = "OGame|Resources")
    void AddResources(const FResources& Amount);

    // Fleet
    UFUNCTION(BlueprintCallable, Category = "OGame|Fleet")
    bool SendFleet(const FFleetComposition& Fleet, const FResources& CargoLoad);

    UFUNCTION(BlueprintCallable, Category = "OGame|Fleet")
    void ReceiveFleet(const FFleetComposition& Fleet, const FResources& Cargo);

    // Shipyard
    UFUNCTION(BlueprintCallable, Category = "OGame|Shipyard")
    bool QueueShipBuild(EShipType Type, int64 Count);

    UFUNCTION(BlueprintCallable, Category = "OGame|Shipyard")
    void CompleteShipyardBatch();

    // Defense
    UFUNCTION(BlueprintCallable, Category = "OGame|Defense")
    bool BuildDefense(EDefenseType Type, int64 Count, const FResources& Cost);

    UFUNCTION(BlueprintPure, Category = "OGame|Defense")
    int64 GetDefenseCount(EDefenseType Type) const;

    // Helpers
    UFUNCTION(BlueprintPure, Category = "OGame|Planet")
    FString GetPlanetSummaryText() const;

    UFUNCTION(BlueprintPure, Category = "OGame|Planet")
    int32 GetFreeFields() const { return FMath::Max(0, MaxFields - UsedFields); }

    UFUNCTION(BlueprintCallable, Category = "OGame|Planet")
    void RecalculateStorageCapacity();

private:
    double CalculateMineProduction(EBuildingType MineType, int32 Level, float EnergyFactor) const;
    float  CalculateEnergyProduction() const;
    float  CalculateEnergyConsumption() const;
};
