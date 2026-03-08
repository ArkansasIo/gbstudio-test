// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameSolarSystem.h - A solar system containing up to 15 planet slots.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameSolarSystem.generated.h"

class UOGamePlanet;

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameSolarSystem : public UObject
{
    GENERATED_BODY()

public:
    UOGameSolarSystem();

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Solar System")
    int32 GalaxyIndex = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Solar System")
    int32 SystemIndex = 1;

    // Positions 1-15; nullptr = uncolonised
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Solar System")
    TArray<UOGamePlanet*> Planets;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Solar System")
    FString StarName;

    // ── API ───────────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|SolarSystem")
    UOGamePlanet* GetPlanetAtPosition(int32 Position) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|SolarSystem")
    UOGamePlanet* CreatePlanetAtPosition(int32 Position, const FString& OwnerPlayerId,
                                          const FString& PlanetName);

    UFUNCTION(BlueprintPure, Category = "OGame|SolarSystem")
    bool IsPositionFree(int32 Position) const;

    UFUNCTION(BlueprintPure, Category = "OGame|SolarSystem")
    int32 GetFirstFreePosition() const;

    UFUNCTION(BlueprintPure, Category = "OGame|SolarSystem")
    FString GetSystemText() const;

    static constexpr int32 MAX_POSITIONS = 15;
};
