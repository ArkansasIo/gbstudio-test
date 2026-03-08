import { SCIFI_ENGINE_SYSTEMS } from "./engineSystems";
import { SCIFI_MENU_TREE } from "./menuTree";
import type { SciFiToolInputDefinition } from "./types";

const dedupeTools = (
  tools: SciFiToolInputDefinition[],
): SciFiToolInputDefinition[] => {
  const map = new Map<string, SciFiToolInputDefinition>();
  tools.forEach((tool) => {
    if (!map.has(tool.id)) {
      map.set(tool.id, tool);
    }
  });
  return [...map.values()];
};

const menuTools = SCIFI_MENU_TREE.flatMap((menu) =>
  menu.subMenus.flatMap((subMenu) => subMenu.tools),
);

const engineTools = SCIFI_ENGINE_SYSTEMS.flatMap((system) => system.tools);

export const SCIFI_COMPLETE_TOOLSET: SciFiToolInputDefinition[] = dedupeTools([
  // Core editor tools
  { id: "galaxy-map-editor", label: "Galaxy Map Editor", category: "authoring", description: "Build and edit the galaxy with star systems, sectors, and travel routes." },
  { id: "star-system-editor", label: "Star System Editor", category: "authoring", description: "Place stars, planets, moons, stations, and anomalies in a system." },
  { id: "planet-surface-editor", label: "Planet Surface Editor", category: "authoring", description: "Paint terrain, biomes, settlements, and points of interest." },
  { id: "space-station-designer", label: "Space Station Designer", category: "authoring", description: "Assemble modular station layouts with docking bays and services." },

  // Ship design
  { id: "ship-hull-designer", label: "Ship Hull Designer", category: "authoring", description: "Define hull geometry, hardpoint slots, and compartment layout." },
  { id: "ship-loadout-editor", label: "Ship Loadout Editor", category: "authoring", description: "Equip weapons, modules, and systems into hull slots." },
  { id: "ship-stats-calculator", label: "Ship Stats Calculator", category: "authoring", description: "Derives combined stats from hull and installed modules." },
  { id: "ship-fleet-composer", label: "Fleet Composer", category: "authoring", description: "Assemble named fleets from ship instances for scenario use." },

  // Weapon and defense
  { id: "weapon-database", label: "Weapon Database", category: "authoring", description: "Define ballistic, energy, and missile weapon stats and behaviours." },
  { id: "shield-generator-editor", label: "Shield Generator Editor", category: "authoring", description: "Configure shield capacity, recharge, and facing distribution." },
  { id: "armor-plate-editor", label: "Armor Plate Editor", category: "authoring", description: "Set armor values, resistances, and ablative properties." },
  { id: "missile-system-editor", label: "Missile System Editor", category: "authoring", description: "Define missile payloads, guidance types, and countermeasure ratings." },
  { id: "point-defense-editor", label: "Point Defense Editor", category: "authoring", description: "Configure auto-targeting turrets and interception ranges." },

  // Combat systems
  { id: "combat-encounter-designer", label: "Combat Encounter Designer", category: "authoring", description: "Compose fleet encounters with faction, position, and objective rules." },
  { id: "targeting-system-editor", label: "Targeting System Editor", category: "authoring", description: "Define lock-on profiles, jamming resistance, and subsystem targeting." },
  { id: "damage-formula-lab", label: "Damage Formula Lab", category: "debug", description: "Test hull and shield damage formulas across weapon and armor combinations." },
  { id: "battle-replay-viewer", label: "Battle Replay Viewer", category: "debug", description: "Replay recorded combat encounters for analysis and tuning." },

  // Crew and characters
  { id: "crew-character-database", label: "Crew Character Database", category: "authoring", description: "Manage crew member profiles, skill trees, and trait assignments." },
  { id: "crew-assignment-editor", label: "Crew Assignment Editor", category: "authoring", description: "Map crew to ship stations and manage shift schedules." },
  { id: "crew-dialogue-editor", label: "Crew Dialogue Editor", category: "authoring", description: "Author branching dialogue and relationship conversations." },
  { id: "crew-skill-tree-editor", label: "Crew Skill Tree Editor", category: "authoring", description: "Design skill progression paths and unlock requirements." },
  { id: "morale-event-editor", label: "Morale Event Editor", category: "authoring", description: "Create morale-affecting ship events and crew reaction scripts." },

  // Research and technology
  { id: "tech-tree-canvas", label: "Tech Tree Canvas", category: "authoring", description: "Lay out technology research nodes and prerequisite chains." },
  { id: "research-project-editor", label: "Research Project Editor", category: "authoring", description: "Define research time, cost, and unlock effects for each technology." },
  { id: "upgrade-path-editor", label: "Upgrade Path Editor", category: "authoring", description: "Create tiered upgrade chains for weapons, modules, and crew." },
  { id: "lab-capacity-planner", label: "Lab Capacity Planner", category: "authoring", description: "Balance research lab slots against active project queue." },

  // Missions and quests
  { id: "mission-designer", label: "Mission Designer", category: "authoring", description: "Create multi-objective missions with branching success/failure conditions." },
  { id: "contract-board-editor", label: "Contract Board Editor", category: "authoring", description: "Author repeatable contracts with randomised parameters." },
  { id: "objective-tracker-editor", label: "Objective Tracker Editor", category: "authoring", description: "Define objective markers, progress thresholds, and UI displays." },
  { id: "reward-table-editor", label: "Reward Table Editor", category: "authoring", description: "Configure credit, reputation, and item rewards for mission completion." },

  // UI and presentation
  { id: "hud-layout-editor", label: "HUD Layout Editor", category: "authoring", description: "Position and configure in-flight HUD elements and overlays." },
  { id: "menu-theme-editor", label: "Menu Theme Editor", category: "authoring", description: "Customise menu colours, fonts, and background assets." },
  { id: "portrait-manager", label: "Portrait Manager", category: "content", description: "Manage character portraits and expression variants." },
  { id: "icon-atlas-editor", label: "Icon Atlas Editor", category: "content", description: "Map icon IDs to weapon, item, and status UI entries." },
  { id: "cutscene-timeline", label: "Cutscene Timeline", category: "authoring", description: "Sequence camera, dialogue, and ship movement in cutscenes." },

  // Audio and effects
  { id: "audio-manager", label: "Audio Manager", category: "content", description: "Organise music, ambient, and sound-effect asset groups." },
  { id: "ambient-soundscape-editor", label: "Ambient Soundscape Editor", category: "content", description: "Layer space ambience tracks and environmental audio." },
  { id: "weapon-sfx-editor", label: "Weapon SFX Editor", category: "authoring", description: "Bind firing, impact, and explosion sounds to weapon profiles." },
  { id: "engine-thruster-sfx-editor", label: "Engine Thruster SFX Editor", category: "authoring", description: "Configure thruster audio responses to speed and manoeuvre states." },
  { id: "music-transition-editor", label: "Music Transition Editor", category: "content", description: "Set combat, exploration, and station music cue transitions." },

  // Debug and QA
  { id: "playtest-runner", label: "Playtest Runner", category: "debug", description: "Launch the game with current state for rapid iteration testing." },
  { id: "combat-stress-tester", label: "Combat Stress Tester", category: "debug", description: "Run thousands of combat iterations to surface balance outliers." },
  { id: "nav-pathfinding-debugger", label: "Nav Pathfinding Debugger", category: "debug", description: "Visualise hyperspace route calculations and blocked paths." },
  { id: "save-state-inspector", label: "Save State Inspector", category: "debug", description: "Inspect and modify live save data fields during testing." },
  { id: "event-trace-viewer", label: "Event Trace Viewer", category: "debug", description: "Trace mission and scripted event execution step by step." },
  { id: "faction-relation-debugger", label: "Faction Relation Debugger", category: "debug", description: "Display live relation scores and trigger history between factions." },
  { id: "asset-usage-auditor", label: "Asset Usage Auditor", category: "debug", description: "Identify unused or duplicate audio, texture, and data assets." },
  { id: "translation-validator", label: "Translation Validator", category: "debug", description: "Detect missing or overflowing localisation string entries." },

  // Build and deployment
  { id: "build-pipeline-manager", label: "Build Pipeline Manager", category: "build", description: "Configure and execute multi-platform build and packaging pipelines." },
  { id: "patch-dlc-manager", label: "Patch and DLC Manager", category: "build", description: "Prepare incremental content patches and DLC bundles." },
  { id: "localisation-export-tool", label: "Localisation Export Tool", category: "build", description: "Export string tables for external translation workflows." },
  { id: "release-notes-generator", label: "Release Notes Generator", category: "build", description: "Auto-generates patch notes from commit and diff history." },

  ...menuTools,
  ...engineTools,
]);
