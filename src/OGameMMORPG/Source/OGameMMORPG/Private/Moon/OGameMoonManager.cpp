// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Moon/OGameMoonManager.h"
#include "Math/UnrealMathUtility.h"

UOGameMoonManager::UOGameMoonManager()
{
}

bool UOGameMoonManager::TryCreateMoon(const FString& OwnerPlayerId,
                                       const FCoordinates& PlanetCoords,
                                       const FResources& DestroyedShipValue,
                                       FMoonInfo& OutMoon)
{
    // Check no moon already at this location
    for (const FMoonInfo& M : Moons)
    {
        if (M.Coordinates.Galaxy   == PlanetCoords.Galaxy   &&
            M.Coordinates.System   == PlanetCoords.System   &&
            M.Coordinates.Position == PlanetCoords.Position)
        {
            return false; // Moon already exists
        }
    }

    double TotalValue = DestroyedShipValue.Metal + DestroyedShipValue.Crystal;
    float  Chance     = FMath::Clamp(static_cast<float>(TotalValue / 100000.0), 0.0f, 20.0f);

    if (FMath::FRandRange(0.0f, 100.0f) > Chance)
    {
        return false;
    }

    FString MoonId = CreateMoonDirect(OwnerPlayerId, PlanetCoords,
                                      CalculateMoonDiameter(static_cast<double>(Chance)));
    return GetMoon(MoonId, OutMoon);
}

FString UOGameMoonManager::CreateMoonDirect(const FString& OwnerPlayerId,
                                              const FCoordinates& PlanetCoords,
                                              int32 Diameter)
{
    FMoonInfo Moon;
    Moon.MoonId         = FString::Printf(TEXT("moon_%d_%d_%d_%lld"),
                                          PlanetCoords.Galaxy, PlanetCoords.System,
                                          PlanetCoords.Position, FDateTime::UtcNow().GetTicks());
    Moon.OwnerPlayerId  = OwnerPlayerId;
    Moon.ParentPlanetId = FString::Printf(TEXT("planet_%d_%d_%d"),
                                          PlanetCoords.Galaxy, PlanetCoords.System,
                                          PlanetCoords.Position);
    Moon.Coordinates    = FCoordinates(PlanetCoords.Galaxy, PlanetCoords.System,
                                       PlanetCoords.Position, EPlanetType::Moon);
    Moon.Diameter       = Diameter;
    Moon.MaxFields      = CalculateMoonFields(Diameter);

    Moons.Add(Moon);
    OnMoonCreated.Broadcast(OwnerPlayerId, Moon);

    UE_LOG(LogTemp, Log, TEXT("Moon created at %s for player %s. Diameter: %d km, Fields: %d"),
           *PlanetCoords.ToString(), *OwnerPlayerId, Diameter, Moon.MaxFields);

    return Moon.MoonId;
}

bool UOGameMoonManager::UseSensorPhalanx(const FString& ScannerPlayerId,
                                           const FString& MoonId,
                                           const FCoordinates& TargetSystem,
                                           double& OutDeuteriumCost,
                                           TArray<FString>& OutDetectedFleetIds)
{
    FMoonInfo Moon;
    if (!GetMoon(MoonId, Moon)) return false;

    if (Moon.OwnerPlayerId != ScannerPlayerId) return false;
    if (Moon.SensorPhalanxLevel <= 0) return false;

    int32 Range = GetPhalanxRange(Moon.SensorPhalanxLevel);

    // Check range (same galaxy, system distance)
    if (TargetSystem.Galaxy != Moon.Coordinates.Galaxy) return false;

    int32 Distance = FMath::Abs(TargetSystem.System - Moon.Coordinates.System);
    if (Distance > Range) return false;

    OutDeuteriumCost = 5000.0;

    // Detected fleet IDs would be looked up from the UniverseManager in a full integration
    // Here we return a placeholder result indicator
    OutDetectedFleetIds.Add(FString::Printf(TEXT("phalanx_scan_%s_%d_%d"),
                                            *TargetSystem.ToString(), Distance, Range));

    UE_LOG(LogTemp, Log, TEXT("Phalanx scan: %s scanned system %s from moon %s"),
           *ScannerPlayerId, *TargetSystem.ToString(), *MoonId);
    return true;
}

int32 UOGameMoonManager::GetPhalanxRange(int32 PhalanxLevel)
{
    return PhalanxLevel * PhalanxLevel;
}

bool UOGameMoonManager::UseJumpGate(const FString& SourceMoonId,
                                     const FString& TargetMoonId,
                                     const FString& PlayerId,
                                     const FFleetComposition& Fleet,
                                     double& OutDeuteriumCost)
{
    FMoonInfo* Source = nullptr;
    FMoonInfo* Target = nullptr;

    for (FMoonInfo& M : Moons)
    {
        if (M.MoonId == SourceMoonId) Source = &M;
        if (M.MoonId == TargetMoonId) Target = &M;
    }

    if (!Source || !Target) return false;
    if (Source->OwnerPlayerId != PlayerId) return false;
    if (!Source->HasJumpGate() || !Target->HasJumpGate()) return false;
    if (!Source->CanUseJumpGate()) return false;

    OutDeuteriumCost = CalculateJumpGateCost(Fleet);
    Source->JumpGateLastUsed = FDateTime::UtcNow();

    UE_LOG(LogTemp, Log, TEXT("Jump Gate used: %s -> %s by %s, cost: %.0f deuterium"),
           *SourceMoonId, *TargetMoonId, *PlayerId, OutDeuteriumCost);
    return true;
}

double UOGameMoonManager::CalculateJumpGateCost(const FFleetComposition& Fleet)
{
    int64 TotalShips = Fleet.GetTotalShips();
    return FMath::Max(1.0, static_cast<double>(TotalShips) * 5.0);
}

bool UOGameMoonManager::GetMoon(const FString& MoonId, FMoonInfo& OutMoon) const
{
    for (const FMoonInfo& M : Moons)
    {
        if (M.MoonId == MoonId) { OutMoon = M; return true; }
    }
    return false;
}

bool UOGameMoonManager::GetMoonAtCoords(const FCoordinates& Coords, FMoonInfo& OutMoon) const
{
    for (const FMoonInfo& M : Moons)
    {
        if (M.Coordinates.Galaxy   == Coords.Galaxy   &&
            M.Coordinates.System   == Coords.System   &&
            M.Coordinates.Position == Coords.Position)
        {
            OutMoon = M;
            return true;
        }
    }
    return false;
}

TArray<FMoonInfo> UOGameMoonManager::GetMoonsByPlayer(const FString& PlayerId) const
{
    TArray<FMoonInfo> Result;
    for (const FMoonInfo& M : Moons)
    {
        if (M.OwnerPlayerId == PlayerId) Result.Add(M);
    }
    return Result;
}

bool UOGameMoonManager::UpgradeLunarBase(const FString& MoonId, const FString& PlayerId,
                                          FResources& Resources)
{
    for (FMoonInfo& M : Moons)
    {
        if (M.MoonId != MoonId || M.OwnerPlayerId != PlayerId) continue;
        FResources Cost = GetLunarBaseCost(M.LunarBaseLevel + 1);
        if (!Resources.HasEnough(Cost)) return false;
        Resources = Resources - Cost;
        ++M.LunarBaseLevel;
        return true;
    }
    return false;
}

bool UOGameMoonManager::UpgradeSensorPhalanx(const FString& MoonId, const FString& PlayerId,
                                               FResources& Resources)
{
    for (FMoonInfo& M : Moons)
    {
        if (M.MoonId != MoonId || M.OwnerPlayerId != PlayerId) continue;
        FResources Cost = GetPhalanxCost(M.SensorPhalanxLevel + 1);
        if (!Resources.HasEnough(Cost)) return false;
        Resources = Resources - Cost;
        ++M.SensorPhalanxLevel;
        return true;
    }
    return false;
}

bool UOGameMoonManager::UpgradeJumpGate(const FString& MoonId, const FString& PlayerId,
                                         FResources& Resources)
{
    for (FMoonInfo& M : Moons)
    {
        if (M.MoonId != MoonId || M.OwnerPlayerId != PlayerId) continue;
        FResources Cost = GetJumpGateCost(M.JumpGateLevel + 1);
        if (!Resources.HasEnough(Cost)) return false;
        Resources = Resources - Cost;
        ++M.JumpGateLevel;
        return true;
    }
    return false;
}

bool UOGameMoonManager::TryDestroyMoon(const FString& MoonId, int32 DeathStarCount,
                                        float& OutDestructionChance,
                                        float& OutFleetLossChance)
{
    FMoonInfo Moon;
    if (!GetMoon(MoonId, Moon)) return false;

    // OGame formula: chance = (100 - diameter/1000) * sqrt(deathstars) / 100
    float DiamFactor = (100.0f - Moon.Diameter / 1000.0f) / 100.0f;
    OutDestructionChance = FMath::Clamp(DiamFactor * FMath::Sqrt(static_cast<float>(DeathStarCount)), 0.0f, 20.0f);
    OutFleetLossChance   = FMath::Clamp(OutDestructionChance * 1.5f, 0.0f, 30.0f);

    bool bDestroyed = FMath::FRandRange(0.0f, 100.0f) < OutDestructionChance;
    if (bDestroyed)
    {
        FCoordinates Loc = Moon.Coordinates;
        FString Owner    = Moon.OwnerPlayerId;
        Moons.RemoveAll([&](const FMoonInfo& M) { return M.MoonId == MoonId; });
        OnMoonDestroyed.Broadcast(Owner, Loc);
        UE_LOG(LogTemp, Log, TEXT("Moon at %s destroyed!"), *Loc.ToString());
    }
    return bDestroyed;
}

FString UOGameMoonManager::GetMoonInfoText(const FString& MoonId) const
{
    FMoonInfo Moon;
    if (!GetMoon(MoonId, Moon)) return TEXT("Moon not found.");

    FString Text;
    Text += FString::Printf(TEXT("=== Moon at %s ===\n"), *Moon.Coordinates.ToString());
    Text += FString::Printf(TEXT("  Owner:           %s\n"), *Moon.OwnerPlayerId);
    Text += FString::Printf(TEXT("  Diameter:        %d km   Fields: %d\n"),
                            Moon.Diameter, Moon.MaxFields);
    Text += FString::Printf(TEXT("  Lunar Base:      Level %d\n"), Moon.LunarBaseLevel);
    Text += FString::Printf(TEXT("  Sensor Phalanx:  Level %d  (Range: %d systems)\n"),
                            Moon.SensorPhalanxLevel,
                            Moon.SensorPhalanxLevel > 0 ? GetPhalanxRange(Moon.SensorPhalanxLevel) : 0);
    Text += FString::Printf(TEXT("  Jump Gate:       Level %d  %s\n"),
                            Moon.JumpGateLevel,
                            Moon.CanUseJumpGate() ? TEXT("[READY]") : TEXT("[COOLDOWN]"));
    Text += FString::Printf(TEXT("  Resources:       M:%.0f  C:%.0f  D:%.0f\n"),
                            Moon.StoredResources.Metal, Moon.StoredResources.Crystal,
                            Moon.StoredResources.Deuterium);
    return Text;
}

int32 UOGameMoonManager::CalculateMoonDiameter(double ChancePercent) const
{
    // Diameter range 3000 to 8999 km based on chance
    return static_cast<int32>(3000.0 + ChancePercent * 300.0);
}

int32 UOGameMoonManager::CalculateMoonFields(int32 Diameter) const
{
    // 1 field per ~500 km diameter, plus Lunar Base adds fields
    return FMath::Max(1, Diameter / 500);
}

FResources UOGameMoonManager::GetLunarBaseCost(int32 Level) const
{
    double Factor = FMath::Pow(2.0, Level - 1);
    return FResources(20000 * Factor, 40000 * Factor, 20000 * Factor);
}

FResources UOGameMoonManager::GetPhalanxCost(int32 Level) const
{
    double Factor = FMath::Pow(2.0, Level - 1);
    return FResources(20000 * Factor, 40000 * Factor, 0);
}

FResources UOGameMoonManager::GetJumpGateCost(int32 Level) const
{
    double Factor = FMath::Pow(2.0, Level - 1);
    return FResources(2000000 * Factor, 4000000 * Factor, 2000000 * Factor);
}
