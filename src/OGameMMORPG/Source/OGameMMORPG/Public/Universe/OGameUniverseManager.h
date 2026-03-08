// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameUniverseManager.h - Top-level manager for all galaxies, systems, planets, and fleets.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameUniverseManager.generated.h"

class UOGameSolarSystem;
class UOGamePlanet;
class UOGameFleet;

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameUniverseManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameUniverseManager();

    // ── Initialisation ────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Universe")
    void InitializeUniverse(int32 NumGalaxies, int32 NumSystems);

    // ── Solar System Access ───────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    UOGameSolarSystem* GetSolarSystem(int32 Galaxy, int32 System) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    UOGamePlanet* GetPlanet(const FCoordinates& Coords) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    UOGamePlanet* GetPlanetById(const FString& PlanetId) const;

    // ── Colony Management ─────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Universe")
    FString FindAndAssignFreePlanet(const FString& PlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Universe")
    UOGamePlanet* ColonizePlanet(const FCoordinates& Coords, const FString& PlayerId,
                                  const FString& Name);

    // ── Fleet Management ──────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Fleet")
    FString LaunchFleet(const FString& OwnerPlayerId,
                        const FCoordinates& Origin,
                        const FCoordinates& Destination,
                        const FFleetComposition& Ships,
                        const FResources& Cargo,
                        EFleetMission Mission);

    UFUNCTION(BlueprintCallable, Category = "OGame|Fleet")
    bool RecallFleet(const FString& FleetId);

    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    TArray<UOGameFleet*> GetFleetsOwnedBy(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Fleet")
    TArray<UOGameFleet*> GetFleetsTargeting(const FCoordinates& Coords) const;

    // ── Server Ticks ─────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickAllPlanetsProduction();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickAllFleets();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickAllBuildingQueues();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void ProcessPendingCombats();

    // ── Galaxy Map ────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    FString GetGalaxyMapText(int32 Galaxy) const;

    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    int32 GetMaxGalaxies() const { return MaxGalaxies; }

    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    int32 GetMaxSystems() const { return MaxSystems; }

private:
    // galaxies[g][s] -> SolarSystem
    UPROPERTY()
    TMap<FString, UOGameSolarSystem*> SolarSystems; // key = "G_S"

    UPROPERTY()
    TArray<UOGameFleet*> ActiveFleets;

    UPROPERTY()
    TMap<FString, UOGamePlanet*> PlanetIndex; // key = PlanetId

    int32 MaxGalaxies = 9;
    int32 MaxSystems  = 499;

    FString MakeSystemKey(int32 Galaxy, int32 System) const
    {
        return FString::Printf(TEXT("%d_%d"), Galaxy, System);
    }

    UOGameSolarSystem* GetOrCreateSystem(int32 Galaxy, int32 System);
    void ArriveFleet(UOGameFleet* Fleet);
    void ResolveCombat(UOGamePlanet* DefenderPlanet, TArray<UOGameFleet*>& AttackingFleets);
};
