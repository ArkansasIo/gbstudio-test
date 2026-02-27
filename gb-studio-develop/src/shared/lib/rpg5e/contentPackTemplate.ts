import {
  createDefaultDnd5eCompendiumData,
  type Dnd5eCompendiumData,
} from "./compendiumSchema";

export const createDnd5eContentPackTemplate = (): Dnd5eCompendiumData => {
  const data = createDefaultDnd5eCompendiumData();
  data.metadata.title = "DnD5e Detailed Input Pack";
  data.metadata.description =
    "Starter content template for rules, story crafting systems, and RPG data entry fields.";

  data.rules.push({
    id: "rule-action-economy",
    name: "Action Economy Baseline",
    slug: "action-economy-baseline",
    summary:
      "Defines action/bonus/reaction/movement structure for turn resolution.",
    tags: ["combat", "turn-structure"],
    sources: [
      {
        sourceId: "srd-5.1",
        sourceName: "SRD 5.1",
        section: "Combat",
        license: "srd",
      },
    ],
    prerequisites: [],
    rules: [
      {
        title: "Turn Components",
        summary: "Each turn allows one action, one bonus action, movement, and reaction windows.",
        mechanicalText:
          "Track action state flags per combatant and consume them when abilities resolve.",
      },
    ],
    domain: "combat",
    triggerConditions: ["combat_started", "turn_started"],
    resolutionSteps: [
      "Reset per-turn resources",
      "Process start-of-turn effects",
      "Await player/AI command",
      "Resolve action chain and end turn",
    ],
  });

  data.storyArcs.push({
    id: "arc-fallen-constellation",
    name: "The Fallen Constellation",
    slug: "the-fallen-constellation",
    summary: "Main campaign arc centered on restoring celestial wards.",
    tags: ["main", "mystery", "exploration"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [],
    rules: [],
    arcType: "main",
    themes: ["sacrifice", "legacy", "forbidden-magic"],
    startingState: "Ward network unstable; frontier towns under threat.",
    milestones: [
      "Recover first observatory lens",
      "Secure alliance with the Star Archivists",
      "Defeat void emissary in the eclipse chamber",
    ],
    climax: "Reforge the constellation core under siege.",
    outcomes: [
      "Wards restored and sky routes reopened",
      "Partial restoration with permanent regional anomalies",
      "Wards fail, unlocking hard-mode epilogue content",
    ],
  });

  data.quests.push({
    id: "quest-ironvine-supply-run",
    name: "Ironvine Supply Run",
    slug: "ironvine-supply-run",
    summary: "Escort and recover critical alchemical cargo.",
    tags: ["side", "escort", "crafting-hooks"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [{ type: "level", key: "characterLevel", value: 3 }],
    rules: [],
    questType: "side",
    requiredLevelMin: 3,
    objectives: [
      "Reach Ironvine Crossing before sundown",
      "Recover missing reagent crate",
      "Return safely to apothecary quarter",
    ],
    rewards: ["120 XP each", "Alchemy toolkit upgrade", "Faction reputation +1"],
    failStates: ["Cargo destroyed", "Escort NPC defeated"],
  });

  data.craftingRecipes.push({
    id: "recipe-lantern-salts",
    name: "Luminous Lantern Salts",
    slug: "luminous-lantern-salts",
    summary: "Consumable reagent for anti-shadow encounters.",
    tags: ["crafting", "alchemy", "consumable"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [{ type: "proficiency", key: "tools", value: "alchemists-supplies" }],
    rules: [],
    outputItemId: "item-lantern-salts",
    outputQuantity: 2,
    requiredToolProficiency: ["alchemists-supplies"],
    requiredMaterials: [
      { itemId: "item-moonshard-dust", quantity: 1 },
      { itemId: "item-silver-salt", quantity: 3 },
    ],
    requiredGoldCostGp: 25,
    requiredTimeDays: 1,
    requiredChecks: [{ ability: "intelligence", dc: 13, skill: "arcana" }],
    failureOutcome: "Half output and unstable batch side effect.",
  });

  data.encounters.push({
    id: "encounter-ruined-observatory",
    name: "Ruined Observatory Ambush",
    slug: "ruined-observatory-ambush",
    summary: "Medium-to-hard tactical encounter on elevated terrain.",
    tags: ["encounter", "terrain", "ambush"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [],
    rules: [],
    environment: "ruins",
    difficulty: "hard",
    partyLevelRange: [4, 6],
    recommendedPartySize: [3, 5],
    monsterIds: ["monster-shadow-scout", "monster-broken-sentinel"],
    tacticalNotes: [
      "High ground grants ranged advantage in first round.",
      "Collapsed stairs create chokepoint and forced movement risk.",
    ],
  });

  data.lootTables.push({
    id: "loot-ruins-tier2",
    name: "Ruins Tier 2",
    slug: "ruins-tier-2",
    summary: "Treasure outcomes for tier-2 ruin exploration.",
    tags: ["loot", "ruins", "tier2"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [],
    rules: [],
    rollFormula: "1d20",
    entries: [
      { minRoll: 1, maxRoll: 8, resultText: "Coins and minor supplies", quantity: "2d10 gp" },
      { minRoll: 9, maxRoll: 14, resultText: "Uncommon consumable", itemId: "item-lantern-salts", quantity: "1" },
      { minRoll: 15, maxRoll: 19, resultText: "Rare reagent cache", quantity: "1d4 reagents" },
      { minRoll: 20, maxRoll: 20, resultText: "Signature relic fragment" },
    ],
  });

  data.downtimeActivities.push({
    id: "downtime-archive-research",
    name: "Archive Research",
    slug: "archive-research",
    summary: "Research activity to unlock lore checks and quest shortcuts.",
    tags: ["downtime", "research", "lore"],
    sources: [{ sourceId: "custom", sourceName: "Campaign Design", license: "homebrew" }],
    prerequisites: [],
    rules: [],
    activityType: "research",
    requiredTimeDays: 2,
    requiredCostGp: 15,
    requiredChecks: [{ ability: "intelligence", dc: 14, skill: "history" }],
    outcomes: [
      "Reveal one hidden quest objective",
      "Gain advantage on first lore check in related region",
      "Unlock alternate faction dialogue branch",
    ],
  });

  return data;
};
