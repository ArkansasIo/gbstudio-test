// Copyright (c) OGame MMORPG Project. All Rights Reserved.
// OGameResearchManager.h - Calculates research costs, prerequisites, and durations.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Core/OGameTypes.h"
#include "OGameResearchManager.generated.h"

UCLASS(BlueprintType, Blueprintable)
class OGAMEMMORPG_API UOGameResearchManager : public UObject
{
    GENERATED_BODY()

public:
    // Cost to research from current level to current+1
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static FResources GetResearchCost(EResearchType Type, int32 CurrentLevel);

    // Duration to research (modified by ResearchLab level and IRN)
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static FTimespan GetResearchDuration(EResearchType Type, int32 CurrentLevel,
                                          int32 ResearchLabLevel, int32 IRNLevel = 0,
                                          float SpeedMultiplier = 1.0f);

    // Check whether prerequisites are met
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static bool MeetsPrerequisites(EResearchType Type,
                                    const TMap<EResearchType, int32>& CurrentResearch,
                                    int32 ResearchLabLevel);

    // Human-readable name for each research type
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static FString GetResearchName(EResearchType Type);

    // Description text
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static FString GetResearchDescription(EResearchType Type);

    // All available research types a player can start
    UFUNCTION(BlueprintPure, Category = "OGame|Research")
    static TArray<EResearchType> GetAvailableResearch(const TMap<EResearchType, int32>& CurrentResearch,
                                                       int32 ResearchLabLevel);
};
