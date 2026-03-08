// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Notifications/OGameNotificationManager.h"

UOGameNotificationManager::UOGameNotificationManager()
{
}

FString UOGameNotificationManager::SendNotification(const FString& TargetPlayerId,
                                                      ENotificationType Type,
                                                      ENotificationPriority Priority,
                                                      const FString& Title,
                                                      const FString& Body,
                                                      const FString& RelatedId)
{
    FGameNotification Notif;
    Notif.NotificationId = FString::Printf(TEXT("notif_%s_%lld"), *TargetPlayerId,
                                            FDateTime::UtcNow().GetTicks());
    Notif.TargetPlayerId = TargetPlayerId;
    Notif.Type           = Type;
    Notif.Priority       = Priority;
    Notif.Title          = Title;
    Notif.Body           = Body;
    Notif.RelatedId      = RelatedId;
    Notif.CreatedAt      = FDateTime::UtcNow();
    Notif.bIsRead        = false;
    Notif.bIsDismissed   = false;

    Notifications.Add(Notif);
    OnNotificationReceived.Broadcast(Notif);

    return Notif.NotificationId;
}

void UOGameNotificationManager::BroadcastNotification(ENotificationType Type,
                                                        ENotificationPriority Priority,
                                                        const FString& Title,
                                                        const FString& Body,
                                                        const TArray<FString>& AllPlayerIds)
{
    for (const FString& PlayerId : AllPlayerIds)
    {
        SendNotification(PlayerId, Type, Priority, Title, Body);
    }
}

void UOGameNotificationManager::NotifyFleetArrival(const FString& PlayerId,
                                                    const FString& FleetId,
                                                    const FCoordinates& Destination)
{
    FString Body = FString::Printf(TEXT("Your fleet has arrived at %s."), *Destination.ToString());
    SendNotification(PlayerId, ENotificationType::FleetArrival,
                     ENotificationPriority::Normal, TEXT("Fleet Arrived"), Body, FleetId);
}

void UOGameNotificationManager::NotifyIncomingAttack(const FString& DefenderId,
                                                      const FCoordinates& TargetPlanet,
                                                      const FString& AttackerName,
                                                      const FString& FleetId)
{
    FString Body = FString::Printf(TEXT("Incoming hostile fleet from %s targeting your planet at %s!"),
                                   *AttackerName, *TargetPlanet.ToString());
    SendNotification(DefenderId, ENotificationType::FleetAttack,
                     ENotificationPriority::Critical, TEXT("⚠ INCOMING ATTACK"), Body, FleetId);
}

void UOGameNotificationManager::NotifyBuildingComplete(const FString& PlayerId,
                                                         EBuildingType Building,
                                                         int32 Level,
                                                         const FCoordinates& Planet)
{
    FString Body = FString::Printf(TEXT("Construction complete on %s. Now level %d on planet %s."),
                                   *UEnum::GetValueAsString(Building), Level, *Planet.ToString());
    SendNotification(PlayerId, ENotificationType::BuildingComplete,
                     ENotificationPriority::Normal, TEXT("Building Complete"), Body);
}

void UOGameNotificationManager::NotifyResearchComplete(const FString& PlayerId,
                                                        EResearchType Research,
                                                        int32 Level)
{
    FString Body = FString::Printf(TEXT("%s research complete. Now level %d."),
                                   *UEnum::GetValueAsString(Research), Level);
    SendNotification(PlayerId, ENotificationType::ResearchComplete,
                     ENotificationPriority::Normal, TEXT("Research Complete"), Body);
}

void UOGameNotificationManager::NotifyCombatReport(const FString& PlayerId,
                                                    const FString& ReportId,
                                                    ECombatOutcome Outcome,
                                                    const FCoordinates& Location)
{
    FString OutcomeStr;
    switch (Outcome)
    {
        case ECombatOutcome::AttackerWins: OutcomeStr = TEXT("Attacker Victory"); break;
        case ECombatOutcome::DefenderWins: OutcomeStr = TEXT("Defender Victory"); break;
        default:                           OutcomeStr = TEXT("Draw");             break;
    }

    FString Body = FString::Printf(TEXT("Combat resolved at %s. Outcome: %s."),
                                   *Location.ToString(), *OutcomeStr);
    SendNotification(PlayerId, ENotificationType::CombatReport,
                     ENotificationPriority::High, TEXT("Combat Report"), Body, ReportId);
}

void UOGameNotificationManager::NotifyAchievementUnlocked(const FString& PlayerId,
                                                            const FString& AchievementName,
                                                            int32 DarkMatterReward)
{
    FString Body = FString::Printf(TEXT("Achievement '%s' unlocked! Reward: %d dark matter."),
                                   *AchievementName, DarkMatterReward);
    SendNotification(PlayerId, ENotificationType::AchievementUnlocked,
                     ENotificationPriority::Normal, TEXT("Achievement Unlocked!"), Body);
}

void UOGameNotificationManager::NotifyMoonCreated(const FString& PlayerId,
                                                   const FCoordinates& Location)
{
    FString Body = FString::Printf(TEXT("A moon has been created at %s!"), *Location.ToString());
    SendNotification(PlayerId, ENotificationType::MoonCreated,
                     ENotificationPriority::High, TEXT("Moon Created!"), Body);
}

TArray<FGameNotification> UOGameNotificationManager::GetUnread(const FString& PlayerId) const
{
    TArray<FGameNotification> Result;
    for (const FGameNotification& N : Notifications)
    {
        if (N.TargetPlayerId == PlayerId && !N.bIsRead && !N.bIsDismissed)
        {
            Result.Add(N);
        }
    }
    return Result;
}

TArray<FGameNotification> UOGameNotificationManager::GetAll(const FString& PlayerId,
                                                              int32 MaxResults) const
{
    TArray<FGameNotification> Result;
    for (int32 i = Notifications.Num() - 1; i >= 0 && Result.Num() < MaxResults; --i)
    {
        const FGameNotification& N = Notifications[i];
        if (N.TargetPlayerId == PlayerId && !N.bIsDismissed)
        {
            Result.Add(N);
        }
    }
    return Result;
}

bool UOGameNotificationManager::MarkRead(const FString& NotificationId,
                                          const FString& PlayerId)
{
    for (FGameNotification& N : Notifications)
    {
        if (N.NotificationId == NotificationId && N.TargetPlayerId == PlayerId)
        {
            N.bIsRead = true;
            return true;
        }
    }
    return false;
}

int32 UOGameNotificationManager::MarkAllRead(const FString& PlayerId)
{
    int32 Count = 0;
    for (FGameNotification& N : Notifications)
    {
        if (N.TargetPlayerId == PlayerId && !N.bIsRead)
        {
            N.bIsRead = true;
            ++Count;
        }
    }
    return Count;
}

bool UOGameNotificationManager::Dismiss(const FString& NotificationId,
                                         const FString& PlayerId)
{
    for (FGameNotification& N : Notifications)
    {
        if (N.NotificationId == NotificationId && N.TargetPlayerId == PlayerId)
        {
            N.bIsDismissed = true;
            return true;
        }
    }
    return false;
}

int32 UOGameNotificationManager::GetUnreadCount(const FString& PlayerId) const
{
    int32 Count = 0;
    for (const FGameNotification& N : Notifications)
    {
        if (N.TargetPlayerId == PlayerId && !N.bIsRead && !N.bIsDismissed) ++Count;
    }
    return Count;
}

int32 UOGameNotificationManager::PurgeOld(int32 OlderThanDays)
{
    FDateTime Cutoff = FDateTime::UtcNow() - FTimespan::FromDays(OlderThanDays);
    int32 Before = Notifications.Num();

    Notifications.RemoveAll([&](const FGameNotification& N)
    {
        return N.CreatedAt < Cutoff;
    });

    return Before - Notifications.Num();
}

FString UOGameNotificationManager::TypeToString(ENotificationType Type) const
{
    return UEnum::GetValueAsString(Type);
}
