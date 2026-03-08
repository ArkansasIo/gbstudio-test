// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameLiveEventManager.h - Universe-wide timed events with production/combat multipliers.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameLiveEventManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnLiveEventStarted, const FLiveEvent&, Event);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnLiveEventEnded,   const FLiveEvent&, Event);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameLiveEventManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameLiveEventManager();

    // ── Events ────────────────────────────────────────────────────────────────
    UPROPERTY(BlueprintAssignable, Category = "OGame|Events|Signals")
    FOnLiveEventStarted OnLiveEventStarted;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Events|Signals")
    FOnLiveEventEnded OnLiveEventEnded;

    // ── Event Lifecycle ───────────────────────────────────────────────────────

    /** Activate a predefined event by type. Returns the EventId. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Events")
    FString StartEvent(ELiveEventType Type, FTimespan Duration);

    /** Schedule a future event. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Events")
    FString ScheduleEvent(ELiveEventType Type, FDateTime StartTime, FTimespan Duration);

    /** Manually end an active event. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Events")
    bool EndEvent(const FString& EventId);

    /** Called every server tick to expire events and start scheduled ones. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Events")
    void TickEvents();

    // ── Query ─────────────────────────────────────────────────────────────────

    /** Get the current production multiplier (sum of all active events). */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    float GetCurrentProductionMultiplier() const;

    /** Get the current combat multiplier. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    float GetCurrentCombatMultiplier() const;

    /** Get the current fleet speed multiplier. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    float GetCurrentSpeedMultiplier() const;

    /** All currently active events. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    TArray<FLiveEvent> GetActiveEvents() const;

    /** Next scheduled event. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    bool GetNextScheduledEvent(FLiveEvent& OutEvent) const;

    /** Text status of all events. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    FString GetEventStatusText() const;

    // ── Participation ─────────────────────────────────────────────────────────

    /** Register player participation in an event. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Events")
    bool JoinEvent(const FString& EventId, const FString& PlayerId);

    /** Check if a player is participating. */
    UFUNCTION(BlueprintPure, Category = "OGame|Events")
    bool IsPlayerParticipating(const FString& EventId, const FString& PlayerId) const;

private:
    UPROPERTY()
    TArray<FLiveEvent> Events;

    FLiveEvent BuildEventDefinition(ELiveEventType Type, FDateTime Start, FTimespan Duration) const;
    FString EventTypeName(ELiveEventType Type) const;
    FString EventTypeDescription(ELiveEventType Type) const;
};
