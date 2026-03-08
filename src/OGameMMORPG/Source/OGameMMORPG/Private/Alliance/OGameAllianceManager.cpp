// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Alliance/OGameAllianceManager.h"

FString UOGameAllianceManager::CreateAlliance(const FString& Name, const FString& Tag,
                                               const FString& LeaderPlayerId)
{
    FAlliance NewAlliance;
    NewAlliance.AllianceId   = FString::Printf(TEXT("alliance_%s_%lld"),
                                                *Tag, FDateTime::UtcNow().GetTicks());
    NewAlliance.Name         = Name;
    NewAlliance.Tag          = Tag;
    NewAlliance.FoundedDate  = FDateTime::UtcNow();

    FAllianceMember Leader;
    Leader.PlayerId     = LeaderPlayerId;
    Leader.DisplayName  = LeaderPlayerId;
    Leader.Role         = EAllianceRole::Leader;
    Leader.JoinDate     = FDateTime::UtcNow();
    NewAlliance.Members.Add(Leader);

    Alliances.Add(NewAlliance);

    UE_LOG(LogTemp, Log, TEXT("Alliance [%s] '%s' created by %s"),
           *Tag, *Name, *LeaderPlayerId);
    return NewAlliance.AllianceId;
}

bool UOGameAllianceManager::DisbandAlliance(const FString& AllianceId, const FString& RequestingPlayerId)
{
    for (int32 i = 0; i < Alliances.Num(); ++i)
    {
        if (Alliances[i].AllianceId != AllianceId) continue;

        FAllianceMember* Requester = FindMember(Alliances[i], RequestingPlayerId);
        if (!Requester || Requester->Role != EAllianceRole::Leader)
        {
            return false;
        }

        Alliances.RemoveAt(i);
        return true;
    }
    return false;
}

FAlliance* UOGameAllianceManager::GetAlliance(const FString& AllianceId)
{
    for (FAlliance& A : Alliances)
    {
        if (A.AllianceId == AllianceId)
        {
            return &A;
        }
    }
    return nullptr;
}

bool UOGameAllianceManager::InvitePlayer(const FString& AllianceId, const FString& PlayerId,
                                          const FString& DisplayName)
{
    FAlliance* A = GetAlliance(AllianceId);
    if (!A) return false;

    // Check not already a member
    for (const FAllianceMember& M : A->Members)
    {
        if (M.PlayerId == PlayerId) return false;
    }

    FAllianceMember NewMember;
    NewMember.PlayerId    = PlayerId;
    NewMember.DisplayName = DisplayName;
    NewMember.Role        = EAllianceRole::Recruit;
    NewMember.JoinDate    = FDateTime::UtcNow();
    A->Members.Add(NewMember);
    return true;
}

bool UOGameAllianceManager::KickPlayer(const FString& AllianceId, const FString& PlayerId,
                                        const FString& RequestingPlayerId)
{
    FAlliance* A = GetAlliance(AllianceId);
    if (!A) return false;

    FAllianceMember* Requester = FindMember(*A, RequestingPlayerId);
    if (!Requester || Requester->Role == EAllianceRole::Member || Requester->Role == EAllianceRole::Recruit)
    {
        return false;
    }

    for (int32 i = 0; i < A->Members.Num(); ++i)
    {
        if (A->Members[i].PlayerId == PlayerId)
        {
            A->Members.RemoveAt(i);
            return true;
        }
    }
    return false;
}

bool UOGameAllianceManager::LeaveAlliance(const FString& AllianceId, const FString& PlayerId)
{
    FAlliance* A = GetAlliance(AllianceId);
    if (!A) return false;

    for (int32 i = 0; i < A->Members.Num(); ++i)
    {
        if (A->Members[i].PlayerId == PlayerId)
        {
            // If leader leaves, disband or transfer
            if (A->Members[i].Role == EAllianceRole::Leader && A->Members.Num() > 1)
            {
                A->Members[i == 0 ? 1 : 0].Role = EAllianceRole::Leader;
            }
            A->Members.RemoveAt(i);

            if (A->Members.IsEmpty())
            {
                Alliances.Remove(*A);
            }
            return true;
        }
    }
    return false;
}

bool UOGameAllianceManager::PromoteMember(const FString& AllianceId, const FString& PlayerId,
                                           EAllianceRole NewRole, const FString& RequestingPlayerId)
{
    FAlliance* A = GetAlliance(AllianceId);
    if (!A) return false;

    FAllianceMember* Requester = FindMember(*A, RequestingPlayerId);
    if (!Requester || Requester->Role != EAllianceRole::Leader) return false;

    FAllianceMember* Target = FindMember(*A, PlayerId);
    if (!Target) return false;

    Target->Role = NewRole;
    return true;
}

bool UOGameAllianceManager::ProposePact(const FString& AllianceId,
                                         const FString& TargetAllianceId, bool bIsAlly)
{
    FAlliance* A = GetAlliance(AllianceId);
    FAlliance* B = GetAlliance(TargetAllianceId);
    if (!A || !B) return false;

    if (bIsAlly)
    {
        A->AllyAllianceIds.AddUnique(TargetAllianceId);
        B->AllyAllianceIds.AddUnique(AllianceId);
    }
    else
    {
        A->NAPAllianceIds.AddUnique(TargetAllianceId);
        B->NAPAllianceIds.AddUnique(AllianceId);
    }
    return true;
}

bool UOGameAllianceManager::BreakPact(const FString& AllianceId, const FString& TargetAllianceId)
{
    FAlliance* A = GetAlliance(AllianceId);
    FAlliance* B = GetAlliance(TargetAllianceId);
    if (!A || !B) return false;

    A->AllyAllianceIds.Remove(TargetAllianceId);
    A->NAPAllianceIds.Remove(TargetAllianceId);
    B->AllyAllianceIds.Remove(AllianceId);
    B->NAPAllianceIds.Remove(AllianceId);
    return true;
}

bool UOGameAllianceManager::AreAllies(const FString& AllianceId1,
                                       const FString& AllianceId2) const
{
    for (const FAlliance& A : Alliances)
    {
        if (A.AllianceId == AllianceId1)
        {
            return A.AllyAllianceIds.Contains(AllianceId2);
        }
    }
    return false;
}

FString UOGameAllianceManager::GetAllianceInfoText(const FString& AllianceId) const
{
    for (const FAlliance& A : Alliances)
    {
        if (A.AllianceId != AllianceId) continue;

        FString Text;
        Text += FString::Printf(TEXT("=== Alliance [%s] %s ===\n"), *A.Tag, *A.Name);
        Text += FString::Printf(TEXT("Founded: %s\n"), *A.FoundedDate.ToString());
        Text += FString::Printf(TEXT("Members: %d\n"), A.Members.Num());
        Text += TEXT("--- Members ---\n");
        for (const FAllianceMember& M : A.Members)
        {
            FString RoleStr;
            switch (M.Role)
            {
                case EAllianceRole::Leader:  RoleStr = TEXT("Leader");  break;
                case EAllianceRole::Deputy:  RoleStr = TEXT("Deputy");  break;
                case EAllianceRole::Member:  RoleStr = TEXT("Member");  break;
                case EAllianceRole::Recruit: RoleStr = TEXT("Recruit"); break;
            }
            Text += FString::Printf(TEXT("  [%s] %s\n"), *RoleStr, *M.DisplayName);
        }
        return Text;
    }
    return TEXT("Alliance not found.\n");
}

FAllianceMember* UOGameAllianceManager::FindMember(FAlliance& Alliance, const FString& PlayerId)
{
    for (FAllianceMember& M : Alliance.Members)
    {
        if (M.PlayerId == PlayerId) return &M;
    }
    return nullptr;
}
