// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Research/OGameResearchManager.h"
#include "Math/UnrealMathUtility.h"

FResources UOGameResearchManager::GetResearchCost(EResearchType Type, int32 CurrentLevel)
{
    // Base costs per research type (to reach level 1); each level doubles
    struct FResearchBaseCost { double Metal; double Crystal; double Deuterium; };
    static const TMap<EResearchType, FResearchBaseCost> BaseCosts =
    {
        { EResearchType::EspionageTechnology,           { 200,    600,    0    } },
        { EResearchType::ComputerTechnology,            { 0,      400,    600  } },
        { EResearchType::WeaponsTechnology,             { 800,    200,    0    } },
        { EResearchType::ShieldingTechnology,           { 200,    600,    0    } },
        { EResearchType::ArmourTechnology,              { 1000,   0,      0    } },
        { EResearchType::EnergyTechnology,              { 0,      800,    400  } },
        { EResearchType::HyperspaceTechnology,          { 0,      4000,   2000 } },
        { EResearchType::CombustionDrive,               { 400,    0,      600  } },
        { EResearchType::ImpulseDrive,                  { 2000,   4000,   600  } },
        { EResearchType::HyperspaceDrive,               { 10000,  20000,  6000 } },
        { EResearchType::LaserTechnology,               { 200,    100,    0    } },
        { EResearchType::IonTechnology,                 { 1000,   300,    100  } },
        { EResearchType::PlasmaTechnology,              { 2000,   4000,   1000 } },
        { EResearchType::IntergalacticResearchNetwork,  { 240000, 400000, 160000 } },
        { EResearchType::Astrophysics,                  { 4000,   8000,   4000 } },
        { EResearchType::GravitonTechnology,            { 0,      0,      0    } }, // Energy-only tech
    };

    const FResearchBaseCost* Base = BaseCosts.Find(Type);
    if (!Base)
    {
        return FResources(1000.0, 500.0, 0.0);
    }

    double Factor = FMath::Pow(2.0, CurrentLevel);
    return FResources(Base->Metal     * Factor,
                      Base->Crystal   * Factor,
                      Base->Deuterium * Factor);
}

FTimespan UOGameResearchManager::GetResearchDuration(EResearchType Type, int32 CurrentLevel,
                                                       int32 ResearchLabLevel, int32 IRNLevel,
                                                       float SpeedMultiplier)
{
    FResources Cost = GetResearchCost(Type, CurrentLevel);
    double TotalCost = Cost.Metal + Cost.Crystal;

    // OGame formula: hours = (Metal + Crystal) / (1000 * (1 + LabLevel)) / SpeedMultiplier
    double EffectiveLab  = FMath::Max(1.0, static_cast<double>(ResearchLabLevel + IRNLevel));
    double Hours         = TotalCost / (1000.0 * EffectiveLab) / FMath::Max(0.1f, SpeedMultiplier);

    return FTimespan::FromSeconds(FMath::Max(1.0, Hours * 3600.0));
}

bool UOGameResearchManager::MeetsPrerequisites(EResearchType Type,
                                                 const TMap<EResearchType, int32>& CurrentResearch,
                                                 int32 ResearchLabLevel)
{
    auto GetLevel = [&](EResearchType T) -> int32
    {
        const int32* L = CurrentResearch.Find(T);
        return L ? *L : 0;
    };

    switch (Type)
    {
        case EResearchType::EspionageTechnology:
            return ResearchLabLevel >= 1;
        case EResearchType::ComputerTechnology:
            return ResearchLabLevel >= 1;
        case EResearchType::WeaponsTechnology:
            return ResearchLabLevel >= 4;
        case EResearchType::ShieldingTechnology:
            return ResearchLabLevel >= 6 && GetLevel(EResearchType::EnergyTechnology) >= 3;
        case EResearchType::ArmourTechnology:
            return ResearchLabLevel >= 2;
        case EResearchType::EnergyTechnology:
            return ResearchLabLevel >= 1;
        case EResearchType::HyperspaceTechnology:
            return ResearchLabLevel >= 7 &&
                   GetLevel(EResearchType::ShieldingTechnology) >= 5 &&
                   GetLevel(EResearchType::EnergyTechnology)    >= 5;
        case EResearchType::CombustionDrive:
            return ResearchLabLevel >= 1 && GetLevel(EResearchType::EnergyTechnology) >= 1;
        case EResearchType::ImpulseDrive:
            return ResearchLabLevel >= 2 && GetLevel(EResearchType::EnergyTechnology) >= 1;
        case EResearchType::HyperspaceDrive:
            return ResearchLabLevel >= 7 && GetLevel(EResearchType::HyperspaceTechnology) >= 3;
        case EResearchType::LaserTechnology:
            return ResearchLabLevel >= 1 && GetLevel(EResearchType::EnergyTechnology) >= 2;
        case EResearchType::IonTechnology:
            return ResearchLabLevel >= 4 &&
                   GetLevel(EResearchType::LaserTechnology)  >= 5 &&
                   GetLevel(EResearchType::EnergyTechnology) >= 4;
        case EResearchType::PlasmaTechnology:
            return ResearchLabLevel >= 4 &&
                   GetLevel(EResearchType::EnergyTechnology) >= 8 &&
                   GetLevel(EResearchType::LaserTechnology)  >= 10 &&
                   GetLevel(EResearchType::IonTechnology)    >= 5;
        case EResearchType::IntergalacticResearchNetwork:
            return ResearchLabLevel >= 10 &&
                   GetLevel(EResearchType::ComputerTechnology)   >= 8 &&
                   GetLevel(EResearchType::HyperspaceTechnology) >= 8;
        case EResearchType::Astrophysics:
            return ResearchLabLevel >= 3 &&
                   GetLevel(EResearchType::EspionageTechnology) >= 4 &&
                   GetLevel(EResearchType::ImpulseDrive)        >= 3;
        case EResearchType::GravitonTechnology:
            return false; // Requires energy-only (not standard research)
        default:
            return false;
    }
}

FString UOGameResearchManager::GetResearchName(EResearchType Type)
{
    switch (Type)
    {
        case EResearchType::EspionageTechnology:            return TEXT("Espionage Technology");
        case EResearchType::ComputerTechnology:             return TEXT("Computer Technology");
        case EResearchType::WeaponsTechnology:              return TEXT("Weapons Technology");
        case EResearchType::ShieldingTechnology:            return TEXT("Shielding Technology");
        case EResearchType::ArmourTechnology:               return TEXT("Armour Technology");
        case EResearchType::EnergyTechnology:               return TEXT("Energy Technology");
        case EResearchType::HyperspaceTechnology:           return TEXT("Hyperspace Technology");
        case EResearchType::CombustionDrive:                return TEXT("Combustion Drive");
        case EResearchType::ImpulseDrive:                   return TEXT("Impulse Drive");
        case EResearchType::HyperspaceDrive:                return TEXT("Hyperspace Drive");
        case EResearchType::LaserTechnology:                return TEXT("Laser Technology");
        case EResearchType::IonTechnology:                  return TEXT("Ion Technology");
        case EResearchType::PlasmaTechnology:               return TEXT("Plasma Technology");
        case EResearchType::IntergalacticResearchNetwork:   return TEXT("Intergalactic Research Network");
        case EResearchType::Astrophysics:                   return TEXT("Astrophysics");
        case EResearchType::GravitonTechnology:             return TEXT("Graviton Technology");
        default:                                            return TEXT("Unknown Research");
    }
}

FString UOGameResearchManager::GetResearchDescription(EResearchType Type)
{
    switch (Type)
    {
        case EResearchType::EspionageTechnology:
            return TEXT("Enhances the capabilities of espionage probes, revealing more detail about target planets.");
        case EResearchType::ComputerTechnology:
            return TEXT("Increases the number of fleet slots available. Each level adds one additional fleet.");
        case EResearchType::WeaponsTechnology:
            return TEXT("Increases the attack power of all ships and defense units by 10% per level.");
        case EResearchType::ShieldingTechnology:
            return TEXT("Increases the shield power of all ships and defense units by 10% per level.");
        case EResearchType::ArmourTechnology:
            return TEXT("Increases the structural integrity of all ships and defense units by 10% per level.");
        case EResearchType::EnergyTechnology:
            return TEXT("Prerequisite for many advanced technologies. Unlocks higher energy manipulation.");
        case EResearchType::HyperspaceTechnology:
            return TEXT("Allows construction of hyperspace drives for faster-than-light travel.");
        case EResearchType::CombustionDrive:
            return TEXT("Increases the speed of Small Cargo, Large Cargo, Light Fighters, and other ships.");
        case EResearchType::ImpulseDrive:
            return TEXT("Increases the speed of Bombers, Colony Ships, and Cruisers by 20% per level.");
        case EResearchType::HyperspaceDrive:
            return TEXT("Dramatically increases the speed of capital ships by 30% per level.");
        case EResearchType::LaserTechnology:
            return TEXT("Prerequisite for Ion and Plasma technologies. Enables laser weaponry.");
        case EResearchType::IonTechnology:
            return TEXT("Prerequisite for Plasma Technology. Powers Ion Cannons.");
        case EResearchType::PlasmaTechnology:
            return TEXT("Powers Plasma Turrets. Increases crystal mine production by 1% per level.");
        case EResearchType::IntergalacticResearchNetwork:
            return TEXT("Allows research labs on multiple planets to cooperate, reducing research time.");
        case EResearchType::Astrophysics:
            return TEXT("Each even level allows an additional colony. Increases expedition findings.");
        case EResearchType::GravitonTechnology:
            return TEXT("Requires enormous amounts of energy to research. Enables the Death Star.");
        default:
            return TEXT("No description available.");
    }
}

TArray<EResearchType> UOGameResearchManager::GetAvailableResearch(
    const TMap<EResearchType, int32>& CurrentResearch, int32 ResearchLabLevel)
{
    TArray<EResearchType> Available;
    for (uint8 i = 0; i <= static_cast<uint8>(EResearchType::GravitonTechnology); ++i)
    {
        EResearchType Type = static_cast<EResearchType>(i);
        if (MeetsPrerequisites(Type, CurrentResearch, ResearchLabLevel))
        {
            Available.Add(Type);
        }
    }
    return Available;
}
