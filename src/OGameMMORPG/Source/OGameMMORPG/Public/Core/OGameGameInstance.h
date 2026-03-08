// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameGameInstance.h - Singleton game instance managing server state,
//                       universe configuration, and the tick loop.

#pragma once

#include "CoreMinimal.h"
#include "Engine/GameInstance.h"
#include "Core/OGameTypes.h"
#include "OGameGameInstance.generated.h"

class UOGameUniverseManager;
class UOGamePlayerManager;
class UOGameAllianceManager;
class UOGameMessageSystem;
class UOGameTextUIManager;

UCLASS(BlueprintType, Blueprintable, Config = Game)
class OGAMEMMORPG_API UOGameGameInstance : public UGameInstance
{
    GENERATED_BODY()

public:
    UOGameGameInstance();

    // ── UGameInstance Interface ──────────────────────────────────────────────
    virtual void Init() override;
    virtual void Shutdown() override;

    // ── Universe Configuration ───────────────────────────────────────────────
    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    int32 MaxGalaxies = 9;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    int32 MaxSystems = 499;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    float UniverseSpeed = 1.0f;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    float EconomySpeed = 1.0f;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    float FleetSpeed = 1.0f;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    float ResearchSpeed = 1.0f;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Universe Config", Config)
    FString UniverseName = TEXT("Andromeda");

    // ── Subsystem Accessors ──────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Universe")
    UOGameUniverseManager* GetUniverseManager() const { return UniverseManager; }

    UFUNCTION(BlueprintPure, Category = "OGame|Players")
    UOGamePlayerManager* GetPlayerManager() const { return PlayerManager; }

    UFUNCTION(BlueprintPure, Category = "OGame|Alliance")
    UOGameAllianceManager* GetAllianceManager() const { return AllianceManager; }

    UFUNCTION(BlueprintPure, Category = "OGame|Messages")
    UOGameMessageSystem* GetMessageSystem() const { return MessageSystem; }

    UFUNCTION(BlueprintPure, Category = "OGame|UI")
    UOGameTextUIManager* GetTextUIManager() const { return TextUIManager; }

    // ── Global Tick (server-side resource production loop) ───────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickProductionCycle();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickFleetMovements();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickResearchQueue();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void TickBuildingQueue();

    UFUNCTION(BlueprintCallable, Category = "OGame|Server")
    void ProcessPendingCombats();

    // ── Helpers ──────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame")
    FString GetUniverseName() const { return UniverseName; }

    UFUNCTION(BlueprintPure, Category = "OGame")
    FDateTime GetServerTime() const;

protected:
    UPROPERTY()
    UOGameUniverseManager* UniverseManager = nullptr;

    UPROPERTY()
    UOGamePlayerManager* PlayerManager = nullptr;

    UPROPERTY()
    UOGameAllianceManager* AllianceManager = nullptr;

    UPROPERTY()
    UOGameMessageSystem* MessageSystem = nullptr;

    UPROPERTY()
    UOGameTextUIManager* TextUIManager = nullptr;

private:
    FTimerHandle ProductionTickHandle;
    FTimerHandle FleetTickHandle;

    static constexpr float PRODUCTION_TICK_INTERVAL = 3600.0f; // every real-time hour
    static constexpr float FLEET_TICK_INTERVAL      = 1.0f;    // every second
};
