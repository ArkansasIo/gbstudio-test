// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameGameMode.h - Server-authoritative game mode for the OGame MMORPG.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/GameModeBase.h"
#include "Core/OGameTypes.h"
#include "OGameGameMode.generated.h"

class AOGamePlayerState;
class UOGamePlanet;

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API AOGameGameMode : public AGameModeBase
{
    GENERATED_BODY()

public:
    AOGameGameMode();

    // ── UGameModeBase Interface ───────────────────────────────────────────────
    virtual void InitGame(const FString& MapName, const FString& Options, FString& ErrorMessage) override;
    virtual APlayerController* Login(UPlayer* NewPlayer, ENetRole InRemoteRole,
                                     const FString& Portal, const FString& Options,
                                     const FUniqueNetIdRepl& UniqueId, FString& ErrorMessage) override;
    virtual void PostLogin(APlayerController* NewPlayer) override;
    virtual void Logout(AController* Exiting) override;

    // ── Player Registration ───────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|GameMode")
    bool RegisterNewPlayer(const FString& PlayerId, const FString& DisplayName,
                           AOGamePlayerState* PlayerState);

    UFUNCTION(BlueprintCallable, Category = "OGame|GameMode")
    void AssignHomePlanet(AOGamePlayerState* PlayerState);

    // ── Game Settings ─────────────────────────────────────────────────────────
    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Game Settings")
    bool bAllowNewRegistrations = true;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Game Settings")
    int32 MaxPlayersPerUniverse = 10000;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Game Settings")
    int32 BeginnerProtectionDays = 7;

    UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = "Game Settings")
    bool bDestructibleMoons = true;

    // ── Server Status ─────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|GameMode")
    int32 GetOnlinePlayerCount() const { return OnlinePlayers.Num(); }

    UFUNCTION(BlueprintPure, Category = "OGame|GameMode")
    int32 GetRegisteredPlayerCount() const { return RegisteredPlayerCount; }

protected:
    UPROPERTY()
    TArray<APlayerController*> OnlinePlayers;

    int32 RegisteredPlayerCount = 0;

private:
    void LogServerEvent(const FString& Event) const;
};
