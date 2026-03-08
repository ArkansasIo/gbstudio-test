// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameTypes.h - Core data types, enums, and structs shared across the entire OGame MMORPG system.

#pragma once

#include "CoreMinimal.h"
#include "OGameTypes.generated.h"

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class EResourceType : uint8
{
    Metal       UMETA(DisplayName = "Metal"),
    Crystal     UMETA(DisplayName = "Crystal"),
    Deuterium   UMETA(DisplayName = "Deuterium"),
    Energy      UMETA(DisplayName = "Energy"),
    DarkMatter  UMETA(DisplayName = "Dark Matter"),
};

UENUM(BlueprintType)
enum class EBuildingType : uint8
{
    MetalMine               UMETA(DisplayName = "Metal Mine"),
    CrystalMine             UMETA(DisplayName = "Crystal Mine"),
    DeuteriumSynthesizer    UMETA(DisplayName = "Deuterium Synthesizer"),
    SolarPowerPlant         UMETA(DisplayName = "Solar Power Plant"),
    FusionReactor           UMETA(DisplayName = "Fusion Reactor"),
    SolarSatellite          UMETA(DisplayName = "Solar Satellite"),
    MetalStorage            UMETA(DisplayName = "Metal Storage"),
    CrystalStorage          UMETA(DisplayName = "Crystal Storage"),
    DeuteriumTank           UMETA(DisplayName = "Deuterium Tank"),
    RoboticsFactory         UMETA(DisplayName = "Robotics Factory"),
    Shipyard                UMETA(DisplayName = "Shipyard"),
    ResearchLab             UMETA(DisplayName = "Research Lab"),
    AllianceDepot           UMETA(DisplayName = "Alliance Depot"),
    MissileSilo             UMETA(DisplayName = "Missile Silo"),
    NaniteFactory           UMETA(DisplayName = "Nanite Factory"),
    Terraformer             UMETA(DisplayName = "Terraformer"),
    SpaceDock               UMETA(DisplayName = "Space Dock"),
    LunarBase               UMETA(DisplayName = "Lunar Base"),
    SensorPhalanx           UMETA(DisplayName = "Sensor Phalanx"),
    JumpGate                UMETA(DisplayName = "Jump Gate"),
};

UENUM(BlueprintType)
enum class EResearchType : uint8
{
    EspionageTechnology         UMETA(DisplayName = "Espionage Technology"),
    ComputerTechnology          UMETA(DisplayName = "Computer Technology"),
    WeaponsTechnology           UMETA(DisplayName = "Weapons Technology"),
    ShieldingTechnology         UMETA(DisplayName = "Shielding Technology"),
    ArmourTechnology            UMETA(DisplayName = "Armour Technology"),
    EnergyTechnology            UMETA(DisplayName = "Energy Technology"),
    HyperspaceTechnology        UMETA(DisplayName = "Hyperspace Technology"),
    CombustionDrive             UMETA(DisplayName = "Combustion Drive"),
    ImpulseDrive                UMETA(DisplayName = "Impulse Drive"),
    HyperspaceDrive             UMETA(DisplayName = "Hyperspace Drive"),
    LaserTechnology             UMETA(DisplayName = "Laser Technology"),
    IonTechnology               UMETA(DisplayName = "Ion Technology"),
    PlasmaTechnology            UMETA(DisplayName = "Plasma Technology"),
    IntergalacticResearchNetwork UMETA(DisplayName = "Intergalactic Research Network"),
    Astrophysics                UMETA(DisplayName = "Astrophysics"),
    GravitonTechnology          UMETA(DisplayName = "Graviton Technology"),
};

UENUM(BlueprintType)
enum class EShipType : uint8
{
    SmallCargo          UMETA(DisplayName = "Small Cargo Ship"),
    LargeCargo          UMETA(DisplayName = "Large Cargo Ship"),
    LightFighter        UMETA(DisplayName = "Light Fighter"),
    HeavyFighter        UMETA(DisplayName = "Heavy Fighter"),
    Cruiser             UMETA(DisplayName = "Cruiser"),
    Battleship          UMETA(DisplayName = "Battleship"),
    ColonyShip          UMETA(DisplayName = "Colony Ship"),
    Recycler            UMETA(DisplayName = "Recycler"),
    EspionageProbe      UMETA(DisplayName = "Espionage Probe"),
    Bomber              UMETA(DisplayName = "Bomber"),
    SolarSatelliteShip  UMETA(DisplayName = "Solar Satellite"),
    Destroyer           UMETA(DisplayName = "Destroyer"),
    DeathStar           UMETA(DisplayName = "Death Star"),
    Battlecruiser       UMETA(DisplayName = "Battlecruiser"),
    Crawler             UMETA(DisplayName = "Crawler"),
    Reaper              UMETA(DisplayName = "Reaper"),
    Pathfinder          UMETA(DisplayName = "Pathfinder"),
};

UENUM(BlueprintType)
enum class EDefenseType : uint8
{
    RocketLauncher          UMETA(DisplayName = "Rocket Launcher"),
    LightLaser              UMETA(DisplayName = "Light Laser"),
    HeavyLaser              UMETA(DisplayName = "Heavy Laser"),
    GaussCannon             UMETA(DisplayName = "Gauss Cannon"),
    IonCannon               UMETA(DisplayName = "Ion Cannon"),
    PlasmaTurret            UMETA(DisplayName = "Plasma Turret"),
    SmallShieldDome         UMETA(DisplayName = "Small Shield Dome"),
    LargeShieldDome         UMETA(DisplayName = "Large Shield Dome"),
    AntiBallisticMissile    UMETA(DisplayName = "Anti-Ballistic Missile"),
    InterplanetaryMissile   UMETA(DisplayName = "Interplanetary Missile"),
};

UENUM(BlueprintType)
enum class EFleetMission : uint8
{
    Attack          UMETA(DisplayName = "Attack"),
    Transport       UMETA(DisplayName = "Transport"),
    Deploy          UMETA(DisplayName = "Deploy"),
    Espionage       UMETA(DisplayName = "Espionage"),
    Colonize        UMETA(DisplayName = "Colonize"),
    Recycle         UMETA(DisplayName = "Recycle"),
    Destroy         UMETA(DisplayName = "Destroy Moon"),
    Expedition      UMETA(DisplayName = "Expedition"),
    Return          UMETA(DisplayName = "Return"),
    ACSDefend       UMETA(DisplayName = "ACS Defend"),
    ACSAttack       UMETA(DisplayName = "ACS Attack"),
    HarvardDebris   UMETA(DisplayName = "Harvest Debris"),
};

UENUM(BlueprintType)
enum class EPlanetType : uint8
{
    Planet  UMETA(DisplayName = "Planet"),
    Moon    UMETA(DisplayName = "Moon"),
    Debris  UMETA(DisplayName = "Debris Field"),
};

UENUM(BlueprintType)
enum class ECombatOutcome : uint8
{
    AttackerWins    UMETA(DisplayName = "Attacker Wins"),
    DefenderWins    UMETA(DisplayName = "Defender Wins"),
    Draw            UMETA(DisplayName = "Draw"),
    InProgress      UMETA(DisplayName = "In Progress"),
};

UENUM(BlueprintType)
enum class EPlayerStatus : uint8
{
    Active          UMETA(DisplayName = "Active"),
    Inactive        UMETA(DisplayName = "Inactive"),
    Vacation        UMETA(DisplayName = "Vacation Mode"),
    Beginner        UMETA(DisplayName = "Beginner Protection"),
    Banned          UMETA(DisplayName = "Banned"),
    Admin           UMETA(DisplayName = "Admin"),
};

UENUM(BlueprintType)
enum class EAllianceRole : uint8
{
    Leader      UMETA(DisplayName = "Leader"),
    Deputy      UMETA(DisplayName = "Deputy"),
    Member      UMETA(DisplayName = "Member"),
    Recruit     UMETA(DisplayName = "Recruit"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Core Data Structs
// ─────────────────────────────────────────────────────────────────────────────

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FResources
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    double Metal = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    double Crystal = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    double Deuterium = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Resources")
    double Energy = 0.0;

    FResources() = default;
    FResources(double InMetal, double InCrystal, double InDeuterium, double InEnergy = 0.0)
        : Metal(InMetal), Crystal(InCrystal), Deuterium(InDeuterium), Energy(InEnergy) {}

    FResources operator+(const FResources& Other) const
    {
        return FResources(Metal + Other.Metal, Crystal + Other.Crystal,
                          Deuterium + Other.Deuterium, Energy + Other.Energy);
    }

    FResources operator-(const FResources& Other) const
    {
        return FResources(Metal - Other.Metal, Crystal - Other.Crystal,
                          Deuterium - Other.Deuterium, Energy - Other.Energy);
    }

    FResources operator*(double Scalar) const
    {
        return FResources(Metal * Scalar, Crystal * Scalar, Deuterium * Scalar, Energy * Scalar);
    }

    bool HasEnough(const FResources& Cost) const
    {
        return Metal >= Cost.Metal && Crystal >= Cost.Crystal && Deuterium >= Cost.Deuterium;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FCoordinates
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Coordinates")
    int32 Galaxy = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Coordinates")
    int32 System = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Coordinates")
    int32 Position = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Coordinates")
    EPlanetType Type = EPlanetType::Planet;

    FCoordinates() = default;
    FCoordinates(int32 InGalaxy, int32 InSystem, int32 InPosition, EPlanetType InType = EPlanetType::Planet)
        : Galaxy(InGalaxy), System(InSystem), Position(InPosition), Type(InType) {}

    FString ToString() const
    {
        return FString::Printf(TEXT("[%d:%d:%d]"), Galaxy, System, Position);
    }

    bool operator==(const FCoordinates& Other) const
    {
        return Galaxy == Other.Galaxy && System == Other.System &&
               Position == Other.Position && Type == Other.Type;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FBuildingLevel
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Building")
    EBuildingType Type = EBuildingType::MetalMine;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Building")
    int32 Level = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Building")
    bool bIsUnderConstruction = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Building")
    FDateTime ConstructionFinishTime;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FResearchLevel
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Research")
    EResearchType Type = EResearchType::EspionageTechnology;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Research")
    int32 Level = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Research")
    bool bIsBeingResearched = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Research")
    FDateTime ResearchFinishTime;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FShipCount
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    EShipType Type = EShipType::LightFighter;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    int64 Count = 0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FFleetComposition
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Fleet")
    TMap<EShipType, int64> Ships;

    int64 GetTotalShips() const
    {
        int64 Total = 0;
        for (const auto& Pair : Ships)
        {
            Total += Pair.Value;
        }
        return Total;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FDefenseCount
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Defense")
    EDefenseType Type = EDefenseType::RocketLauncher;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Defense")
    int64 Count = 0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FCombatUnit
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    double Shield = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    double Hull = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    double Attack = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    int64 Count = 0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FCombatReport
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FString AttackerName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FString DefenderName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FCoordinates Location;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    TArray<FString> RoundLogs;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    ECombatOutcome Outcome = ECombatOutcome::Draw;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FResources LootedResources;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FResources AttackerLosses;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FResources DefenderLosses;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FResources DebrisField;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    double AttackerHonorPoints = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    double DefenderHonorPoints = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
    FDateTime CombatTime;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FPlayerScore
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int64 TotalPoints = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int64 BuildingPoints = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int64 ResearchPoints = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int64 FleetPoints = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int64 DefensePoints = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    int32 Rank = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Score")
    double HonorPoints = 0.0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FGameMessage
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FString MessageId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FString From;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FString To;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FString Subject;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FString Body;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    FDateTime Timestamp;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Message")
    bool bIsRead = false;
};
