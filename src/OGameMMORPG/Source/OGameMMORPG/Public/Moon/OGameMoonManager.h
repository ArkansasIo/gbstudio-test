// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameMoonManager.h - Moon creation, Sensor Phalanx scanning, and Jump Gate teleportation.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameMoonManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnMoonCreated, const FString&, OwnerPlayerId, const FMoonInfo&, Moon);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnMoonDestroyed, const FString&, OwnerPlayerId, const FCoordinates&, Location);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameMoonManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameMoonManager();

    UPROPERTY(BlueprintAssignable, Category = "OGame|Moon|Events")
    FOnMoonCreated OnMoonCreated;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Moon|Events")
    FOnMoonDestroyed OnMoonDestroyed;

    // ── Moon Creation ─────────────────────────────────────────────────────────

    /**
     * Roll for moon creation after combat. OGame formula:
     *   chance = min(20, round(destroyed_ships_metal_value / 100000)) %
     * Returns true if moon is created.
     */
    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool TryCreateMoon(const FString& OwnerPlayerId, const FCoordinates& PlanetCoords,
                        const FResources& DestroyedShipValue, FMoonInfo& OutMoon);

    /** Directly create a moon (admin/game-master tool). */
    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    FString CreateMoonDirect(const FString& OwnerPlayerId, const FCoordinates& PlanetCoords,
                              int32 Diameter = 8000);

    // ── Sensor Phalanx ────────────────────────────────────────────────────────

    /**
     * Use Sensor Phalanx to scan fleets in a solar system.
     * Scan range = PhalanxLevel^2 systems.
     * Each scan costs 5000 deuterium.
     */
    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool UseSensorPhalanx(const FString& ScannerPlayerId, const FString& MoonId,
                           const FCoordinates& TargetSystem, double& OutDeuteriumCost,
                           TArray<FString>& OutDetectedFleetIds);

    /** Get effective scan range for a Phalanx level. */
    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    static int32 GetPhalanxRange(int32 PhalanxLevel);

    // ── Jump Gate ─────────────────────────────────────────────────────────────

    /**
     * Teleport fleet instantly from one moon to another.
     * Both moons must have Jump Gates. 1-hour cooldown per gate.
     * Costs deuterium based on ship count.
     */
    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool UseJumpGate(const FString& SourceMoonId, const FString& TargetMoonId,
                      const FString& PlayerId,
                      const FFleetComposition& Fleet,
                      double& OutDeuteriumCost);

    /** Calculate Jump Gate deuterium cost for a fleet. */
    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    static double CalculateJumpGateCost(const FFleetComposition& Fleet);

    // ── Moon Management ───────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    bool GetMoon(const FString& MoonId, FMoonInfo& OutMoon) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    bool GetMoonAtCoords(const FCoordinates& Coords, FMoonInfo& OutMoon) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    TArray<FMoonInfo> GetMoonsByPlayer(const FString& PlayerId) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool UpgradeLunarBase(const FString& MoonId, const FString& PlayerId,
                           FResources& Resources);

    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool UpgradeSensorPhalanx(const FString& MoonId, const FString& PlayerId,
                               FResources& Resources);

    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool UpgradeJumpGate(const FString& MoonId, const FString& PlayerId,
                          FResources& Resources);

    /** Attempt to destroy a moon with a Death Star. Returns success probability (0-20%). */
    UFUNCTION(BlueprintCallable, Category = "OGame|Moon")
    bool TryDestroyMoon(const FString& MoonId, int32 DeathStarCount,
                         float& OutDestructionChance, float& OutFleetLossChance);

    UFUNCTION(BlueprintPure, Category = "OGame|Moon")
    FString GetMoonInfoText(const FString& MoonId) const;

private:
    UPROPERTY()
    TArray<FMoonInfo> Moons;

    int32 CalculateMoonDiameter(double ChancePercent) const;
    int32 CalculateMoonFields(int32 Diameter) const;
    FResources GetLunarBaseCost(int32 CurrentLevel) const;
    FResources GetPhalanxCost(int32 CurrentLevel) const;
    FResources GetJumpGateCost(int32 CurrentLevel) const;
};
