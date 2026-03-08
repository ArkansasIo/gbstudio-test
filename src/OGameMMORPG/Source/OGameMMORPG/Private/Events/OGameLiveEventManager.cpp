// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Events/OGameLiveEventManager.h"
#include "Math/UnrealMathUtility.h"

UOGameLiveEventManager::UOGameLiveEventManager()
{
}

FString UOGameLiveEventManager::StartEvent(ELiveEventType Type, FTimespan Duration)
{
    FDateTime Now = FDateTime::UtcNow();
    FLiveEvent Event = BuildEventDefinition(Type, Now, Duration);
    Event.bIsActive  = true;

    Events.Add(Event);
    OnLiveEventStarted.Broadcast(Event);

    UE_LOG(LogTemp, Log, TEXT("Live event started: %s (duration: %.1f h)"),
           *Event.Name, Duration.GetTotalHours());
    return Event.EventId;
}

FString UOGameLiveEventManager::ScheduleEvent(ELiveEventType Type, FDateTime StartTime,
                                                FTimespan Duration)
{
    FLiveEvent Event = BuildEventDefinition(Type, StartTime, Duration);
    Event.bIsActive  = false;
    Events.Add(Event);
    return Event.EventId;
}

bool UOGameLiveEventManager::EndEvent(const FString& EventId)
{
    for (FLiveEvent& Event : Events)
    {
        if (Event.EventId == EventId && Event.bIsActive)
        {
            Event.bIsActive = false;
            Event.EndTime   = FDateTime::UtcNow();
            OnLiveEventEnded.Broadcast(Event);
            return true;
        }
    }
    return false;
}

void UOGameLiveEventManager::TickEvents()
{
    FDateTime Now = FDateTime::UtcNow();

    for (FLiveEvent& Event : Events)
    {
        // Start scheduled events
        if (!Event.bIsActive && Event.StartTime <= Now && Event.EndTime > Now)
        {
            Event.bIsActive = true;
            OnLiveEventStarted.Broadcast(Event);
            UE_LOG(LogTemp, Log, TEXT("Scheduled event started: %s"), *Event.Name);
        }

        // Expire active events
        if (Event.bIsActive && Event.EndTime <= Now)
        {
            Event.bIsActive = false;
            OnLiveEventEnded.Broadcast(Event);
            UE_LOG(LogTemp, Log, TEXT("Live event ended: %s"), *Event.Name);
        }
    }
}

float UOGameLiveEventManager::GetCurrentProductionMultiplier() const
{
    float Mult = 1.0f;
    for (const FLiveEvent& Event : Events)
    {
        if (Event.bIsActive) Mult *= Event.ProductionMultiplier;
    }
    return Mult;
}

float UOGameLiveEventManager::GetCurrentCombatMultiplier() const
{
    float Mult = 1.0f;
    for (const FLiveEvent& Event : Events)
    {
        if (Event.bIsActive) Mult *= Event.CombatMultiplier;
    }
    return Mult;
}

float UOGameLiveEventManager::GetCurrentSpeedMultiplier() const
{
    float Mult = 1.0f;
    for (const FLiveEvent& Event : Events)
    {
        if (Event.bIsActive) Mult *= Event.SpeedMultiplier;
    }
    return Mult;
}

TArray<FLiveEvent> UOGameLiveEventManager::GetActiveEvents() const
{
    TArray<FLiveEvent> Result;
    for (const FLiveEvent& E : Events)
    {
        if (E.bIsActive) Result.Add(E);
    }
    return Result;
}

bool UOGameLiveEventManager::GetNextScheduledEvent(FLiveEvent& OutEvent) const
{
    FDateTime Now = FDateTime::UtcNow();
    FDateTime Best = FDateTime::MaxValue();
    bool Found = false;

    for (const FLiveEvent& E : Events)
    {
        if (!E.bIsActive && E.StartTime > Now && E.StartTime < Best)
        {
            Best     = E.StartTime;
            OutEvent = E;
            Found    = true;
        }
    }
    return Found;
}

bool UOGameLiveEventManager::JoinEvent(const FString& EventId, const FString& PlayerId)
{
    for (FLiveEvent& Event : Events)
    {
        if (Event.EventId == EventId && Event.bIsActive)
        {
            Event.ParticipantPlayerIds.AddUnique(PlayerId);
            return true;
        }
    }
    return false;
}

bool UOGameLiveEventManager::IsPlayerParticipating(const FString& EventId,
                                                    const FString& PlayerId) const
{
    for (const FLiveEvent& Event : Events)
    {
        if (Event.EventId == EventId)
        {
            return Event.ParticipantPlayerIds.Contains(PlayerId);
        }
    }
    return false;
}

FString UOGameLiveEventManager::GetEventStatusText() const
{
    FString Text;
    Text += TEXT("=== Live Events ===\n");

    TArray<FLiveEvent> Active = GetActiveEvents();
    if (Active.IsEmpty())
    {
        Text += TEXT("  No active events.\n");
    }
    else
    {
        for (const FLiveEvent& E : Active)
        {
            FTimespan Remaining = E.EndTime - FDateTime::UtcNow();
            Text += FString::Printf(TEXT("  [ACTIVE] %s  ETA: %.1fh  Prod:x%.1f  Speed:x%.1f\n"),
                                    *E.Name, Remaining.GetTotalHours(),
                                    E.ProductionMultiplier, E.SpeedMultiplier);
        }
    }

    FLiveEvent Next;
    if (GetNextScheduledEvent(Next))
    {
        FTimespan Until = Next.StartTime - FDateTime::UtcNow();
        Text += FString::Printf(TEXT("  [NEXT]   %s  Starts in: %.1fh\n"),
                                *Next.Name, Until.GetTotalHours());
    }

    Text += FString::Printf(TEXT("  Global Prod: x%.2f  Global Speed: x%.2f\n"),
                            GetCurrentProductionMultiplier(), GetCurrentSpeedMultiplier());
    return Text;
}

FLiveEvent UOGameLiveEventManager::BuildEventDefinition(ELiveEventType Type,
                                                          FDateTime Start,
                                                          FTimespan Duration) const
{
    FLiveEvent E;
    E.EventId     = FString::Printf(TEXT("event_%d_%lld"), static_cast<int32>(Type), Start.GetTicks());
    E.Name        = EventTypeName(Type);
    E.Description = EventTypeDescription(Type);
    E.Type        = Type;
    E.StartTime   = Start;
    E.EndTime     = Start + Duration;

    switch (Type)
    {
        case ELiveEventType::ResourceStorm:
            E.ProductionMultiplier = 2.0f;
            E.SpeedMultiplier      = 1.0f;
            E.CombatMultiplier     = 1.0f;
            break;
        case ELiveEventType::AsteroidField:
            E.ProductionMultiplier = 1.5f;
            E.SpeedMultiplier      = 1.0f;
            E.CombatMultiplier     = 1.0f;
            break;
        case ELiveEventType::AlienInvasion:
            E.ProductionMultiplier = 0.75f;
            E.SpeedMultiplier      = 1.5f;
            E.CombatMultiplier     = 1.5f;
            break;
        case ELiveEventType::TechSurge:
            E.ProductionMultiplier = 1.0f;
            E.SpeedMultiplier      = 1.0f;
            E.CombatMultiplier     = 1.0f;
            break;
        case ELiveEventType::EconomyBoom:
            E.ProductionMultiplier = 3.0f;
            E.SpeedMultiplier      = 1.0f;
            E.CombatMultiplier     = 1.0f;
            break;
        case ELiveEventType::PirateRaids:
            E.ProductionMultiplier = 1.0f;
            E.SpeedMultiplier      = 2.0f;
            E.CombatMultiplier     = 2.0f;
            break;
        case ELiveEventType::CosmicStorm:
            E.ProductionMultiplier = 0.5f;
            E.SpeedMultiplier      = 0.5f;
            E.CombatMultiplier     = 1.0f;
            break;
        case ELiveEventType::GalacticTournament:
            E.ProductionMultiplier = 1.0f;
            E.SpeedMultiplier      = 1.5f;
            E.CombatMultiplier     = 2.0f;
            break;
        default:
            E.ProductionMultiplier = 1.0f;
            E.SpeedMultiplier      = 1.0f;
            E.CombatMultiplier     = 1.0f;
            break;
    }
    return E;
}

FString UOGameLiveEventManager::EventTypeName(ELiveEventType Type) const
{
    switch (Type)
    {
        case ELiveEventType::ResourceStorm:       return TEXT("Resource Storm");
        case ELiveEventType::AsteroidField:       return TEXT("Asteroid Field");
        case ELiveEventType::AlienInvasion:       return TEXT("Alien Invasion");
        case ELiveEventType::TechSurge:           return TEXT("Tech Surge");
        case ELiveEventType::EconomyBoom:         return TEXT("Economy Boom");
        case ELiveEventType::PirateRaids:         return TEXT("Pirate Raids");
        case ELiveEventType::CosmicStorm:         return TEXT("Cosmic Storm");
        case ELiveEventType::GalacticTournament:  return TEXT("Galactic Tournament");
        default: return TEXT("Unknown Event");
    }
}

FString UOGameLiveEventManager::EventTypeDescription(ELiveEventType Type) const
{
    switch (Type)
    {
        case ELiveEventType::ResourceStorm:
            return TEXT("A cloud of mineral-rich asteroids passes through the galaxy. All mines produce twice as much!");
        case ELiveEventType::AsteroidField:
            return TEXT("Asteroid fields yield bonus resources. Mine production increased by 50%.");
        case ELiveEventType::AlienInvasion:
            return TEXT("Alien fleets are attacking! Fleet speed +50%, combat power +50%, but production -25%.");
        case ELiveEventType::TechSurge:
            return TEXT("A burst of technological inspiration sweeps the universe. All research costs halved!");
        case ELiveEventType::EconomyBoom:
            return TEXT("A galactic economic boom! All resource production tripled for 24 hours.");
        case ELiveEventType::PirateRaids:
            return TEXT("Pirate fleets are active in all sectors. Combat power doubled, fleet speed doubled!");
        case ELiveEventType::CosmicStorm:
            return TEXT("A cosmic storm disrupts operations. Production -50%, fleet speed -50%.");
        case ELiveEventType::GalacticTournament:
            return TEXT("A galactic tournament is underway! Special rankings and double combat points.");
        default:
            return TEXT("A special universe event is occurring.");
    }
}
