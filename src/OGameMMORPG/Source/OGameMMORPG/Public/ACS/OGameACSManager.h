// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameACSManager.h - Allied Combat System: multi-player coordinated fleet attacks and defenses.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameACSManager.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnACSGroupFormed,   const FString&, LeaderId,    const FACSGroup&, Group);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnACSPlayerJoined,  const FString&, PlayerId,    const FString&,   GroupId);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam (FOnACSGroupDissolved, const FString&, GroupId);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameACSManager : public UObject
{
    GENERATED_BODY()

public:
    UOGameACSManager();

    UPROPERTY(BlueprintAssignable, Category = "OGame|ACS|Events")
    FOnACSGroupFormed OnACSGroupFormed;

    UPROPERTY(BlueprintAssignable, Category = "OGame|ACS|Events")
    FOnACSPlayerJoined OnACSPlayerJoined;

    UPROPERTY(BlueprintAssignable, Category = "OGame|ACS|Events")
    FOnACSGroupDissolved OnACSGroupDissolved;

    // ── Group Lifecycle ───────────────────────────────────────────────────────

    /**
     * Create an ACS attack or defend group.
     * Leader specifies target coordinates and arrival time.
     */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    FString CreateGroup(const FString& LeaderPlayerId,
                         const FCoordinates& TargetCoords,
                         bool bIsAttack,
                         FDateTime ArrivalTime);

    /** Invite another player to join the ACS group. */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool InvitePlayer(const FString& GroupId, const FString& LeaderPlayerId,
                       const FString& InvitedPlayerId);

    /** Invited player accepts and joins with a fleet. */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool JoinGroup(const FString& GroupId, const FString& PlayerId,
                    const FString& FleetId);

    /** Leave an ACS group (removes fleet from group). */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool LeaveGroup(const FString& GroupId, const FString& PlayerId);

    /** Disband the entire group (leader only). */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool DisbandGroup(const FString& GroupId, const FString& LeaderPlayerId);

    // ── Status ────────────────────────────────────────────────────────────────

    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool SetGroupStatus(const FString& GroupId, EACSStatus NewStatus);

    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    bool GetGroup(const FString& GroupId, FACSGroup& OutGroup) const;

    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    TArray<FACSGroup> GetGroupsByPlayer(const FString& PlayerId) const;

    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    TArray<FACSGroup> GetGroupsAtCoords(const FCoordinates& Coords) const;

    /** All groups currently in transit for tick processing. */
    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    TArray<FACSGroup> GetArrivingGroups() const;

    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    FString GetGroupStatusText(const FString& GroupId) const;

    /** Check and transition groups that have arrived. */
    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    TArray<FString> ProcessArrivals();

    // ── Invite System ─────────────────────────────────────────────────────────

    UFUNCTION(BlueprintPure, Category = "OGame|ACS")
    TArray<FString> GetPendingInvites(const FString& PlayerId) const;

    UFUNCTION(BlueprintCallable, Category = "OGame|ACS")
    bool DeclineInvite(const FString& PlayerId, const FString& GroupId);

private:
    UPROPERTY()
    TArray<FACSGroup> Groups;

    // PlayerId -> list of pending GroupIds
    TMap<FString, TArray<FString>> PendingInvites;

    FACSGroup* FindGroupMutable(const FString& GroupId);
    FString ACSStatusName(EACSStatus Status) const;
};
