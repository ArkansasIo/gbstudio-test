# OGame MMORPG Clone — Unreal Engine 5

A **turn-based real-time text 4X space strategy MMORPG** built with Unreal Engine 5, inspired by the classic OGame browser game.

---

## Game Overview

Players manage space colonies across a shared universe, mining resources, researching technologies, building fleets, and competing or cooperating with other players in a persistent real-time universe.

### 4X Elements
| Pillar | Implementation |
|--------|---------------|
| **eXplore** | Galaxy map, espionage probes, expedition missions |
| **eXpand** | Colonise new planets with Colony Ships (up to Astrophysics/2 colonies) |
| **eXploit** | Mine Metal, Crystal, Deuterium; run Fusion Reactors |
| **eXterminate** | Send attack fleets, use Interplanetary Missiles, destroy moons |

---

## Project Structure

```
src/OGameMMORPG/
├── OGameMMORPG.uproject               # UE5 project file (Engine 5.3)
├── Source/
│   ├── OGameMMORPG/                   # Main game module
│   │   ├── OGameMMORPG.Build.cs       # Module build rules
│   │   ├── Public/
│   │   │   ├── Core/
│   │   │   │   ├── OGameTypes.h       # All enums, structs, core data types
│   │   │   │   ├── OGameConstants.h   # Balance constants, ship/building stats
│   │   │   │   ├── OGameGameInstance.h
│   │   │   │   ├── OGameGameMode.h
│   │   │   │   ├── OGamePlayerState.h
│   │   │   │   └── OGameBlueprintLibrary.h   # BP-callable static helpers
│   │   │   ├── Universe/
│   │   │   │   ├── OGamePlanet.h
│   │   │   │   ├── OGameSolarSystem.h
│   │   │   │   └── OGameUniverseManager.h
│   │   │   ├── Fleet/
│   │   │   │   └── OGameFleet.h
│   │   │   ├── Buildings/
│   │   │   │   └── OGameBuildingManager.h
│   │   │   ├── Research/
│   │   │   │   └── OGameResearchManager.h
│   │   │   ├── Combat/
│   │   │   │   └── OGameCombatManager.h
│   │   │   ├── Espionage/
│   │   │   │   └── OGameEspionageManager.h
│   │   │   ├── Alliance/
│   │   │   │   └── OGameAllianceManager.h
│   │   │   ├── Multiplayer/
│   │   │   │   └── OGamePlayerManager.h
│   │   │   └── UI/
│   │   │       └── OGameTextUIManager.h
│   │   └── Private/                   # All .cpp implementations
│   ├── OGameMMORPGServer/
│   │   └── OGameMMORPGServer.Target.cs
│   └── OGameMMORPGClient/
│       └── OGameMMORPG.Target.cs
└── Content/
    └── Blueprints/
        ├── Core/
        │   ├── BP_OGameGameInstance.blueprint
        │   ├── BP_OGameGameMode.blueprint
        │   └── BP_OGamePlayerState.blueprint
        ├── Universe/
        │   └── BP_OGamePlanet.blueprint
        ├── Fleet/
        │   └── BP_FleetSendScreen.blueprint
        ├── Buildings/
        │   └── BP_BuildingScreen.blueprint
        ├── Defense/
        │   └── BP_DefenseShipyardScreen.blueprint
        └── UI/
            ├── BP_MainHUD.blueprint
            └── BP_GalaxyMapScreen.blueprint
```

---

## Core Systems

### Resources
- **Metal** — primary construction material; mined from planet surface
- **Crystal** — precision components; slower production
- **Deuterium** — fuel for fleets and Fusion Reactors
- **Energy** — produced by Solar Plants / Fusion Reactors; consumed by mines
- **Dark Matter** — premium currency (purchased or found on expeditions)

### Buildings (19 types)
| Category | Buildings |
|----------|-----------|
| Mining | Metal Mine, Crystal Mine, Deuterium Synthesizer |
| Energy | Solar Power Plant, Fusion Reactor |
| Storage | Metal Storage, Crystal Storage, Deuterium Tank |
| Production | Robotics Factory, Nanite Factory, Shipyard |
| Science | Research Lab, Intergalactic Research Network |
| Military | Alliance Depot, Missile Silo |
| Expansion | Terraformer, Space Dock |
| Moon Only | Lunar Base, Sensor Phalanx, Jump Gate |

### Research (16 technologies)
Espionage, Computer, Weapons, Shielding, Armour, Energy, Hyperspace,
Combustion Drive, Impulse Drive, Hyperspace Drive, Laser, Ion, Plasma,
Intergalactic Research Network, Astrophysics, Graviton.

### Ships (17 types)
Small Cargo, Large Cargo, Light Fighter, Heavy Fighter, Cruiser, Battleship,
Battlecruiser, Bomber, Destroyer, Death Star, Recycler, Espionage Probe,
Colony Ship, Crawler, Reaper, Pathfinder, Solar Satellite.

### Defense (10 types)
Rocket Launcher, Light Laser, Heavy Laser, Gauss Cannon, Ion Cannon,
Plasma Turret, Small Shield Dome, Large Shield Dome, ABM, IPM.

### Fleet Missions (11 types)
Attack, Transport, Deploy, Espionage, Colonize, Recycle, Destroy Moon,
Expedition, Return, ACS Defend, ACS Attack.

### Combat System
- Up to **6 rounds** of simultaneous fire
- Technology bonuses applied (Weapons / Shielding / Armour)
- Rapid-fire table (e.g., Death Star fires multiple times per round)
- **50% loot** cap; cargo capacity limits looting
- **Debris fields** contain 30% of destroyed ship cost in metal + crystal
- Full `FCombatReport` with per-round logs

### Espionage System
- Detail revealed based on Espionage Technology difference
- Level difference ≥ 2: Fleet revealed
- Level difference ≥ 3: Defense revealed  
- Level difference ≥ 5: Buildings revealed
- Level difference ≥ 7: Research revealed
- Counter-espionage chance formula: `(DefEsp / AttEsp)² × NumProbes / 100`

### Alliance System
- Create/disband alliances with a short tag
- Member roles: Leader, Deputy, Member, Recruit
- Diplomatic relations: Ally pacts, Non-Aggression Pacts (NAP)

### Text-Based UI
All game screens are rendered as formatted ASCII text by `UOGameTextUIManager`:
- Overview, Resources, Buildings, Research
- Shipyard, Defense, Fleet
- Galaxy map, Messages, Alliance, High Score, Combat/Espionage reports

---

## Blueprint Integration

All C++ systems are exposed to Unreal Engine 5 Blueprints:

### UOGameBlueprintLibrary (static functions)
```
Resources:  MakeResources, AddResources, SubtractResources, HasEnough, Scale
Coords:     MakeCoordinates, CoordinatesToString, CoordinatesEqual
Buildings:  GetBuildingUpgradeCost, GetBuildingDuration, GetBuildingName
Research:   GetResearchCost, GetResearchDuration, GetResearchName
Ships:      GetShipStats, CalculateTravelTime
Combat:     QuickBattleSim
Score:      ResourcesToPoints
Formatting: FormatGameNumber, FormatGameTimespan, FormatResourcesText
Planet:     GetPlanetSummary, GetHourlyProduction
```

### Blueprint Assets
All `BP_*.blueprint` files in `Content/Blueprints/` document the exact
node graphs used to connect C++ classes to the UE5 visual scripting system.

---

## Getting Started

### Prerequisites
- Unreal Engine 5.3+
- Visual Studio 2022 / Rider (Windows) or Xcode / Rider (Mac)
- C++ workload for game development

### Setup
1. Copy `src/OGameMMORPG/` to your UE5 projects folder
2. Right-click `OGameMMORPG.uproject` → **Generate Visual Studio project files**
3. Open the `.sln` and build `Development Editor`
4. Launch the editor: `OGameMMORPG.uproject`
5. In **Project Settings → Maps & Modes**, set:
   - Game Instance Class → `BP_OGameGameInstance`
   - Default Game Mode → `BP_OGameGameMode`

### Running a Dedicated Server
```bash
# Cook content
UnrealEditor.exe OGameMMORPG.uproject -run=cook -targetplatform=Linux -unversioned

# Start server
OGameMMORPGServer -log -port=7777 -MaxPlayers=1000
```

---

## Architecture Notes

- **Server-authoritative**: All game logic runs on the server. Clients send requests; server validates and replicates results.
- **Real-time with turn-based elements**: Resource production and building construction happen in real-time. Combat is resolved in discrete rounds but triggered by fleet arrival time.
- **Tick loops**: `UOGameGameInstance` sets up two recurring timers:
  - Production tick (every 3600 real-world seconds = 1 in-game hour)
  - Fleet movement tick (every 1 second for arrival checks)
- **Persistence**: Hook into `UOGameGameInstance::Init/Shutdown` to save/load from a database (Redis, PostgreSQL recommended).

---

## License
MIT — see root `LICENSE` file.
