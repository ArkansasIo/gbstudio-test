// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Statistics/OGameStatisticsManager.h"
#include "Algo/Sort.h"

UOGameStatisticsManager::UOGameStatisticsManager()
{
}

FPlayerStatistics& UOGameStatisticsManager::FindOrCreatePlayerStats(const FString& PlayerId)
{
    FPlayerStatistics* Found = PlayerStats.Find(PlayerId);
    if (Found) return *Found;

    FPlayerStatistics NewStats;
    NewStats.PlayerId       = PlayerId;
    NewStats.FirstLoginTime = FDateTime::UtcNow();
    PlayerStats.Add(PlayerId, NewStats);
    return PlayerStats[PlayerId];
}

void UOGameStatisticsManager::RecordResourcesMined(const FString& PlayerId,
                                                    const FResources& Amount)
{
    FPlayerStatistics& S = FindOrCreatePlayerStats(PlayerId);
    S.TotalMined = S.TotalMined + Amount;

    UniverseStats.TotalResourcesMined = UniverseStats.TotalResourcesMined + Amount;
    UniverseStats.LastUpdated = FDateTime::UtcNow();
}

void UOGameStatisticsManager::RecordResourcesSpentBuilding(const FString& PlayerId,
                                                            const FResources& Amount)
{
    FindOrCreatePlayerStats(PlayerId).TotalSpentBuildings =
        FindOrCreatePlayerStats(PlayerId).TotalSpentBuildings + Amount;
}

void UOGameStatisticsManager::RecordResourcesSpentResearch(const FString& PlayerId,
                                                            const FResources& Amount)
{
    FindOrCreatePlayerStats(PlayerId).TotalSpentResearch =
        FindOrCreatePlayerStats(PlayerId).TotalSpentResearch + Amount;
}

void UOGameStatisticsManager::RecordResourcesSpentFleet(const FString& PlayerId,
                                                         const FResources& Amount)
{
    FindOrCreatePlayerStats(PlayerId).TotalSpentFleet =
        FindOrCreatePlayerStats(PlayerId).TotalSpentFleet + Amount;
}

void UOGameStatisticsManager::RecordLootGained(const FString& PlayerId,
                                                const FResources& Amount)
{
    FindOrCreatePlayerStats(PlayerId).TotalLootGained =
        FindOrCreatePlayerStats(PlayerId).TotalLootGained + Amount;
    UniverseStats.TotalResourcesLooted = UniverseStats.TotalResourcesLooted + Amount;
}

void UOGameStatisticsManager::RecordFleetLaunched(const FString& PlayerId)
{
    ++FindOrCreatePlayerStats(PlayerId).FleetsLaunched;
    ++UniverseStats.TotalFleetsLaunched;
}

void UOGameStatisticsManager::RecordCombatResult(const FString& PlayerId, bool bWon,
                                                   int64 ShipsDestroyed, int64 ShipsLost)
{
    FPlayerStatistics& S = FindOrCreatePlayerStats(PlayerId);
    ++S.CombatsTotal;
    if (bWon) ++S.CombatsWon;

    ++UniverseStats.TotalCombatsResolved;
    UniverseStats.TotalShipsDestroyed += ShipsDestroyed;
}

void UOGameStatisticsManager::RecordExpedition(const FString& PlayerId)
{
    ++FindOrCreatePlayerStats(PlayerId).ExpeditionsRun;
}

void UOGameStatisticsManager::RecordPlayerLogin(const FString& PlayerId)
{
    FPlayerStatistics& S = FindOrCreatePlayerStats(PlayerId);
    S.LastLoginTime = FDateTime::UtcNow();
    ++UniverseStats.ActivePlayers;
}

void UOGameStatisticsManager::RecordPlayerLogout(const FString& PlayerId,
                                                   int64 OnlineSeconds)
{
    FindOrCreatePlayerStats(PlayerId).TotalOnlineSeconds += OnlineSeconds;
    UniverseStats.ActivePlayers = FMath::Max(0, UniverseStats.ActivePlayers - 1);
}

FPlayerStatistics UOGameStatisticsManager::GetPlayerStats(const FString& PlayerId) const
{
    const FPlayerStatistics* Found = PlayerStats.Find(PlayerId);
    return Found ? *Found : FPlayerStatistics();
}

FString UOGameStatisticsManager::GetPlayerStatsText(const FString& PlayerId) const
{
    FPlayerStatistics S = GetPlayerStats(PlayerId);

    FString Text;
    Text += FString::Printf(TEXT("=== Statistics: %s ===\n"), *PlayerId);
    Text += FString::Printf(TEXT("  Resources Mined:  M:%.0f  C:%.0f  D:%.0f\n"),
                            S.TotalMined.Metal, S.TotalMined.Crystal, S.TotalMined.Deuterium);
    Text += FString::Printf(TEXT("  Spent Buildings:  M:%.0f  C:%.0f  D:%.0f\n"),
                            S.TotalSpentBuildings.Metal, S.TotalSpentBuildings.Crystal, S.TotalSpentBuildings.Deuterium);
    Text += FString::Printf(TEXT("  Spent Research:   M:%.0f  C:%.0f  D:%.0f\n"),
                            S.TotalSpentResearch.Metal, S.TotalSpentResearch.Crystal, S.TotalSpentResearch.Deuterium);
    Text += FString::Printf(TEXT("  Spent Fleet:      M:%.0f  C:%.0f  D:%.0f\n"),
                            S.TotalSpentFleet.Metal, S.TotalSpentFleet.Crystal, S.TotalSpentFleet.Deuterium);
    Text += FString::Printf(TEXT("  Loot Gained:      M:%.0f  C:%.0f  D:%.0f\n"),
                            S.TotalLootGained.Metal, S.TotalLootGained.Crystal, S.TotalLootGained.Deuterium);
    Text += FString::Printf(TEXT("  Fleets Launched:  %lld\n"), S.FleetsLaunched);
    Text += FString::Printf(TEXT("  Combats:          %lld total  %lld won (%.1f%%)\n"),
                            S.CombatsTotal, S.CombatsWon,
                            S.CombatsTotal > 0 ? 100.0 * S.CombatsWon / S.CombatsTotal : 0.0);
    Text += FString::Printf(TEXT("  Expeditions Run:  %lld\n"), S.ExpeditionsRun);

    int64 Hours   = S.TotalOnlineSeconds / 3600;
    int64 Minutes = (S.TotalOnlineSeconds % 3600) / 60;
    Text += FString::Printf(TEXT("  Total Online:     %lld h %lld m\n"), Hours, Minutes);

    return Text;
}

FUniverseStatistics UOGameStatisticsManager::GetUniverseStats() const
{
    return UniverseStats;
}

void UOGameStatisticsManager::UpdateUniverseStats(int32 TotalPlayers, int32 ActivePlayers,
                                                   int32 TotalPlanets, int32 TotalMoons,
                                                   int32 TotalAlliances)
{
    UniverseStats.TotalPlayers   = TotalPlayers;
    UniverseStats.ActivePlayers  = ActivePlayers;
    UniverseStats.TotalPlanets   = TotalPlanets;
    UniverseStats.TotalMoons     = TotalMoons;
    UniverseStats.TotalAlliances = TotalAlliances;
    UniverseStats.LastUpdated    = FDateTime::UtcNow();
}

FString UOGameStatisticsManager::GetUniverseStatsText() const
{
    const FUniverseStatistics& U = UniverseStats;
    FString Text;
    Text += TEXT("=== Universe Statistics ===\n");
    Text += FString::Printf(TEXT("  Players:         %d total  %d active\n"),
                            U.TotalPlayers, U.ActivePlayers);
    Text += FString::Printf(TEXT("  Planets:         %d   Moons: %d   Alliances: %d\n"),
                            U.TotalPlanets, U.TotalMoons, U.TotalAlliances);
    Text += FString::Printf(TEXT("  Fleets Launched: %lld\n"), U.TotalFleetsLaunched);
    Text += FString::Printf(TEXT("  Combats:         %lld   Ships Destroyed: %lld\n"),
                            U.TotalCombatsResolved, U.TotalShipsDestroyed);
    Text += FString::Printf(TEXT("  Resources Mined: M:%.0f  C:%.0f  D:%.0f\n"),
                            U.TotalResourcesMined.Metal, U.TotalResourcesMined.Crystal,
                            U.TotalResourcesMined.Deuterium);
    Text += FString::Printf(TEXT("  Resources Looted: M:%.0f  C:%.0f  D:%.0f\n"),
                            U.TotalResourcesLooted.Metal, U.TotalResourcesLooted.Crystal,
                            U.TotalResourcesLooted.Deuterium);
    return Text;
}

TArray<FString> UOGameStatisticsManager::GetTopMinerIds(int32 TopN) const
{
    TArray<TPair<FString, double>> List;
    for (const auto& Pair : PlayerStats)
    {
        double TotalMined = Pair.Value.TotalMined.Metal +
                            Pair.Value.TotalMined.Crystal +
                            Pair.Value.TotalMined.Deuterium;
        List.Add({ Pair.Key, TotalMined });
    }
    List.Sort([](const auto& A, const auto& B) { return A.Value > B.Value; });

    TArray<FString> Result;
    for (int32 i = 0; i < FMath::Min(TopN, List.Num()); ++i)
    {
        Result.Add(List[i].Key);
    }
    return Result;
}

TArray<FString> UOGameStatisticsManager::GetTopCombatantIds(int32 TopN) const
{
    TArray<TPair<FString, int64>> List;
    for (const auto& Pair : PlayerStats)
    {
        List.Add({ Pair.Key, Pair.Value.CombatsWon });
    }
    List.Sort([](const auto& A, const auto& B) { return A.Value > B.Value; });

    TArray<FString> Result;
    for (int32 i = 0; i < FMath::Min(TopN, List.Num()); ++i)
    {
        Result.Add(List[i].Key);
    }
    return Result;
}
