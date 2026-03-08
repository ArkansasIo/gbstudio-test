// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameTextUIManager.h - Text-based interface renderer for the OGame MMORPG.
//                        Generates formatted ASCII/rich-text screens for all game views.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameTextUIManager.generated.h"

class UOGamePlanet;
class AOGamePlayerState;
class UOGameSolarSystem;

UENUM(BlueprintType)
enum class EGameScreen : uint8
{
    Overview        UMETA(DisplayName = "Overview"),
    Resources       UMETA(DisplayName = "Resources"),
    Buildings       UMETA(DisplayName = "Buildings"),
    Research        UMETA(DisplayName = "Research"),
    Shipyard        UMETA(DisplayName = "Shipyard"),
    Defense         UMETA(DisplayName = "Defense"),
    Fleet           UMETA(DisplayName = "Fleet"),
    Galaxy          UMETA(DisplayName = "Galaxy"),
    Messages        UMETA(DisplayName = "Messages"),
    Alliance        UMETA(DisplayName = "Alliance"),
    HighScore       UMETA(DisplayName = "High Score"),
    Combat          UMETA(DisplayName = "Combat Report"),
    Espionage       UMETA(DisplayName = "Espionage Report"),
};

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameTextUIManager : public UObject
{
    GENERATED_BODY()

public:
    // ── Screen Renderers ──────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderOverview(UOGamePlanet* Planet, AOGamePlayerState* Player) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderResources(UOGamePlanet* Planet) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderBuildings(UOGamePlanet* Planet) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderResearch(AOGamePlayerState* Player) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderShipyard(UOGamePlanet* Planet) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderDefense(UOGamePlanet* Planet) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderFleet(UOGamePlanet* Planet) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderGalaxy(UOGameSolarSystem* System, int32 GalaxyIndex, int32 SystemIndex) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderMessages(AOGamePlayerState* Player) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderHighScore(const TArray<AOGamePlayerState*>& Players) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderCombatReport(const FCombatReport& Report) const;

    // ── Navigation ────────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderNavigationBar(EGameScreen CurrentScreen) const;

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    FString RenderPlanetSelector(const TArray<FString>& PlanetNames, int32 SelectedIndex) const;

    // ── Utility ───────────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    static FString FormatNumber(double Value);

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    static FString FormatTimespan(FTimespan Span);

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    static FString FormatResources(const FResources& Res);

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    static FString MakeDivider(int32 Width = 60, TCHAR Char = TEXT('-'));

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    static FString MakeHeader(const FString& Title, int32 Width = 60);
};
