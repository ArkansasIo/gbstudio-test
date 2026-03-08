// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Trading/OGameTradingHub.h"
#include "Math/UnrealMathUtility.h"

UOGameTradingHub::UOGameTradingHub()
{
}

FString UOGameTradingHub::PostOffer(const FString& PlayerId,
                                     ETradeOfferType OfferType,
                                     EResourceType OfferedResource, double OfferedAmount,
                                     EResourceType WantedResource,  double WantedAmount,
                                     int32 DurationHours)
{
    if (OfferedAmount <= 0.0 || WantedAmount <= 0.0)
    {
        return FString();
    }

    if (OfferedResource == WantedResource)
    {
        return FString();
    }

    FTradeOffer Offer;
    Offer.OfferId          = FString::Printf(TEXT("trade_%s_%lld"), *PlayerId, FDateTime::UtcNow().GetTicks());
    Offer.SellerPlayerId   = PlayerId;
    Offer.OfferType        = OfferType;
    Offer.OfferedResource  = OfferedResource;
    Offer.OfferedAmount    = OfferedAmount;
    Offer.WantedResource   = WantedResource;
    Offer.WantedAmount     = WantedAmount;
    Offer.State            = ETradeOfferState::Open;
    Offer.CreatedAt        = FDateTime::UtcNow();
    Offer.ExpiresAt        = FDateTime::UtcNow() + FTimespan::FromHours(DurationHours);

    Offers.Add(Offer);
    OnTradePosted.Broadcast(PlayerId, Offer);

    UE_LOG(LogTemp, Log, TEXT("Trade offer posted: %s offering %.0f %s for %.0f %s"),
           *PlayerId, OfferedAmount, *ResourceName(OfferedResource),
           WantedAmount, *ResourceName(WantedResource));

    return Offer.OfferId;
}

bool UOGameTradingHub::CancelOffer(const FString& OfferId, const FString& PlayerId)
{
    for (FTradeOffer& Offer : Offers)
    {
        if (Offer.OfferId == OfferId &&
            Offer.SellerPlayerId == PlayerId &&
            Offer.State == ETradeOfferState::Open)
        {
            Offer.State = ETradeOfferState::Cancelled;
            return true;
        }
    }
    return false;
}

bool UOGameTradingHub::AcceptOffer(const FString& OfferId, const FString& BuyerPlayerId,
                                    FResources& BuyerResourcesIn,  FResources& BuyerResourcesOut,
                                    FResources& SellerResourcesIn, FResources& SellerResourcesOut)
{
    for (FTradeOffer& Offer : Offers)
    {
        if (Offer.OfferId != OfferId || Offer.State != ETradeOfferState::Open)
        {
            continue;
        }

        if (Offer.SellerPlayerId == BuyerPlayerId)
        {
            return false; // Can't buy your own offer
        }

        // Validate that buyer has enough of the wanted resource
        auto HasResource = [](const FResources& Res, EResourceType Type, double Amount) -> bool
        {
            switch (Type)
            {
                case EResourceType::Metal:     return Res.Metal     >= Amount;
                case EResourceType::Crystal:   return Res.Crystal   >= Amount;
                case EResourceType::Deuterium: return Res.Deuterium >= Amount;
                default: return false;
            }
        };

        if (!HasResource(BuyerResourcesIn, Offer.WantedResource, Offer.WantedAmount))
        {
            return false;
        }

        // Execute trade
        auto AdjustResource = [](FResources& Res, EResourceType Type, double Delta)
        {
            switch (Type)
            {
                case EResourceType::Metal:     Res.Metal     += Delta; break;
                case EResourceType::Crystal:   Res.Crystal   += Delta; break;
                case EResourceType::Deuterium: Res.Deuterium += Delta; break;
                default: break;
            }
        };

        // Buyer pays WantedResource, receives OfferedResource
        BuyerResourcesOut  = BuyerResourcesIn;
        AdjustResource(BuyerResourcesOut,  Offer.WantedResource,  -Offer.WantedAmount);
        AdjustResource(BuyerResourcesOut,  Offer.OfferedResource, +Offer.OfferedAmount);

        // Seller receives WantedResource (already reserved OfferedResource)
        SellerResourcesIn  = FResources();
        SellerResourcesOut = FResources();
        AdjustResource(SellerResourcesOut, Offer.WantedResource, +Offer.WantedAmount);

        Offer.State        = ETradeOfferState::Fulfilled;
        Offer.BuyerPlayerId = BuyerPlayerId;

        OnTradeCompleted.Broadcast(Offer);

        UE_LOG(LogTemp, Log, TEXT("Trade fulfilled: %s bought %.0f %s from %s"),
               *BuyerPlayerId, Offer.OfferedAmount, *ResourceName(Offer.OfferedResource),
               *Offer.SellerPlayerId);
        return true;
    }
    return false;
}

TArray<FTradeOffer> UOGameTradingHub::GetOpenOffers(EResourceType OfferedResource,
                                                     EResourceType WantedResource,
                                                     bool bFilterOffered,
                                                     bool bFilterWanted) const
{
    TArray<FTradeOffer> Result;
    for (const FTradeOffer& Offer : Offers)
    {
        if (Offer.State != ETradeOfferState::Open) continue;
        if (Offer.ExpiresAt < FDateTime::UtcNow()) continue;

        if (bFilterOffered && Offer.OfferedResource != OfferedResource) continue;
        if (bFilterWanted  && Offer.WantedResource  != WantedResource)  continue;

        Result.Add(Offer);
    }

    // Sort by best ratio (most offered per unit wanted)
    Result.Sort([](const FTradeOffer& A, const FTradeOffer& B)
    {
        return A.GetRatio() > B.GetRatio();
    });

    return Result;
}

TArray<FTradeOffer> UOGameTradingHub::GetOffersByPlayer(const FString& PlayerId) const
{
    TArray<FTradeOffer> Result;
    for (const FTradeOffer& Offer : Offers)
    {
        if (Offer.SellerPlayerId == PlayerId)
        {
            Result.Add(Offer);
        }
    }
    return Result;
}

float UOGameTradingHub::GetBestRate(EResourceType From, EResourceType To) const
{
    float BestRate = 0.0f;
    for (const FTradeOffer& Offer : Offers)
    {
        if (Offer.State != ETradeOfferState::Open) continue;
        if (Offer.OfferedResource != From) continue;
        if (Offer.WantedResource  != To)  continue;

        float Rate = static_cast<float>(Offer.OfferedAmount / FMath::Max(1.0, Offer.WantedAmount));
        BestRate = FMath::Max(BestRate, Rate);
    }
    return BestRate;
}

bool UOGameTradingHub::GetOffer(const FString& OfferId, FTradeOffer& OutOffer) const
{
    for (const FTradeOffer& Offer : Offers)
    {
        if (Offer.OfferId == OfferId)
        {
            OutOffer = Offer;
            return true;
        }
    }
    return false;
}

int32 UOGameTradingHub::ExpireOldOffers()
{
    int32 Expired = 0;
    for (FTradeOffer& Offer : Offers)
    {
        if (Offer.State == ETradeOfferState::Open && Offer.ExpiresAt < FDateTime::UtcNow())
        {
            Offer.State = ETradeOfferState::Expired;
            ++Expired;
        }
    }
    return Expired;
}

FString UOGameTradingHub::GetMarketplaceText() const
{
    int32 Open = 0;
    for (const FTradeOffer& O : Offers)
    {
        if (O.State == ETradeOfferState::Open) ++Open;
    }

    FString Text;
    Text += TEXT("=== Resource Marketplace ===\n");
    Text += FString::Printf(TEXT("Open Offers: %d  (Total: %d)\n"), Open, Offers.Num());
    Text += TEXT("─────────────────────────────────────────────────────────────\n");
    Text += FString::Printf(TEXT("  %-20s  %-12s  %-12s  %-12s  %-12s\n"),
                            TEXT("Seller"), TEXT("Offering"), TEXT("Amount"), TEXT("Wanting"), TEXT("Amount"));
    Text += TEXT("─────────────────────────────────────────────────────────────\n");

    int32 Shown = 0;
    for (const FTradeOffer& Offer : Offers)
    {
        if (Offer.State != ETradeOfferState::Open) continue;
        Text += FString::Printf(TEXT("  %-20s  %-12s  %-12.0f  %-12s  %-12.0f\n"),
                                *Offer.SellerPlayerId,
                                *ResourceName(Offer.OfferedResource),
                                Offer.OfferedAmount,
                                *ResourceName(Offer.WantedResource),
                                Offer.WantedAmount);
        if (++Shown >= 30) break;
    }
    return Text;
}

int32 UOGameTradingHub::GetOpenOfferCount() const
{
    int32 Count = 0;
    for (const FTradeOffer& O : Offers)
    {
        if (O.State == ETradeOfferState::Open) ++Count;
    }
    return Count;
}

FString UOGameTradingHub::ResourceName(EResourceType Type) const
{
    switch (Type)
    {
        case EResourceType::Metal:     return TEXT("Metal");
        case EResourceType::Crystal:   return TEXT("Crystal");
        case EResourceType::Deuterium: return TEXT("Deuterium");
        case EResourceType::Energy:    return TEXT("Energy");
        case EResourceType::DarkMatter: return TEXT("Dark Matter");
        default: return TEXT("Unknown");
    }
}
