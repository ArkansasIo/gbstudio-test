// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameBuildingManager.h - Calculates building costs, durations, and production values.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameConstants.h"
#include "OGameBuildingManager.generated.h"

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameBuildingManager : public UObject
{
    GENERATED_BODY()

public:
    // Cost to build next level (CurrentLevel -> CurrentLevel+1)
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static FResources GetBuildingCost(EBuildingType Type, int32 CurrentLevel);

    // Construction time
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static FTimespan GetBuildingDuration(EBuildingType Type, int32 CurrentLevel,
                                          int32 RoboticsLevel, int32 NaniteLevel = 0,
                                          float EconomySpeed = 1.0f);

    // Hourly energy production / consumption for a building level
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static float GetEnergyDelta(EBuildingType Type, int32 Level);

    // Hourly resource production
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static FResources GetHourlyProduction(EBuildingType Type, int32 Level,
                                           float EnergyFactor = 1.0f,
                                           int32 MaxTemperature = 20);

    // Returns building display name
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static FString GetBuildingName(EBuildingType Type);

    // Returns building description
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static FString GetBuildingDescription(EBuildingType Type);

    // Fields consumed when building this building (almost always 1, except Terraformer)
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings")
    static int32 GetFieldsRequired(EBuildingType Type, int32 Level);
};
