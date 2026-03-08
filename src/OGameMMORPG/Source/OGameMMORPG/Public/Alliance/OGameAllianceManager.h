// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameAllianceManager.h - Alliance creation, membership, diplomacy and shared research.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameAllianceManager.generated.h"

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FAllianceMember
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString PlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString DisplayName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    EAllianceRole Role = EAllianceRole::Member;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FDateTime JoinDate;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    int64 DonatedMetal = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    int64 DonatedCrystal = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    int64 DonatedDeuterium = 0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FAlliance
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString AllianceId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString Tag; // Short 3-5 char tag

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    TArray<FAllianceMember> Members;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    FDateTime FoundedDate;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    bool bOpenToApplications = true;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    TArray<FString> AllyAllianceIds;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Alliance")
    TArray<FString> NAPAllianceIds; // Non-Aggression Pact

    int32 GetMemberCount() const { return Members.Num(); }
};

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameAllianceManager : public UObject
{
    GENERATED_BODY()

public:
    // ── Alliance CRUD ─────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    FString CreateAlliance(const FString& Name, const FString& Tag,
                            const FString& LeaderPlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool DisbandAlliance(const FString& AllianceId, const FString& RequestingPlayerId);

    UFUNCTION(BlueprintPure, Category = "OGame|Alliance")
    FAlliance* GetAlliance(const FString& AllianceId);

    UFUNCTION(BlueprintPure, Category = "OGame|Alliance")
    TArray<FAlliance> GetAllAlliances() const { return Alliances; }

    // ── Membership ────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool InvitePlayer(const FString& AllianceId, const FString& PlayerId,
                       const FString& DisplayName);

    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool KickPlayer(const FString& AllianceId, const FString& PlayerId,
                     const FString& RequestingPlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool LeaveAlliance(const FString& AllianceId, const FString& PlayerId);

    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool PromoteMember(const FString& AllianceId, const FString& PlayerId,
                        EAllianceRole NewRole, const FString& RequestingPlayerId);

    // ── Diplomacy ─────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool ProposePact(const FString& AllianceId, const FString& TargetAllianceId, bool bIsAlly);

    UFUNCTION(BlueprintCallable, Category = "OGame|Alliance")
    bool BreakPact(const FString& AllianceId, const FString& TargetAllianceId);

    UFUNCTION(BlueprintPure, Category = "OGame|Alliance")
    bool AreAllies(const FString& AllianceId1, const FString& AllianceId2) const;

    // ── Text ──────────────────────────────────────────────────────────────────
    UFUNCTION(BlueprintPure, Category = "OGame|Alliance")
    FString GetAllianceInfoText(const FString& AllianceId) const;

private:
    UPROPERTY()
    TArray<FAlliance> Alliances;

    FAllianceMember* FindMember(FAlliance& Alliance, const FString& PlayerId);
};
