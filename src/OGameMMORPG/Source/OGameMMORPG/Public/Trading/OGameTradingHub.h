// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameTradingHub.h - Player-to-player resource marketplace and trading system.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "Core/OGameExtendedTypes.h"
#include "OGameTradingHub.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnTradeCompleted, const FTradeOffer&, Offer);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnTradePosted, const FString&, PlayerId, const FTradeOffer&, Offer);

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameTradingHub : public UObject
{
    GENERATED_BODY()

public:
    UOGameTradingHub();

    // ── Events ────────────────────────────────────────────────────────────────
    UPROPERTY(BlueprintAssignable, Category = "OGame|Trade|Events")
    FOnTradeCompleted OnTradeCompleted;

    UPROPERTY(BlueprintAssignable, Category = "OGame|Trade|Events")
    FOnTradePosted OnTradePosted;

    // ── Offer Lifecycle ───────────────────────────────────────────────────────

    /** Post a new sell/buy offer to the marketplace. Returns the new OfferId. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Trade")
    FString PostOffer(const FString& PlayerId,
                      ETradeOfferType OfferType,
                      EResourceType OfferedResource, double OfferedAmount,
                      EResourceType WantedResource,  double WantedAmount,
                      int32 DurationHours = 72);

    /** Cancel an existing offer. Only the owner can cancel. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Trade")
    bool CancelOffer(const FString& OfferId, const FString& PlayerId);

    /** Accept an open offer. Automatically transfers resources. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Trade")
    bool AcceptOffer(const FString& OfferId, const FString& BuyerPlayerId,
                     FResources& BuyerResourcesIn,  FResources& BuyerResourcesOut,
                     FResources& SellerResourcesIn, FResources& SellerResourcesOut);

    // ── Query ─────────────────────────────────────────────────────────────────

    /** All open offers, optionally filtered by offered/wanted resource. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    TArray<FTradeOffer> GetOpenOffers(EResourceType OfferedResource,
                                       EResourceType WantedResource,
                                       bool bFilterOffered = false,
                                       bool bFilterWanted  = false) const;

    /** All offers by a specific player. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    TArray<FTradeOffer> GetOffersByPlayer(const FString& PlayerId) const;

    /** Best exchange rate for a resource pair. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    float GetBestRate(EResourceType From, EResourceType To) const;

    /** Get a specific offer by ID. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    bool GetOffer(const FString& OfferId, FTradeOffer& OutOffer) const;

    // ── Maintenance ───────────────────────────────────────────────────────────

    /** Expire all offers past their ExpiresAt time. Called by server tick. */
    UFUNCTION(BlueprintCallable, Category = "OGame|Trade")
    int32 ExpireOldOffers();

    /** Text summary of marketplace state. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    FString GetMarketplaceText() const;

    /** Total number of active offers. */
    UFUNCTION(BlueprintPure, Category = "OGame|Trade")
    int32 GetOpenOfferCount() const;

private:
    UPROPERTY()
    TArray<FTradeOffer> Offers;

    FString ResourceName(EResourceType Type) const;
};
