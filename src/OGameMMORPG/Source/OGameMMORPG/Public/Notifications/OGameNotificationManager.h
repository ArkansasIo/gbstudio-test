// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameNotificationManager.h - Real-time in-game notification dispatch and inbox.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameNotificationManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnNotificationReceived, const FGameNotification&, Notification);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameNotificationManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameNotificationManager();

    UPROPERTY(BlueprintAssignable, Category = "OGame|Notifications|Events")
    FOnNotificationReceived OnNotificationReceived;

    // ── Dispatch ──────────────────────────────────────────────────────────────

    /** Send a notification to a specific player. Returns NotificationId. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    FString SendNotification(const FString& TargetPlayerId,
                              ENotificationType Type,
                              ENotificationPriority Priority,
                              const FString& Title,
                              const FString& Body,
                              const FString& RelatedId = TEXT(""));

    /** Broadcast a notification to all players. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void BroadcastNotification(ENotificationType Type,
                                ENotificationPriority Priority,
                                const FString& Title,
                                const FString& Body,
                                const TArray<FString>& AllPlayerIds);

    // ── Convenience senders ───────────────────────────────────────────────────

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyFleetArrival(const FString& PlayerId, const FString& FleetId,
                             const FCoordinates& Destination);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyIncomingAttack(const FString& DefenderId, const FCoordinates& TargetPlanet,
                               const FString& AttackerName, const FString& FleetId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyBuildingComplete(const FString& PlayerId, EBuildingType Building, int32 Level,
                                 const FCoordinates& Planet);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyResearchComplete(const FString& PlayerId, EResearchType Research, int32 Level);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyCombatReport(const FString& PlayerId, const FString& ReportId,
                             ECombatOutcome Outcome, const FCoordinates& Location);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyAchievementUnlocked(const FString& PlayerId, const FString& AchievementName,
                                    int32 DarkMatterReward);

    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    void NotifyMoonCreated(const FString& PlayerId, const FCoordinates& Location);

    // ── Inbox ─────────────────────────────────────────────────────────────────

    /** Get unread notifications for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Notifications")
    TArray<FGameNotification> GetUnread(const FString& PlayerId) const;

    /** Get all notifications for a player (most recent first). */
    UFUNCTION(BlueprintPure, Category = "OGame|Notifications")
    TArray<FGameNotification> GetAll(const FString& PlayerId, int32 MaxResults = 50) const;

    /** Mark a notification as read. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    bool MarkRead(const FString& NotificationId, const FString& PlayerId);

    /** Mark all notifications as read for a player. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    int32 MarkAllRead(const FString& PlayerId);

    /** Dismiss (soft-delete) a notification. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    bool Dismiss(const FString& NotificationId, const FString& PlayerId);

    /** Unread count for a player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Notifications")
    int32 GetUnreadCount(const FString& PlayerId) const;

    /** Remove notifications older than the given number of days. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Notifications")
    int32 PurgeOld(int32 OlderThanDays = 30);

private:
    UPROPERTY()
    TArray<FGameNotification> Notifications;

    FString TypeToString(ENotificationType Type) const;
};
