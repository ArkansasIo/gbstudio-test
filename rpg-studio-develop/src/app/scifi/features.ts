import { initAlienSpeciesDatabase } from "./features/AlienSpeciesDatabase";
import { initAnomalyEventSystem } from "./features/AnomalyEventSystem";
import { initCrewManagementSystem } from "./features/CrewManagementSystem";
import { initFactionDiplomacySystem } from "./features/FactionDiplomacySystem";
import { initFleetCommandSystem } from "./features/FleetCommandSystem";
import { initGalaxyMapEditor } from "./features/GalaxyMapEditor";
import { initHyperspaceNavigation } from "./features/HyperspaceNavigation";
import { initMissionContractSystem } from "./features/MissionContractSystem";
import { initPlanetarySystem } from "./features/PlanetarySystem";
import { initResourceMiningSystem } from "./features/ResourceMiningSystem";
import { initSciFiDialogueSystem } from "./features/SciFiDialogueSystem";
import { initSciFiModdingSupport } from "./features/SciFiModdingSupport";
import { initSciFiSaveLoadManager } from "./features/SciFiSaveLoadManager";
import { initShieldSystemsEditor } from "./features/ShieldSystemsEditor";
import { initShipCustomizationEditor } from "./features/ShipCustomizationEditor";
import { initSpaceCombatSystem } from "./features/SpaceCombatSystem";
import { initSpaceshipDesigner } from "./features/SpaceshipDesigner";
import { initSpaceStationBuilder } from "./features/SpaceStationBuilder";
import { initStealthSystemEditor } from "./features/StealthSystemEditor";
import { initTechnologyResearchTree } from "./features/TechnologyResearchTree";
import { initTradeRouteManager } from "./features/TradeRouteManager";
import { initWeaponSystemsEditor } from "./features/WeaponSystemsEditor";
import type { SciFiFeatureDefinition } from "./features/types";

export const SCIFI_FEATURE_DEFINITIONS: SciFiFeatureDefinition[] = [
  initSpaceshipDesigner(),
  initGalaxyMapEditor(),
  initAlienSpeciesDatabase(),
  initWeaponSystemsEditor(),
  initShieldSystemsEditor(),
  initTechnologyResearchTree(),
  initResourceMiningSystem(),
  initCrewManagementSystem(),
  initFactionDiplomacySystem(),
  initSpaceStationBuilder(),
  initMissionContractSystem(),
  initTradeRouteManager(),
  initSpaceCombatSystem(),
  initHyperspaceNavigation(),
  initPlanetarySystem(),
  initStealthSystemEditor(),
  initAnomalyEventSystem(),
  initShipCustomizationEditor(),
  initFleetCommandSystem(),
  initSciFiDialogueSystem(),
  initSciFiSaveLoadManager(),
  initSciFiModdingSupport(),
];

export const SCIFI_FEATURES = SCIFI_FEATURE_DEFINITIONS.map(
  (feature) => feature.name,
);
