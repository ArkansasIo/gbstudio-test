// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGamePlayerState.h - Per-player persistent state: resources, research, score, messages.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/PlayerState.h"
#include "Core/OGameTypes.h"
#include "OGamePlayerState.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnResourcesChanged, const FResources&, NewResources);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnResearchCompleted, EResearchType, CompletedResearch);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnMessageReceived, const FGameMessage&, Message);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API AOGamePlayerState : public APlayerState
{
    GENERATED_BODY()

public:
    AOGamePlayerState();

    // ── Events ───────────────────────────────────────────────────────────────
    UPROPERTY(BlueprintAssignable, Category = "OGame|Events")
    FOnResourcesChanged OnResourcesChanged;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Events")
    FOnResearchCompleted OnResearchCompleted;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Events")
    FOnMessageReceived OnMessageReceived;

    // ── Player Identity ───────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    FString PlayerUniqueId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    FString PlayerDisplayName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    EPlayerStatus Status = EPlayerStatus::Active;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    FDateTime RegisterDate;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    FString AllianceId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Player")
    EAllianceRole AllianceRole = EAllianceRole::Member;

    // ── Research Levels ───────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Research")
    TMap<EResearchType, int32> ResearchLevels;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Research")
    bool bResearchInProgress = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Research")
    EResearchType CurrentResearch = EResearchType::EspionageTechnology;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Research")
    FDateTime ResearchFinishTime;

    // ── Score ─────────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Score")
    FPlayerScore Score;

    // ── Colonies / Planets ────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Planets")
    TArray<FString> OwnedPlanetIds;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Planets")
    FString HomePlanetId;

    // ── Messages ──────────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Messages")
    TArray<FGameMessage> Inbox;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Messages")
    TArray<FGameMessage> SentMessages;

    // ── Dark Matter ───────────────────────────────────────────────────────────
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Replicated, Category = "Premium")
    int32 DarkMatter = 0;

    // ── API ───────────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    int32 GetResearchLevel(EResearchType Type) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Research")
    void SetResearchLevel(EResearchType Type, int32 Level);

    UFUNCTION(BlueprintCallable, Category = "OGame|Research")
    bool StartResearch(EResearchType Type, FResources Cost, FTimespan Duration);

    UFUNCTION(BlueprintCallable, Category = "OGame|Research")
    void CompleteResearch();

    UFUNCTION(BlueprintCallable, Category = "OGame|Research")
    bool IsResearchComplete() const;

    UFUNCTION(BlueprintCallable, Category = "OGame|Messages")
    void ReceiveMessage(const FGameMessage& Message);

    UFUNCTION(BlueprintCallable, Category = "OGame|Messages")
    void MarkMessageRead(const FString& MessageId);

    UFUNCTION(BlueprintPure, Category = "OGame|Score")
    int64 GetTotalPoints() const { return Score.TotalPoints; }

    UFUNCTION(BlueprintCallable, Category = "OGame|Score")
    void AddPoints(int64 Building, int64 Research, int64 Fleet, int64 Defense);

    // ── Replication ───────────────────────────────────────────────────────────
    virtual void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;
};
