import type { RPGEngineSystemInputDefinition } from "./types";

export const RPG_ENGINE_SYSTEMS: RPGEngineSystemInputDefinition[] = [
  {
    id: "battle-runtime",
    name: "Battle Runtime",
    domain: "combat",
    summary: "Runs turn order, skill resolution, and hit calculations.",
    tools: [
      {
        id: "battle-orchestrator",
        label: "Battle Orchestrator",
        category: "runtime",
        description: "Coordinates battle start/turn/end phases.",
      },
      {
        id: "damage-calculator",
        label: "Damage Calculator",
        category: "runtime",
        description: "Computes final damage with modifiers.",
      },
    ],
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
    summary: "Evaluates state machine decisions for enemies and bosses.",
    tools: [
      {
        id: "behavior-tree-evaluator",
        label: "Behavior Tree Evaluator",
        category: "runtime",
        description: "Ticks behavior graphs and priorities.",
      },
      {
        id: "target-scoring",
        label: "Target Scoring Tool",
        category: "runtime",
        description: "Ranks targets by threat and utility.",
      },
    ],
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
    summary: "Tracks quest steps, gates, and reward claims.",
    tools: [
      {
        id: "quest-state-machine",
        label: "Quest State Machine",
        category: "runtime",
        description: "Maintains active/failed/completed states.",
      },
      {
        id: "reward-pipeline",
        label: "Reward Pipeline",
        category: "runtime",
        description: "Distributes item/xp/currency rewards.",
      },
    ],
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
    summary: "Runs branching dialogue and variable-conditioned choices.",
    tools: [
      {
        id: "dialogue-branch-runner",
        label: "Dialogue Branch Runner",
        category: "runtime",
        description: "Evaluates branch conditions and transitions.",
      },
      {
        id: "choice-condition-checker",
        label: "Choice Condition Checker",
        category: "runtime",
        description: "Validates variable and flag conditions.",
      },
    ],
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
    summary: "Maintains items, stack limits, shops, and currency.",
    tools: [
      {
        id: "item-ledger",
        label: "Item Ledger",
        category: "runtime",
        description: "Tracks add/remove operations and stack limits.",
      },
      {
        id: "shop-pricing",
        label: "Shop Pricing Rules",
        category: "runtime",
        description: "Applies economy modifiers and taxes.",
      },
    ],
    functions: [
      "addItem(itemId, amount)",
      "removeItem(itemId, amount)",
      "buyItem(shopId, itemId)",
      "sellItem(itemId, amount)",
      "recalculateCarryWeight()",
    ],
  },
  {
    id: "movement-runtime",
    name: "Movement and Pathfinding Runtime",
    domain: "world",
    summary: "Handles grid and free movement, navigation, and collision.",
    tools: [
      {
        id: "path-graph",
        label: "Path Graph",
        category: "runtime",
        description: "Builds and queries navigation graphs.",
      },
      {
        id: "collision-gate",
        label: "Collision Gate",
        category: "runtime",
        description: "Filters movement by collider and layer.",
      },
    ],
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
    summary: "Simulates time, weather, spawning, and encounter tables.",
    tools: [
      {
        id: "weather-sequencer",
        label: "Weather Sequencer",
        category: "runtime",
        description: "Cycles weather states and transitions.",
      },
      {
        id: "encounter-roller",
        label: "Encounter Roller",
        category: "runtime",
        description: "Rolls random encounter tables per zone.",
      },
    ],
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
    summary: "Serializes game state, slots, autosave, and migration.",
    tools: [
      {
        id: "save-serializer",
        label: "Save Serializer",
        category: "runtime",
        description: "Writes save payload with schema version.",
      },
      {
        id: "migration-assistant",
        label: "Migration Assistant",
        category: "runtime",
        description: "Converts old save structures safely.",
      },
    ],
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
    summary: "Loads game scripts, plugins, and custom engine hooks.",
    tools: [
      {
        id: "plugin-loader",
        label: "Plugin Loader",
        category: "runtime",
        description: "Loads and validates plugin bundles.",
      },
      {
        id: "event-dispatcher",
        label: "Event Dispatcher",
        category: "runtime",
        description: "Runs scripted events and native hooks.",
      },
    ],
    functions: [
      "loadPlugin(pluginId)",
      "runScriptEvent(eventId)",
      "registerNativeHook(name, fn)",
      "validatePluginManifest(pluginId)",
    ],
  },
];
