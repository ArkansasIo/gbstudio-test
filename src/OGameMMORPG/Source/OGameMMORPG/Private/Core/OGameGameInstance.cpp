// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Core/OGameGameInstance.h"
#include "Universe/OGameUniverseManager.h"
#include "Multiplayer/OGamePlayerManager.h"
#include "Alliance/OGameAllianceManager.h"
#include "UI/OGameTextUIManager.h"
#include "Engine/Engine.h"
#include "TimerManager.h"

UOGameGameInstance::UOGameGameInstance()
{
}

void UOGameGameInstance::Init()
{
    Super::Init();

    // Create subsystem managers
    UniverseManager = NewObject<UOGameUniverseManager>(this);
    PlayerManager   = NewObject<UOGamePlayerManager>(this);
    AllianceManager = NewObject<UOGameAllianceManager>(this);
    TextUIManager   = NewObject<UOGameTextUIManager>(this);

    if (UniverseManager)
    {
        UniverseManager->InitializeUniverse(MaxGalaxies, MaxSystems);
    }

    UE_LOG(LogTemp, Log, TEXT("OGame Universe '%s' initialized. Galaxies=%d, Systems=%d"),
           *UniverseName, MaxGalaxies, MaxSystems);

    // Set up recurring server ticks
    if (UWorld* World = GetWorld())
    {
        World->GetTimerManager().SetTimer(
            ProductionTickHandle,
            this,
            &UOGameGameInstance::TickProductionCycle,
            PRODUCTION_TICK_INTERVAL,
            /*bLoop=*/ true);

        World->GetTimerManager().SetTimer(
            FleetTickHandle,
            this,
            &UOGameGameInstance::TickFleetMovements,
            FLEET_TICK_INTERVAL,
            /*bLoop=*/ true);
    }
}

void UOGameGameInstance::Shutdown()
{
    if (UWorld* World = GetWorld())
    {
        World->GetTimerManager().ClearTimer(ProductionTickHandle);
        World->GetTimerManager().ClearTimer(FleetTickHandle);
    }

    Super::Shutdown();
}

void UOGameGameInstance::TickProductionCycle()
{
    if (UniverseManager)
    {
        UniverseManager->TickAllPlanetsProduction();
    }
    TickBuildingQueue();
    TickResearchQueue();
}

void UOGameGameInstance::TickFleetMovements()
{
    if (UniverseManager)
    {
        UniverseManager->TickAllFleets();
    }
}

void UOGameGameInstance::TickResearchQueue()
{
    if (PlayerManager)
    {
        PlayerManager->TickAllResearchQueues();
    }
}

void UOGameGameInstance::TickBuildingQueue()
{
    if (UniverseManager)
    {
        UniverseManager->TickAllBuildingQueues();
    }
}

void UOGameGameInstance::ProcessPendingCombats()
{
    if (UniverseManager)
    {
        UniverseManager->ProcessPendingCombats();
    }
}

FDateTime UOGameGameInstance::GetServerTime() const
{
    return FDateTime::UtcNow();
}
