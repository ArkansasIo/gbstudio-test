// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Universe/OGameSolarSystem.h"
#include "Universe/OGamePlanet.h"
#include "Math/UnrealMathUtility.h"

UOGameSolarSystem::UOGameSolarSystem()
{
    // Initialize 15 empty planet slots
    Planets.SetNum(MAX_POSITIONS + 1); // index 0 unused; 1-15 active
    for (int32 i = 0; i <= MAX_POSITIONS; ++i)
    {
        Planets[i] = nullptr;
    }
}

UOGamePlanet* UOGameSolarSystem::GetPlanetAtPosition(int32 Position) const
{
    if (!Planets.IsValidIndex(Position))
    {
        return nullptr;
    }
    return Planets[Position];
}

UOGamePlanet* UOGameSolarSystem::CreatePlanetAtPosition(int32 Position,
                                                          const FString& OwnerPlayerId,
                                                          const FString& PlanetName)
{
    if (Position < 1 || Position > MAX_POSITIONS || !IsPositionFree(Position))
    {
        return nullptr;
    }

    UOGamePlanet* NewPlanet = NewObject<UOGamePlanet>(this);
    NewPlanet->PlanetId     = FString::Printf(TEXT("%d_%d_%d"), GalaxyIndex, SystemIndex, Position);
    NewPlanet->PlanetName   = PlanetName.IsEmpty()
                                  ? FString::Printf(TEXT("Planet %s [%d:%d:%d]"),
                                                    *OwnerPlayerId, GalaxyIndex, SystemIndex, Position)
                                  : PlanetName;
    NewPlanet->OwnerPlayerId = OwnerPlayerId;
    NewPlanet->Coordinates   = FCoordinates(GalaxyIndex, SystemIndex, Position);

    // Size based on orbital position (inner = smaller, middle = largest)
    int32 MiddlePos    = MAX_POSITIONS / 2 + 1;
    int32 DistCenter   = FMath::Abs(Position - MiddlePos);
    NewPlanet->MaxFields    = FMath::RandRange(96 - DistCenter * 4, 230 - DistCenter * 6);
    NewPlanet->MaxFields    = FMath::Max(40, NewPlanet->MaxFields);
    NewPlanet->Diameter     = NewPlanet->MaxFields * 100;

    // Temperature based on position (inner = hotter)
    int32 BaseTemp               = 130 - (Position * 17);
    NewPlanet->MaxTemperature    = BaseTemp + FMath::RandRange(-10, 10);
    NewPlanet->MinTemperature    = NewPlanet->MaxTemperature - FMath::RandRange(30, 50);

    NewPlanet->RecalculateStorageCapacity();
    Planets[Position] = NewPlanet;

    UE_LOG(LogTemp, Log, TEXT("Created planet at [%d:%d:%d] for player %s, fields=%d"),
           GalaxyIndex, SystemIndex, Position, *OwnerPlayerId, NewPlanet->MaxFields);
    return NewPlanet;
}

bool UOGameSolarSystem::IsPositionFree(int32 Position) const
{
    if (!Planets.IsValidIndex(Position))
    {
        return false;
    }
    return Planets[Position] == nullptr;
}

int32 UOGameSolarSystem::GetFirstFreePosition() const
{
    for (int32 i = 1; i <= MAX_POSITIONS; ++i)
    {
        if (IsPositionFree(i))
        {
            return i;
        }
    }
    return -1;
}

FString UOGameSolarSystem::GetSystemText() const
{
    FString Text = FString::Printf(TEXT("=== Solar System [%d:%d] (%s) ===\n"),
                                   GalaxyIndex, SystemIndex, *StarName);
    for (int32 i = 1; i <= MAX_POSITIONS; ++i)
    {
        if (Planets.IsValidIndex(i) && Planets[i])
        {
            const UOGamePlanet* P = Planets[i];
            Text += FString::Printf(TEXT("  [%d] %s (Owner: %s, Fields: %d/%d)\n"),
                                    i, *P->PlanetName, *P->OwnerPlayerId,
                                    P->UsedFields, P->MaxFields);
        }
        else
        {
            Text += FString::Printf(TEXT("  [%d] (empty)\n"), i);
        }
    }
    return Text;
}
