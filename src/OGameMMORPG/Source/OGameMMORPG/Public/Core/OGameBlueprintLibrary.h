// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameBlueprintLibrary.h - Blueprint callable function library exposing all OGame systems
//                            to Unreal Engine 5 visual scripting (Blueprint graphs).

#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "Core/OGameTypes.h"
#include "Core/OGameConstants.h"
#include "OGameBlueprintLibrary.generated.h"

class UOGamePlanet;
class AOGamePlayerState;
class UOGameUniverseManager;

// ─────────────────────────────────────────────────────────────────────────────
// OGame Blueprint Function Library
// All functions are static and callable from any Blueprint graph.
// ─────────────────────────────────────────────────────────────────────────────
UCLASS(BlueprintType)
class OGAMEMMORPG_API UOGameBlueprintLibrary : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    // ── Resource Helpers ──────────────────────────────────────────────────────

    /** Create a FResources struct from individual values. */
    UFUNCTION(BlueprintPure, Category = "OGame|Resources",
              meta = (DisplayName = "Make Resources"))
    static FResources MakeResources(double Metal, double Crystal, double Deuterium,
                                     double Energy = 0.0);

    /** Add two FResources together. */
    UFUNCTION(BlueprintPure, Category = "OGame|Resources",
              meta = (DisplayName = "Add Resources"))
    static FResources AddResources(const FResources& A, const FResources& B);

    /** Subtract resources. Result values may go negative. */
    UFUNCTION(BlueprintPure, Category = "OGame|Resources",
              meta = (DisplayName = "Subtract Resources"))
    static FResources SubtractResources(const FResources& A, const FResources& B);

    /** Returns true if A has at least as much as B in all categories. */
    UFUNCTION(BlueprintPure, Category = "OGame|Resources",
              meta = (DisplayName = "Resources Has Enough"))
    static bool ResourcesHasEnough(const FResources& Available, const FResources& Cost);

    /** Scale all resource values by a multiplier. */
    UFUNCTION(BlueprintPure, Category = "OGame|Resources",
              meta = (DisplayName = "Scale Resources"))
    static FResources ScaleResources(const FResources& Res, double Scalar);

    // ── Coordinate Helpers ────────────────────────────────────────────────────

    /** Create a coordinate from galaxy, system, and position. */
    UFUNCTION(BlueprintPure, Category = "OGame|Coordinates",
              meta = (DisplayName = "Make Coordinates"))
    static FCoordinates MakeCoordinates(int32 Galaxy, int32 System, int32 Position,
                                         EPlanetType Type = EPlanetType::Planet);

    /** Convert coordinates to display string [G:S:P]. */
    UFUNCTION(BlueprintPure, Category = "OGame|Coordinates",
              meta = (DisplayName = "Coordinates To String"))
    static FString CoordinatesToString(const FCoordinates& Coords);

    /** Check if two coordinates point to the same location. */
    UFUNCTION(BlueprintPure, Category = "OGame|Coordinates",
              meta = (DisplayName = "Coordinates Equal"))
    static bool CoordinatesEqual(const FCoordinates& A, const FCoordinates& B);

    // ── Building Queries ──────────────────────────────────────────────────────

    /** Get the cost of upgrading a building to the next level. */
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings",
              meta = (DisplayName = "Get Building Upgrade Cost"))
    static FResources GetBuildingUpgradeCost(EBuildingType Type, int32 CurrentLevel);

    /** Get the construction time for a building upgrade. */
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings",
              meta = (DisplayName = "Get Building Duration"))
    static FTimespan GetBuildingDuration(EBuildingType Type, int32 CurrentLevel,
                                          int32 RoboticsLevel, int32 NaniteLevel = 0,
                                          float EconomySpeed = 1.0f);

    /** Get building display name. */
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings",
              meta = (DisplayName = "Get Building Name"))
    static FString GetBuildingName(EBuildingType Type);

    /** Get building description. */
    UFUNCTION(BlueprintPure, Category = "OGame|Buildings",
              meta = (DisplayName = "Get Building Description"))
    static FString GetBuildingDescription(EBuildingType Type);

    // ── Research Queries ──────────────────────────────────────────────────────

    /** Get the cost of researching a technology to the next level. */
    UFUNCTION(BlueprintPure, Category = "OGame|Research",
              meta = (DisplayName = "Get Research Cost"))
    static FResources GetResearchCost(EResearchType Type, int32 CurrentLevel);

    /** Get the research time. */
    UFUNCTION(BlueprintPure, Category = "OGame|Research",
              meta = (DisplayName = "Get Research Duration"))
    static FTimespan GetResearchDuration(EResearchType Type, int32 CurrentLevel,
                                          int32 ResearchLabLevel, float SpeedMultiplier = 1.0f);

    /** Get research display name. */
    UFUNCTION(BlueprintPure, Category = "OGame|Research",
              meta = (DisplayName = "Get Research Name"))
    static FString GetResearchName(EResearchType Type);

    // ── Ship Queries ──────────────────────────────────────────────────────────

    /** Get ship base stats as separate output pins. */
    UFUNCTION(BlueprintPure, Category = "OGame|Ships",
              meta = (DisplayName = "Get Ship Stats"))
    static void GetShipStats(EShipType Type,
                              double& OutMetalCost, double& OutCrystalCost, double& OutDeuteriumCost,
                              double& OutHull, double& OutShield, double& OutAttack,
                              double& OutCargoCapacity, double& OutBaseSpeed);

    /** Calculate travel time between two coordinates. */
    UFUNCTION(BlueprintPure, Category = "OGame|Fleet",
              meta = (DisplayName = "Calculate Travel Time"))
    static FTimespan CalculateTravelTime(const FCoordinates& From, const FCoordinates& To,
                                          double FleetSpeed);

    // ── Combat Queries ────────────────────────────────────────────────────────

    /** Perform a quick combat simulation and return the outcome. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Combat",
              meta = (DisplayName = "Quick Battle Simulation"))
    static ECombatOutcome QuickBattleSim(const FFleetComposition& AttackerFleet,
                                          const FFleetComposition& DefenderFleet,
                                          const TMap<EDefenseType, int64>& DefenderDefense);

    // ── Score Helpers ─────────────────────────────────────────────────────────

    /** Convert a resource amount to score points. */
    UFUNCTION(BlueprintPure, Category = "OGame|Score",
              meta = (DisplayName = "Resources To Points"))
    static int64 ResourcesToPoints(const FResources& Res);

    // ── Formatting ────────────────────────────────────────────────────────────

    /** Format a large number with K/M/B/T suffixes. */
    UFUNCTION(BlueprintPure, Category = "OGame|Formatting",
              meta = (DisplayName = "Format Game Number"))
    static FString FormatGameNumber(double Value);

    /** Format a timespan as human-readable string. */
    UFUNCTION(BlueprintPure, Category = "OGame|Formatting",
              meta = (DisplayName = "Format Timespan"))
    static FString FormatGameTimespan(FTimespan Span);

    /** Format a FResources struct as text. */
    UFUNCTION(BlueprintPure, Category = "OGame|Formatting",
              meta = (DisplayName = "Format Resources"))
    static FString FormatResourcesText(const FResources& Res);

    // ── Planet Helpers ────────────────────────────────────────────────────────

    /** Get a planet summary text (for text-based UI). */
    UFUNCTION(BlueprintPure, Category = "OGame|Planet",
              meta = (DisplayName = "Get Planet Summary"))
    static FString GetPlanetSummary(UOGamePlanet* Planet);

    /** Calculate hourly production for a planet. */
    UFUNCTION(BlueprintPure, Category = "OGame|Planet",
              meta = (DisplayName = "Get Hourly Production"))
    static FResources GetHourlyProduction(UOGamePlanet* Planet);
};
