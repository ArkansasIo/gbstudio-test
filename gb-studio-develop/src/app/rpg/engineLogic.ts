export type EngineLogicDomain =
  | "combat"
  | "world"
  | "progression"
  | "systems"
  | "runtime";

export interface EngineLogicToolDefinition {
  id: string;
  name: string;
  domain: EngineLogicDomain;
  description: string;
  functions: string[];
}

export const RPG_ENGINE_LOGIC_TOOLS: EngineLogicToolDefinition[] = [
  {
    id: "battle-runtime",
    name: "Battle Runtime",
    domain: "combat",
    description: "Runs turn order, skill resolution, and hit calculations.",
    functions: [
      "startBattle()",
      "queueTurn(actorId)",
      "resolveAction(actionId)",
      "applyDamage(targetId, value)",
      "endBattle(result)",
    ],
  },
  {
    id: "enemy-ai-runtime",
    name: "Enemy AI Runtime",
    domain: "combat",
    description: "Evaluates state machine decisions for enemies and bosses.",
    functions: [
      "evaluateAggro(enemyId)",
      "pickAbility(enemyId)",
      "scoreTargets(enemyId)",
      "tickBehaviorTree(enemyId)",
    ],
  },
  {
    id: "quest-runtime",
    name: "Quest Runtime",
    domain: "progression",
    description: "Tracks quest steps, gates, and reward claims.",
    functions: [
      "activateQuest(questId)",
      "advanceQuestStep(questId, stepId)",
      "isQuestComplete(questId)",
      "grantQuestRewards(questId)",
    ],
  },
  {
    id: "dialogue-runtime",
    name: "Dialogue Runtime",
    domain: "progression",
    description: "Runs branching dialogue and variable-conditioned choices.",
    functions: [
      "startDialogue(dialogueId)",
      "evaluateChoice(choiceId)",
      "setDialogueFlag(flagId, value)",
      "closeDialogue()",
    ],
  },
  {
    id: "inventory-runtime",
    name: "Inventory and Economy Runtime",
    domain: "systems",
    description: "Maintains items, stack limits, shops, and currency.",
    functions: [
      "addItem(itemId, amount)",
      "removeItem(itemId, amount)",
      "buyItem(shopId, itemId)",
      "sellItem(itemId, amount)",
      "recalculateCarryWeight()",
    ],
  },
  {
    id: "party-runtime",
    name: "Party and Stats Runtime",
    domain: "progression",
    description: "Computes stats from class, gear, buffs, and level curves.",
    functions: [
      "addPartyMember(actorId)",
      "removePartyMember(actorId)",
      "rebuildDerivedStats(actorId)",
      "awardExperience(actorId, value)",
      "levelUp(actorId)",
    ],
  },
  {
    id: "movement-runtime",
    name: "Movement and Pathfinding Runtime",
    domain: "world",
    description: "Handles grid and free movement, navigation, and collision.",
    functions: [
      "findPath(start, goal)",
      "moveActor(actorId, direction)",
      "checkCollision(actorId, tile)",
      "teleportActor(actorId, mapId, x, y)",
    ],
  },
  {
    id: "world-sim-runtime",
    name: "World Simulation Runtime",
    domain: "world",
    description: "Simulates time, weather, spawning, and encounter tables.",
    functions: [
      "setTimeOfDay(slot)",
      "tickWeatherSystem()",
      "rollEncounter(zoneId)",
      "spawnDynamicEvent(eventId)",
      "despawnDynamicEvent(eventId)",
    ],
  },
  {
    id: "save-runtime",
    name: "Save and Checkpoint Runtime",
    domain: "runtime",
    description: "Serializes game state, slots, autosave, and migration.",
    functions: [
      "createSaveSlot(slotId)",
      "writeAutosave()",
      "loadSave(slotId)",
      "migrateSaveData(version)",
    ],
  },
  {
    id: "script-runtime",
    name: "Script and Plugin Runtime",
    domain: "runtime",
    description: "Loads game scripts, plugins, and custom engine hooks.",
    functions: [
      "loadPlugin(pluginId)",
      "runScriptEvent(eventId)",
      "registerNativeHook(name, fn)",
      "validatePluginManifest(pluginId)",
    ],
  },
];

export const RPG_ENGINE_LOGIC = [
  "Turn-based and real-time battle systems",
  "Pathfinding for NPCs and monsters",
  "Day/Night and weather cycles",
  "Party management",
  "Equipment and stat calculation systems",
  "Leveling and experience point logic",
  "Quest tracking and completion logic",
  "Dialogue branching and variable tracking",
  "Random encounter and spawn logic",
  "Autosave and checkpoint logic",
  "Grid-based and free movement systems",
  "Dynamic lighting and shadow logic",
  "Multi-layer parallax backgrounds",
  "Physics/collision system",
  "Dynamic event spawning/despawning",
  "Advanced save data management",
  "In-game scripting API",
  "Real-time multiplayer logic",
  "Dynamic difficulty adjustment logic",
];

export const RPG_ENGINE_FUNCTIONS = RPG_ENGINE_LOGIC_TOOLS.flatMap(
  (tool) => tool.functions.map((fn) => `${tool.name}: ${fn}`),
);
