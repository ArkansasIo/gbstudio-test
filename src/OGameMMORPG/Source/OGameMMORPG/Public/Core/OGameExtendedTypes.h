// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameExtendedTypes.h - Additional enums and structs for new game systems.

#pragma once

#include "CoreMinimal.h"
#include "Core/OGameTypes.h"
#include "OGameExtendedTypes.generated.h"

// ─────────────────────────────────────────────────────────────────────────────
// Trading System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class ETradeOfferState : uint8
{
    Open        UMETA(DisplayName = "Open"),
    Fulfilled   UMETA(DisplayName = "Fulfilled"),
    Cancelled   UMETA(DisplayName = "Cancelled"),
    Expired     UMETA(DisplayName = "Expired"),
};

UENUM(BlueprintType)
enum class ETradeOfferType : uint8
{
    Sell    UMETA(DisplayName = "Sell"),
    Buy     UMETA(DisplayName = "Buy"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Achievement System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class EAchievementCategory : uint8
{
    Economy     UMETA(DisplayName = "Economy"),
    Military    UMETA(DisplayName = "Military"),
    Research    UMETA(DisplayName = "Research"),
    Diplomacy   UMETA(DisplayName = "Diplomacy"),
    Exploration UMETA(DisplayName = "Exploration"),
    Social      UMETA(DisplayName = "Social"),
    Prestige    UMETA(DisplayName = "Prestige"),
};

UENUM(BlueprintType)
enum class EAchievementTier : uint8
{
    Bronze  UMETA(DisplayName = "Bronze"),
    Silver  UMETA(DisplayName = "Silver"),
    Gold    UMETA(DisplayName = "Gold"),
    Diamond UMETA(DisplayName = "Diamond"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Live Event Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class ELiveEventType : uint8
{
    ResourceStorm       UMETA(DisplayName = "Resource Storm"),
    AsteroidField       UMETA(DisplayName = "Asteroid Field"),
    AlienInvasion       UMETA(DisplayName = "Alien Invasion"),
    TechSurge           UMETA(DisplayName = "Tech Surge"),
    EconomyBoom         UMETA(DisplayName = "Economy Boom"),
    PirateRaids         UMETA(DisplayName = "Pirate Raids"),
    CosmicStorm         UMETA(DisplayName = "Cosmic Storm"),
    GalacticTournament  UMETA(DisplayName = "Galactic Tournament"),
};

UENUM(BlueprintType)
enum class EExpeditionResult : uint8
{
    ResourceFind        UMETA(DisplayName = "Resource Find"),
    FleetFind           UMETA(DisplayName = "Fleet Find"),
    DarkMatterFind      UMETA(DisplayName = "Dark Matter Find"),
    BlackHole           UMETA(DisplayName = "Black Hole"),
    PirateAttack        UMETA(DisplayName = "Pirate Attack"),
    AlienEncounter      UMETA(DisplayName = "Alien Encounter"),
    AncientRuins        UMETA(DisplayName = "Ancient Ruins"),
    Nothing             UMETA(DisplayName = "Nothing Found"),
    EarlyReturn         UMETA(DisplayName = "Early Return"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Notification Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class ENotificationType : uint8
{
    FleetArrival        UMETA(DisplayName = "Fleet Arrival"),
    FleetAttack         UMETA(DisplayName = "Incoming Attack"),
    BuildingComplete    UMETA(DisplayName = "Building Complete"),
    ResearchComplete    UMETA(DisplayName = "Research Complete"),
    ShipyardComplete    UMETA(DisplayName = "Shipyard Complete"),
    EspionageReport     UMETA(DisplayName = "Espionage Report"),
    CombatReport        UMETA(DisplayName = "Combat Report"),
    TradeComplete       UMETA(DisplayName = "Trade Complete"),
    MessageReceived     UMETA(DisplayName = "Message Received"),
    AchievementUnlocked UMETA(DisplayName = "Achievement Unlocked"),
    QuestComplete       UMETA(DisplayName = "Quest Complete"),
    LiveEventStart      UMETA(DisplayName = "Live Event Started"),
    ACSInvite           UMETA(DisplayName = "ACS Invite"),
    MoonCreated         UMETA(DisplayName = "Moon Created"),
    MoonDestroyed       UMETA(DisplayName = "Moon Destroyed"),
    SystemAlert         UMETA(DisplayName = "System Alert"),
};

UENUM(BlueprintType)
enum class ENotificationPriority : uint8
{
    Low     UMETA(DisplayName = "Low"),
    Normal  UMETA(DisplayName = "Normal"),
    High    UMETA(DisplayName = "High"),
    Critical UMETA(DisplayName = "Critical"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Quest System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class EQuestType : uint8
{
    Daily       UMETA(DisplayName = "Daily"),
    Weekly      UMETA(DisplayName = "Weekly"),
    Monthly     UMETA(DisplayName = "Monthly"),
    Story       UMETA(DisplayName = "Story"),
    Achievement UMETA(DisplayName = "Achievement"),
    Event       UMETA(DisplayName = "Event"),
};

UENUM(BlueprintType)
enum class EQuestObjectiveType : uint8
{
    MineResources       UMETA(DisplayName = "Mine Resources"),
    BuildBuilding       UMETA(DisplayName = "Build Building"),
    CompleteResearch    UMETA(DisplayName = "Complete Research"),
    SendFleet           UMETA(DisplayName = "Send Fleet"),
    WinCombat           UMETA(DisplayName = "Win Combat"),
    DestroyShips        UMETA(DisplayName = "Destroy Ships"),
    BuildShips          UMETA(DisplayName = "Build Ships"),
    ColonizePlanet      UMETA(DisplayName = "Colonize Planet"),
    SpyOnPlayer         UMETA(DisplayName = "Spy On Player"),
    JoinAlliance        UMETA(DisplayName = "Join Alliance"),
    SendMessage         UMETA(DisplayName = "Send Message"),
    RunExpedition       UMETA(DisplayName = "Run Expedition"),
    BuildDefense        UMETA(DisplayName = "Build Defense"),
    ReachScore          UMETA(DisplayName = "Reach Score"),
};

UENUM(BlueprintType)
enum class EQuestStatus : uint8
{
    Available   UMETA(DisplayName = "Available"),
    Active      UMETA(DisplayName = "Active"),
    Completed   UMETA(DisplayName = "Completed"),
    Claimed     UMETA(DisplayName = "Claimed"),
    Expired     UMETA(DisplayName = "Expired"),
    Failed      UMETA(DisplayName = "Failed"),
};

// ─────────────────────────────────────────────────────────────────────────────
// ACS System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class EACSStatus : uint8
{
    Forming     UMETA(DisplayName = "Forming"),
    InTransit   UMETA(DisplayName = "In Transit"),
    Arrived     UMETA(DisplayName = "Arrived"),
    InCombat    UMETA(DisplayName = "In Combat"),
    Returning   UMETA(DisplayName = "Returning"),
    Dissolved   UMETA(DisplayName = "Dissolved"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Honor/PvP System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class EHonorRank : uint8
{
    Recruit             UMETA(DisplayName = "Recruit"),
    Soldier             UMETA(DisplayName = "Soldier"),
    Sergeant            UMETA(DisplayName = "Sergeant"),
    Lieutenant          UMETA(DisplayName = "Lieutenant"),
    Captain             UMETA(DisplayName = "Captain"),
    Major               UMETA(DisplayName = "Major"),
    Colonel             UMETA(DisplayName = "Colonel"),
    GeneralOfTheArmy    UMETA(DisplayName = "General of the Army"),
    HighAdmiral         UMETA(DisplayName = "High Admiral"),
};

// ─────────────────────────────────────────────────────────────────────────────
// Tick System Enums
// ─────────────────────────────────────────────────────────────────────────────

UENUM(BlueprintType)
enum class ETickPriority : uint8
{
    Critical    UMETA(DisplayName = "Critical"),   // Every game-second
    High        UMETA(DisplayName = "High"),        // Every 5 seconds
    Normal      UMETA(DisplayName = "Normal"),      // Every minute
    Low         UMETA(DisplayName = "Low"),         // Every hour
    Background  UMETA(DisplayName = "Background"),  // Every day
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Data Structs
// ─────────────────────────────────────────────────────────────────────────────

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FTradeOffer
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    FString OfferId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    FString SellerPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    ETradeOfferType OfferType = ETradeOfferType::Sell;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    EResourceType OfferedResource = EResourceType::Metal;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    double OfferedAmount = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    EResourceType WantedResource = EResourceType::Crystal;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    double WantedAmount = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    ETradeOfferState State = ETradeOfferState::Open;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    FDateTime CreatedAt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    FDateTime ExpiresAt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Trade")
    FString BuyerPlayerId;

    double GetRatio() const
    {
        return WantedAmount > 0.0 ? OfferedAmount / WantedAmount : 0.0;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FAchievement
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FString AchievementId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    EAchievementCategory Category = EAchievementCategory::Economy;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    EAchievementTier Tier = EAchievementTier::Bronze;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    int32 DarkMatterReward = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FResources ResourceReward;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    double TargetValue = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    bool bRepeatable = false;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FPlayerAchievementProgress
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FString AchievementId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    double CurrentProgress = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    bool bUnlocked = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    bool bRewardClaimed = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Achievement")
    FDateTime UnlockedAt;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FLiveEvent
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FString EventId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FString Name;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    ELiveEventType Type = ELiveEventType::ResourceStorm;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    float ProductionMultiplier = 1.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    float CombatMultiplier = 1.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    float SpeedMultiplier = 1.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FDateTime StartTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    FDateTime EndTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    bool bIsActive = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Event")
    TArray<FString> ParticipantPlayerIds;

    bool IsExpired() const { return FDateTime::UtcNow() > EndTime; }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FExpeditionReport
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FString ExpeditionId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FString OwnerPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FCoordinates Location;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    EExpeditionResult Result = EExpeditionResult::Nothing;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FResources ResourcesFound;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FFleetComposition ShipsFound;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    int32 DarkMatterFound = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FFleetComposition ShipsLost;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FString NarrativeText;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Expedition")
    FDateTime ReturnTime;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FGameNotification
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FString NotificationId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FString TargetPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    ENotificationType Type = ENotificationType::SystemAlert;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    ENotificationPriority Priority = ENotificationPriority::Normal;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FString Title;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FString Body;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FString RelatedId;   // e.g., FleetId, CombatReportId

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    FDateTime CreatedAt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    bool bIsRead = false;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Notification")
    bool bIsDismissed = false;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FQuestObjective
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FString ObjectiveId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    EQuestObjectiveType Type = EQuestObjectiveType::MineResources;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    double TargetAmount = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    double CurrentProgress = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    bool bCompleted = false;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FQuestDefinition
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FString QuestId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FString Title;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FString Description;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    EQuestType QuestType = EQuestType::Daily;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    TArray<FQuestObjective> Objectives;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FResources ResourceReward;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    int32 DarkMatterReward = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    int64 PointsReward = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    EQuestStatus Status = EQuestStatus::Available;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FDateTime AssignedAt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Quest")
    FDateTime ExpiresAt;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FACSGroup
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    FString GroupId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    FString LeaderPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    TArray<FString> MemberPlayerIds;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    TArray<FString> FleetIds;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    FCoordinates TargetCoords;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    EACSStatus Status = EACSStatus::Forming;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    bool bIsAttack = true;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "ACS")
    FDateTime ArrivalTime;

    int32 GetMemberCount() const { return MemberPlayerIds.Num(); }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FHonorRecord
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    FString PlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    double HonorPoints = 0.0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    EHonorRank Rank = EHonorRank::Recruit;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int64 ShipsDestroyed = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int64 ShipsLost = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int32 AttacksWon = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int32 AttacksLost = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int32 DefensesWon = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Honor")
    int32 DefensesLost = 0;

    double GetWinRate() const
    {
        int32 Total = AttacksWon + AttacksLost;
        return Total > 0 ? static_cast<double>(AttacksWon) / Total : 0.0;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FUniverseStatistics
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int32 TotalPlayers = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int32 ActivePlayers = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int32 TotalPlanets = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int32 TotalMoons = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int32 TotalAlliances = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 TotalFleetsLaunched = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 TotalCombatsResolved = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalResourcesMined;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalResourcesLooted;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 TotalShipsDestroyed = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FDateTime LastUpdated;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FPlayerStatistics
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FString PlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalMined;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalSpentBuildings;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalSpentResearch;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalSpentFleet;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FResources TotalLootGained;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 FleetsLaunched = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 CombatsTotal = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 CombatsWon = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 ExpeditionsRun = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FDateTime FirstLoginTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    FDateTime LastLoginTime;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Stats")
    int64 TotalOnlineSeconds = 0;
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FMoonInfo
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FString MoonId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FString ParentPlanetId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FCoordinates Coordinates;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FString OwnerPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    int32 Diameter = 8000;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    int32 MaxFields = 1;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    int32 LunarBaseLevel = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    int32 SensorPhalanxLevel = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    int32 JumpGateLevel = 0;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FDateTime JumpGateLastUsed;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FResources StoredResources;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Moon")
    FFleetComposition StationedFleet;

    bool HasJumpGate() const { return JumpGateLevel > 0; }
    bool CanUseJumpGate() const
    {
        return HasJumpGate() &&
               (FDateTime::UtcNow() - JumpGateLastUsed).GetTotalHours() >= 1.0;
    }
};

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FTickTask
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    FString TaskId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    FString TaskName;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    ETickPriority Priority = ETickPriority::Normal;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    float IntervalSeconds = 60.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    float LastExecutedAt = 0.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    bool bEnabled = true;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Engine")
    int64 ExecutionCount = 0;
};
