// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "UI/OGameTextUIManager.h"
#include "Universe/OGamePlanet.h"
#include "Universe/OGameSolarSystem.h"
#include "Core/OGamePlayerState.h"
#include "Buildings/OGameBuildingManager.h"
#include "Research/OGameResearchManager.h"
#include "Math/UnrealMathUtility.h"

FString UOGameTextUIManager::RenderOverview(UOGamePlanet* Planet, AOGamePlayerState* Player) const
{
    if (!Planet || !Player) return TEXT("No data.\n");

    FString Out;
    Out += MakeHeader(FString::Printf(TEXT("OGame - %s"), *Planet->PlanetName));
    Out += FString::Printf(TEXT("Player: %-20s  Rank: %d\n"),
                           *Player->PlayerDisplayName, Player->Score.Rank);
    Out += FString::Printf(TEXT("Points: %s  |  Dark Matter: %d\n"),
                           *FormatNumber(static_cast<double>(Player->Score.TotalPoints)), Player->DarkMatter);
    Out += MakeDivider();
    Out += RenderResources(Planet);
    Out += MakeDivider();
    Out += FString::Printf(TEXT("Fields: %d/%d  |  Temp: %d°C ~ %d°C\n"),
                           Planet->UsedFields, Planet->MaxFields,
                           Planet->MinTemperature, Planet->MaxTemperature);
    Out += MakeDivider();
    Out += RenderNavigationBar(EGameScreen::Overview);
    return Out;
}

FString UOGameTextUIManager::RenderResources(UOGamePlanet* Planet) const
{
    if (!Planet) return TEXT("No planet.\n");

    TMap<EResearchType, int32> EmptyResearch;
    FResources Hourly = Planet->CalculateHourlyProduction(EmptyResearch);

    FString Out;
    Out += TEXT("Resources (stored / capacity)  [+per hour]\n");
    Out += FString::Printf(TEXT("  Metal:     %12s / %s  [+%s/h]\n"),
                           *FormatNumber(Planet->StoredResources.Metal),
                           *FormatNumber(Planet->StorageCapacity.Metal),
                           *FormatNumber(Hourly.Metal));
    Out += FString::Printf(TEXT("  Crystal:   %12s / %s  [+%s/h]\n"),
                           *FormatNumber(Planet->StoredResources.Crystal),
                           *FormatNumber(Planet->StorageCapacity.Crystal),
                           *FormatNumber(Hourly.Crystal));
    Out += FString::Printf(TEXT("  Deuterium: %12s / %s  [+%s/h]\n"),
                           *FormatNumber(Planet->StoredResources.Deuterium),
                           *FormatNumber(Planet->StorageCapacity.Deuterium),
                           *FormatNumber(Hourly.Deuterium));
    Out += FString::Printf(TEXT("  Energy:    %+.0f\n"), Planet->EnergyBalance);
    return Out;
}

FString UOGameTextUIManager::RenderBuildings(UOGamePlanet* Planet) const
{
    if (!Planet) return TEXT("No planet.\n");

    FString Out;
    Out += MakeHeader(TEXT("Buildings"));

    TArray<EBuildingType> AllBuildings = {
        EBuildingType::MetalMine, EBuildingType::CrystalMine, EBuildingType::DeuteriumSynthesizer,
        EBuildingType::SolarPowerPlant, EBuildingType::FusionReactor,
        EBuildingType::MetalStorage, EBuildingType::CrystalStorage, EBuildingType::DeuteriumTank,
        EBuildingType::RoboticsFactory, EBuildingType::Shipyard, EBuildingType::ResearchLab,
        EBuildingType::AllianceDepot, EBuildingType::MissileSilo, EBuildingType::NaniteFactory,
        EBuildingType::Terraformer, EBuildingType::SpaceDock,
    };

    for (EBuildingType Type : AllBuildings)
    {
        int32 Level = Planet->GetBuildingLevel(Type);
        FResources NextCost = UOGameBuildingManager::GetBuildingCost(Type, Level);
        FString CostStr = FormatResources(NextCost);

        Out += FString::Printf(TEXT("  %-32s Lv.%3d  Cost: %s\n"),
                               *UOGameBuildingManager::GetBuildingName(Type),
                               Level,
                               *CostStr);
    }

    if (Planet->bBuildingInProgress)
    {
        FTimespan Remaining = Planet->BuildingFinishTime - FDateTime::UtcNow();
        Out += MakeDivider();
        Out += FString::Printf(TEXT("  BUILDING: %s  ETA: %s\n"),
                               *UOGameBuildingManager::GetBuildingName(Planet->CurrentBuilding),
                               *FormatTimespan(Remaining));
    }

    return Out;
}

FString UOGameTextUIManager::RenderResearch(AOGamePlayerState* Player) const
{
    if (!Player) return TEXT("No player.\n");

    FString Out;
    Out += MakeHeader(TEXT("Research"));

    TArray<EResearchType> AllResearch = {
        EResearchType::EspionageTechnology, EResearchType::ComputerTechnology,
        EResearchType::WeaponsTechnology, EResearchType::ShieldingTechnology,
        EResearchType::ArmourTechnology, EResearchType::EnergyTechnology,
        EResearchType::HyperspaceTechnology, EResearchType::CombustionDrive,
        EResearchType::ImpulseDrive, EResearchType::HyperspaceDrive,
        EResearchType::LaserTechnology, EResearchType::IonTechnology,
        EResearchType::PlasmaTechnology, EResearchType::IntergalacticResearchNetwork,
        EResearchType::Astrophysics, EResearchType::GravitonTechnology,
    };

    for (EResearchType Type : AllResearch)
    {
        int32 Level = Player->GetResearchLevel(Type);
        Out += FString::Printf(TEXT("  %-42s Lv.%3d\n"),
                               *UOGameResearchManager::GetResearchName(Type), Level);
    }

    if (Player->bResearchInProgress)
    {
        FTimespan Remaining = Player->ResearchFinishTime - FDateTime::UtcNow();
        Out += MakeDivider();
        Out += FString::Printf(TEXT("  RESEARCHING: %s  ETA: %s\n"),
                               *UOGameResearchManager::GetResearchName(Player->CurrentResearch),
                               *FormatTimespan(Remaining));
    }

    return Out;
}

FString UOGameTextUIManager::RenderShipyard(UOGamePlanet* Planet) const
{
    if (!Planet) return TEXT("No planet.\n");

    FString Out;
    Out += MakeHeader(TEXT("Shipyard"));

    TArray<TTuple<EShipType, FString>> Ships = {
        { EShipType::SmallCargo,      TEXT("Small Cargo Ship")  },
        { EShipType::LargeCargo,      TEXT("Large Cargo Ship")  },
        { EShipType::LightFighter,    TEXT("Light Fighter")     },
        { EShipType::HeavyFighter,    TEXT("Heavy Fighter")     },
        { EShipType::Cruiser,         TEXT("Cruiser")           },
        { EShipType::Battleship,      TEXT("Battleship")        },
        { EShipType::Battlecruiser,   TEXT("Battlecruiser")     },
        { EShipType::Bomber,          TEXT("Bomber")            },
        { EShipType::Destroyer,       TEXT("Destroyer")         },
        { EShipType::DeathStar,       TEXT("Death Star")        },
        { EShipType::Recycler,        TEXT("Recycler")          },
        { EShipType::EspionageProbe,  TEXT("Espionage Probe")   },
        { EShipType::ColonyShip,      TEXT("Colony Ship")       },
        { EShipType::Reaper,          TEXT("Reaper")            },
        { EShipType::Pathfinder,      TEXT("Pathfinder")        },
    };

    Out += FString::Printf(TEXT("  %-24s %10s  %12s  %12s  %10s\n"),
                           TEXT("Ship"), TEXT("Stationed"), TEXT("Metal"), TEXT("Crystal"), TEXT("Deut"));
    Out += MakeDivider();

    for (const auto& [Type, Name] : Ships)
    {
        const int64* Count = Planet->StationedFleet.Ships.Find(Type);
        int64 Stationed = Count ? *Count : 0;

        OGameConstants::FShipBaseStats Stats = OGameConstants::GetShipBaseStats(Type);
        Out += FString::Printf(TEXT("  %-24s %10lld  %12s  %12s  %10s\n"),
                               *Name, Stationed,
                               *FormatNumber(Stats.MetalCost),
                               *FormatNumber(Stats.CrystalCost),
                               *FormatNumber(Stats.DeuteriumCost));
    }

    return Out;
}

FString UOGameTextUIManager::RenderDefense(UOGamePlanet* Planet) const
{
    if (!Planet) return TEXT("No planet.\n");

    FString Out;
    Out += MakeHeader(TEXT("Defense"));

    TArray<TTuple<EDefenseType, FString>> Defenses = {
        { EDefenseType::RocketLauncher,         TEXT("Rocket Launcher")          },
        { EDefenseType::LightLaser,             TEXT("Light Laser")              },
        { EDefenseType::HeavyLaser,             TEXT("Heavy Laser")              },
        { EDefenseType::GaussCannon,            TEXT("Gauss Cannon")             },
        { EDefenseType::IonCannon,              TEXT("Ion Cannon")               },
        { EDefenseType::PlasmaTurret,           TEXT("Plasma Turret")            },
        { EDefenseType::SmallShieldDome,        TEXT("Small Shield Dome")        },
        { EDefenseType::LargeShieldDome,        TEXT("Large Shield Dome")        },
        { EDefenseType::AntiBallisticMissile,   TEXT("Anti-Ballistic Missile")   },
        { EDefenseType::InterplanetaryMissile,  TEXT("Interplanetary Missile")   },
    };

    Out += FString::Printf(TEXT("  %-30s %12s  %10s  %10s\n"),
                           TEXT("Defense"), TEXT("Count"), TEXT("ATK"), TEXT("SHIELD"));
    Out += MakeDivider();

    for (const auto& [Type, Name] : Defenses)
    {
        int64 Count = Planet->GetDefenseCount(Type);
        OGameConstants::FDefenseBaseStats Stats = OGameConstants::GetDefenseBaseStats(Type);
        Out += FString::Printf(TEXT("  %-30s %12lld  %10.0f  %10.0f\n"),
                               *Name, Count, Stats.AttackPower, Stats.ShieldPower);
    }

    return Out;
}

FString UOGameTextUIManager::RenderFleet(UOGamePlanet* Planet) const
{
    if (!Planet) return TEXT("No planet.\n");

    FString Out;
    Out += MakeHeader(TEXT("Fleet"));
    Out += FString::Printf(TEXT("  %-24s %12s\n"), TEXT("Ship"), TEXT("Count"));
    Out += MakeDivider();

    for (const auto& Pair : Planet->StationedFleet.Ships)
    {
        if (Pair.Value <= 0) continue;
        Out += FString::Printf(TEXT("  Ship[%-3d]                %12lld\n"),
                               static_cast<int32>(Pair.Key), Pair.Value);
    }

    return Out;
}

FString UOGameTextUIManager::RenderGalaxy(UOGameSolarSystem* System,
                                           int32 GalaxyIndex, int32 SystemIndex) const
{
    if (!System) return FString::Printf(TEXT("[%d:%d] Empty system.\n"), GalaxyIndex, SystemIndex);
    return System->GetSystemText();
}

FString UOGameTextUIManager::RenderMessages(AOGamePlayerState* Player) const
{
    if (!Player) return TEXT("No player.\n");

    FString Out;
    Out += MakeHeader(FString::Printf(TEXT("Messages (%d)"), Player->Inbox.Num()));

    int32 Shown = 0;
    for (const FGameMessage& Msg : Player->Inbox)
    {
        Out += FString::Printf(TEXT("  [%s] From: %-20s  Subject: %s%s\n"),
                               Msg.bIsRead ? TEXT(" ") : TEXT("*"),
                               *Msg.From,
                               *Msg.Subject,
                               Msg.bIsRead ? TEXT("") : TEXT(" (unread)"));
        ++Shown;
        if (Shown >= 20) break;
    }

    if (Player->Inbox.Num() > 20)
    {
        Out += FString::Printf(TEXT("  ... and %d more.\n"), Player->Inbox.Num() - 20);
    }

    return Out;
}

FString UOGameTextUIManager::RenderHighScore(const TArray<AOGamePlayerState*>& Players) const
{
    FString Out;
    Out += MakeHeader(TEXT("High Score"));
    Out += FString::Printf(TEXT("  %-5s  %-24s  %14s  %14s  %14s\n"),
                           TEXT("Rank"), TEXT("Player"), TEXT("Total"), TEXT("Fleet"), TEXT("Research"));
    Out += MakeDivider();

    int32 Rank = 1;
    for (const AOGamePlayerState* P : Players)
    {
        if (!P) continue;
        Out += FString::Printf(TEXT("  %-5d  %-24s  %14s  %14s  %14s\n"),
                               Rank++,
                               *P->PlayerDisplayName,
                               *FormatNumber(static_cast<double>(P->Score.TotalPoints)),
                               *FormatNumber(static_cast<double>(P->Score.FleetPoints)),
                               *FormatNumber(static_cast<double>(P->Score.ResearchPoints)));
    }
    return Out;
}

FString UOGameTextUIManager::RenderCombatReport(const FCombatReport& Report) const
{
    FString Out;
    Out += MakeHeader(TEXT("Combat Report"));
    Out += FString::Printf(TEXT("  Location:  %s\n"), *Report.Location.ToString());
    Out += FString::Printf(TEXT("  Attacker:  %s\n"), *Report.AttackerName);
    Out += FString::Printf(TEXT("  Defender:  %s\n"), *Report.DefenderName);
    Out += FString::Printf(TEXT("  Time:      %s\n"), *Report.CombatTime.ToString());
    Out += MakeDivider();

    for (const FString& Log : Report.RoundLogs)
    {
        Out += Log + TEXT("\n");
    }

    Out += MakeDivider();
    FString OutcomeStr;
    switch (Report.Outcome)
    {
        case ECombatOutcome::AttackerWins: OutcomeStr = TEXT("ATTACKER WINS"); break;
        case ECombatOutcome::DefenderWins: OutcomeStr = TEXT("DEFENDER WINS"); break;
        case ECombatOutcome::Draw:         OutcomeStr = TEXT("DRAW");          break;
        default:                           OutcomeStr = TEXT("UNKNOWN");       break;
    }
    Out += FString::Printf(TEXT("  Outcome:   %s\n"), *OutcomeStr);

    if (Report.Outcome == ECombatOutcome::AttackerWins)
    {
        Out += FString::Printf(TEXT("  Looted:    %s\n"), *FormatResources(Report.LootedResources));
    }
    Out += FString::Printf(TEXT("  Debris:    %s\n"), *FormatResources(Report.DebrisField));
    return Out;
}

FString UOGameTextUIManager::RenderNavigationBar(EGameScreen CurrentScreen) const
{
    TArray<TTuple<EGameScreen, FString>> Screens = {
        { EGameScreen::Overview,  TEXT("[1]Overview")   },
        { EGameScreen::Resources, TEXT("[2]Resources")  },
        { EGameScreen::Buildings, TEXT("[3]Buildings")  },
        { EGameScreen::Research,  TEXT("[4]Research")   },
        { EGameScreen::Shipyard,  TEXT("[5]Shipyard")   },
        { EGameScreen::Defense,   TEXT("[6]Defense")    },
        { EGameScreen::Fleet,     TEXT("[7]Fleet")      },
        { EGameScreen::Galaxy,    TEXT("[8]Galaxy")     },
        { EGameScreen::Messages,  TEXT("[9]Messages")   },
        { EGameScreen::Alliance,  TEXT("[0]Alliance")   },
    };

    FString Bar = TEXT("NAV: ");
    for (const auto& [Screen, Label] : Screens)
    {
        if (Screen == CurrentScreen)
        {
            Bar += TEXT("[*") + Label.Mid(1) + TEXT("*] ");
        }
        else
        {
            Bar += Label + TEXT(" ");
        }
    }
    return Bar + TEXT("\n");
}

FString UOGameTextUIManager::RenderPlanetSelector(const TArray<FString>& PlanetNames,
                                                    int32 SelectedIndex) const
{
    FString Out = TEXT("Planets: ");
    for (int32 i = 0; i < PlanetNames.Num(); ++i)
    {
        if (i == SelectedIndex)
        {
            Out += TEXT("[*") + PlanetNames[i] + TEXT("*] ");
        }
        else
        {
            Out += TEXT("[") + PlanetNames[i] + TEXT("] ");
        }
    }
    return Out + TEXT("\n");
}

// ── Static Utility ────────────────────────────────────────────────────────────

FString UOGameTextUIManager::FormatNumber(double Value)
{
    if (Value >= 1e12) return FString::Printf(TEXT("%.2fT"), Value / 1e12);
    if (Value >= 1e9)  return FString::Printf(TEXT("%.2fB"), Value / 1e9);
    if (Value >= 1e6)  return FString::Printf(TEXT("%.2fM"), Value / 1e6);
    if (Value >= 1e3)  return FString::Printf(TEXT("%.1fK"), Value / 1e3);
    return FString::Printf(TEXT("%.0f"), Value);
}

FString UOGameTextUIManager::FormatTimespan(FTimespan Span)
{
    if (Span.GetTotalSeconds() <= 0.0)
    {
        return TEXT("0s");
    }

    int32 Days    = static_cast<int32>(Span.GetDays());
    int32 Hours   = Span.GetHours();
    int32 Minutes = Span.GetMinutes();
    int32 Seconds = Span.GetSeconds();

    if (Days > 0)
    {
        return FString::Printf(TEXT("%dd %02dh %02dm"), Days, Hours, Minutes);
    }
    if (Hours > 0)
    {
        return FString::Printf(TEXT("%dh %02dm %02ds"), Hours, Minutes, Seconds);
    }
    return FString::Printf(TEXT("%dm %02ds"), Minutes, Seconds);
}

FString UOGameTextUIManager::FormatResources(const FResources& Res)
{
    return FString::Printf(TEXT("M:%s C:%s D:%s"),
                           *FormatNumber(Res.Metal),
                           *FormatNumber(Res.Crystal),
                           *FormatNumber(Res.Deuterium));
}

FString UOGameTextUIManager::MakeDivider(int32 Width, TCHAR Char)
{
    FString Line;
    for (int32 i = 0; i < Width; ++i)
    {
        Line += Char;
    }
    return Line + TEXT("\n");
}

FString UOGameTextUIManager::MakeHeader(const FString& Title, int32 Width)
{
    FString Out = MakeDivider(Width, TEXT('='));
    int32 Padding = FMath::Max(0, (Width - Title.Len() - 2) / 2);
    FString Left(Padding, TEXT(' '));
    Out += Left + TEXT(" ") + Title + TEXT(" ") + Left + TEXT("\n");
    Out += MakeDivider(Width, TEXT('='));
    return Out;
}
