// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Espionage/OGameEspionageManager.h"
#include "Universe/OGamePlanet.h"
#include "Math/UnrealMathUtility.h"

FEspionageReport UOGameEspionageManager::GenerateReport(UOGamePlanet* Target,
                                                          int32 AttackerEspionageLevel,
                                                          int32 DefenderEspionageLevel,
                                                          int32 NumProbes)
{
    FEspionageReport Report;
    if (!Target)
    {
        return Report;
    }

    Report.TargetPlayerId  = Target->OwnerPlayerId;
    Report.TargetCoords    = Target->Coordinates;
    Report.ReportTime      = FDateTime::UtcNow();
    Report.Resources       = Target->StoredResources;
    Report.CounterEspionageChance = CalculateCounterEspionageChance(
        AttackerEspionageLevel, DefenderEspionageLevel, NumProbes);

    int32 EspDiff = AttackerEspionageLevel - DefenderEspionageLevel;

    // Fleet revealed if attacker is 2+ levels ahead
    if (EspDiff >= 2 || (EspDiff >= 0 && NumProbes >= 3))
    {
        Report.Fleet          = Target->StationedFleet;
        Report.bFleetRevealed = true;
    }

    // Defense revealed at 3+ ahead
    if (EspDiff >= 3 || (EspDiff >= 1 && NumProbes >= 5))
    {
        Report.Defense          = Target->DefenseUnits;
        Report.bDefenseRevealed = true;
    }

    // Buildings revealed at 5+ ahead
    if (EspDiff >= 5)
    {
        Report.Buildings          = Target->BuildingLevels;
        Report.bBuildingsRevealed = true;
    }

    // Research revealed at 7+ ahead
    if (EspDiff >= 7)
    {
        Report.bResearchRevealed = true;
        // Research requires PlayerState lookup - left for integration
    }

    return Report;
}

float UOGameEspionageManager::CalculateCounterEspionageChance(int32 AttackerEspTech,
                                                               int32 DefenderEspTech,
                                                               int32 NumProbes)
{
    // OGame formula: chance = (DefEsp/AttEsp)^2 * NumProbes / 100
    // Clamped to [0, 1]
    if (AttackerEspTech <= 0)
    {
        return 1.0f;
    }

    float Ratio  = static_cast<float>(DefenderEspTech) / static_cast<float>(AttackerEspTech);
    float Chance = Ratio * Ratio * NumProbes / 100.0f;
    return FMath::Clamp(Chance, 0.0f, 1.0f);
}

FString UOGameEspionageManager::GetReportText(const FEspionageReport& Report)
{
    FString Text;
    Text += FString::Printf(TEXT("=== Espionage Report ===\n"));
    Text += FString::Printf(TEXT("Target:  %s %s\n"), *Report.TargetPlayerId, *Report.TargetCoords.ToString());
    Text += FString::Printf(TEXT("Time:    %s\n"), *Report.ReportTime.ToString());
    Text += FString::Printf(TEXT("--- Resources ---\n"));
    Text += FString::Printf(TEXT("Metal:     %.0f\n"), Report.Resources.Metal);
    Text += FString::Printf(TEXT("Crystal:   %.0f\n"), Report.Resources.Crystal);
    Text += FString::Printf(TEXT("Deuterium: %.0f\n"), Report.Resources.Deuterium);

    if (Report.bFleetRevealed)
    {
        Text += TEXT("--- Fleet ---\n");
        for (const auto& Pair : Report.Fleet.Ships)
        {
            if (Pair.Value > 0)
            {
                Text += FString::Printf(TEXT("  Ship[%d]: %lld\n"),
                                        static_cast<int32>(Pair.Key), Pair.Value);
            }
        }
    }

    if (Report.bDefenseRevealed)
    {
        Text += TEXT("--- Defense ---\n");
        for (const auto& Pair : Report.Defense)
        {
            if (Pair.Value > 0)
            {
                Text += FString::Printf(TEXT("  Defense[%d]: %lld\n"),
                                        static_cast<int32>(Pair.Key), Pair.Value);
            }
        }
    }

    if (Report.bBuildingsRevealed)
    {
        Text += TEXT("--- Buildings ---\n");
        for (const auto& Pair : Report.Buildings)
        {
            if (Pair.Value > 0)
            {
                Text += FString::Printf(TEXT("  Building[%d]: Level %d\n"),
                                        static_cast<int32>(Pair.Key), Pair.Value);
            }
        }
    }

    Text += FString::Printf(TEXT("Counter-Espionage Chance: %.1f%%\n"),
                            Report.CounterEspionageChance * 100.0f);
    return Text;
}
