// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameFleet.h - A fleet in transit between two coordinates.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameFleet.generated.h"

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameFleet : public UObject
{
    GENERATED_BODY()

public:
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FString FleetId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FString OwnerPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FFleetComposition Ships;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FResources CargoLoad;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FCoordinates Origin;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FCoordinates Destination;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    EFleetMission Mission = EFleetMission::Attack;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FDateTime DepartureTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    FDateTime ArrivalTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    bool bIsReturning = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    bool bIsRecalled = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    double FuelConsumed = 0.0;

    // ── API ───────────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    bool HasArrived() const;

    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    float GetProgressPercent() const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Fleet")
    void Recall();

    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    FString GetFleetStatusText() const;

    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    FTimespan GetTimeRemaining() const;

    // Speed calculation
    static double CalculateFleetSpeed(const FFleetComposition& Ships,
                                       const TMap<EResearchType, int32>& Research,
                                       float UniverseSpeedMultiplier = 1.0f);

    static FTimespan CalculateTravelTime(const FCoordinates& From, const FCoordinates& To,
                                          double FleetSpeed);

    static double CalculateFuelCost(const FFleetComposition& Ships,
                                     const FCoordinates& From, const FCoordinates& To,
                                     double FleetSpeed);
};
