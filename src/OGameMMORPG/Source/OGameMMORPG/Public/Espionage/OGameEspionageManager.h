// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameEspionageManager.h - Handles spy probe reports and counter-espionage.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameEspionageManager.generated.h"

class UOGamePlanet;

USTRUCT(BlueprintType)
struct OGAMEMMORPG_API FEspionageReport
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    FString TargetPlayerId;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    FCoordinates TargetCoords;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    FDateTime ReportTime;

    // Resources always shown
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    FResources Resources;

    // Fleet shown at EspionageTech >= 2 over defender's level
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    FFleetComposition Fleet;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    bool bFleetRevealed = false;

    // Defense shown at EspionageTech >= 3 over defender's
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    TMap<EDefenseType, int64> Defense;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    bool bDefenseRevealed = false;

    // Buildings shown at EspionageTech >= 5 over defender's
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    TMap<EBuildingType, int32> Buildings;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    bool bBuildingsRevealed = false;

    // Research shown at EspionageTech >= 7 over defender's
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    TMap<EResearchType, int32> Research;
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    bool bResearchRevealed = false;

    // Counter-espionage chance
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Espionage")
    float CounterEspionageChance = 0.0f;
};

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameEspionageManager : public UObject
{
    GENERATED_BODY()

public:
    // Generate a spy report given attacker and defender espionage levels
    UFUNCTION(BlueprintCallable, Category = "OGame|Espionage")
    static FEspionageReport GenerateReport(UOGamePlanet* Target,
                                            int32 AttackerEspionageLevel,
                                            int32 DefenderEspionageLevel,
                                            int32 NumProbes);

    // Probability that defender is alerted
    UFUNCTION(BlueprintPure, Category = "OGame|Espionage")
    static float CalculateCounterEspionageChance(int32 AttackerEspTech,
                                                  int32 DefenderEspTech,
                                                  int32 NumProbes);

    // Text representation of a report
    UFUNCTION(BlueprintPure, Category = "OGame|Espionage")
    static FString GetReportText(const FEspionageReport& Report);
};
