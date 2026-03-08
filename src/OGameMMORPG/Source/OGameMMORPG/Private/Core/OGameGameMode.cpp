// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Core/OGameGameMode.h"
#include "Core/OGamePlayerState.h"
#include "Core/OGameGameInstance.h"
#include "Universe/OGameUniverseManager.h"
#include "GameFramework/PlayerController.h"
#include "Engine/Engine.h"

AOGameGameMode::AOGameGameMode()
{
    // Use our custom PlayerState class
    PlayerStateClass = AOGamePlayerState::StaticClass();
}

void AOGameGameMode::InitGame(const FString& MapName, const FString& Options, FString& ErrorMessage)
{
    Super::InitGame(MapName, Options, ErrorMessage);
    LogServerEvent(FString::Printf(TEXT("OGame server started on map '%s'"), *MapName));
}

APlayerController* AOGameGameMode::Login(UPlayer* NewPlayer, ENetRole InRemoteRole,
                                          const FString& Portal, const FString& Options,
                                          const FUniqueNetIdRepl& UniqueId, FString& ErrorMessage)
{
    if (OnlinePlayers.Num() >= MaxPlayersPerUniverse)
    {
        ErrorMessage = TEXT("Universe is full.");
        return nullptr;
    }

    return Super::Login(NewPlayer, InRemoteRole, Portal, Options, UniqueId, ErrorMessage);
}

void AOGameGameMode::PostLogin(APlayerController* NewPlayer)
{
    Super::PostLogin(NewPlayer);

    OnlinePlayers.AddUnique(NewPlayer);
    LogServerEvent(FString::Printf(TEXT("Player connected. Online: %d"), OnlinePlayers.Num()));

    // If this is a brand-new player, assign them a home planet
    if (AOGamePlayerState* PS = NewPlayer->GetPlayerState<AOGamePlayerState>())
    {
        if (PS->HomePlanetId.IsEmpty())
        {
            AssignHomePlanet(PS);
        }
    }
}

void AOGameGameMode::Logout(AController* Exiting)
{
    if (APlayerController* PC = Cast<APlayerController>(Exiting))
    {
        OnlinePlayers.Remove(PC);
    }
    Super::Logout(Exiting);
    LogServerEvent(FString::Printf(TEXT("Player disconnected. Online: %d"), OnlinePlayers.Num()));
}

bool AOGameGameMode::RegisterNewPlayer(const FString& PlayerId, const FString& DisplayName,
                                        AOGamePlayerState* PlayerState)
{
    if (!bAllowNewRegistrations || !PlayerState)
    {
        return false;
    }

    PlayerState->PlayerUniqueId   = PlayerId;
    PlayerState->PlayerDisplayName = DisplayName;
    PlayerState->Status            = EPlayerStatus::Beginner;
    PlayerState->RegisterDate      = FDateTime::UtcNow();

    ++RegisteredPlayerCount;
    LogServerEvent(FString::Printf(TEXT("New player registered: %s"), *DisplayName));
    return true;
}

void AOGameGameMode::AssignHomePlanet(AOGamePlayerState* PlayerState)
{
    if (!PlayerState)
    {
        return;
    }

    UOGameGameInstance* GI = Cast<UOGameGameInstance>(GetGameInstance());
    if (!GI)
    {
        return;
    }

    UOGameUniverseManager* Universe = GI->GetUniverseManager();
    if (!Universe)
    {
        return;
    }

    FString PlanetId = Universe->FindAndAssignFreePlanet(PlayerState->PlayerUniqueId);
    if (!PlanetId.IsEmpty())
    {
        PlayerState->HomePlanetId = PlanetId;
        PlayerState->OwnedPlanetIds.AddUnique(PlanetId);
        LogServerEvent(FString::Printf(TEXT("Assigned home planet %s to %s"),
                                       *PlanetId, *PlayerState->PlayerDisplayName));
    }
}

void AOGameGameMode::LogServerEvent(const FString& Event) const
{
    UE_LOG(LogTemp, Log, TEXT("[OGame Server] %s"), *Event);
}
