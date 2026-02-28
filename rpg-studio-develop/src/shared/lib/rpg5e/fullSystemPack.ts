import type { ConditionName } from "./conditions";
import type { Ability, Skill } from "./types";
import type {
  Dnd5eCompendiumData,
  DndBackgroundEntry,
  DndClassEntry,
  DndCraftingRecipeEntry,
  DndDowntimeActivityEntry,
  DndEncounterTemplateEntry,
  DndFactionEntry,
  DndFeatEntry,
  DndItemEntry,
  DndLocationEntry,
  DndLootTableEntry,
  DndMonsterEntry,
  DndQuestEntry,
  DndRuleSystemEntry,
  DndSpeciesEntry,
  DndSpellEntry,
  DndStoryArcEntry,
  DndSubclassEntry,
  RuleTextBlock,
  SourceReference,
} from "./compendiumSchema";

const abilities: Ability[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

const skills: Skill[] = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

const rule = (title: string, summary: string): RuleTextBlock => ({
  title,
  summary,
  mechanicalText: summary,
});

const source = (page: string): SourceReference => ({
  sourceId: "custom",
  sourceName: "Custom 5e-Compatible System Pack",
  page,
  section: "Core",
  license: "homebrew",
  notes: "Designed as editable seed data for editor workflows.",
});

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const base = (id: string, name: string, summary: string, tags: string[]) => ({
  id,
  name,
  slug: slugify(name),
  summary,
  tags,
  sources: [source(id)],
  prerequisites: [],
  rules: [rule("Overview", summary)],
  gmNotes: "",
});

const classNames = [
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
  "Warden",
  "Spellblade",
  "Tactician",
];

const weaponNames = [
  "Iron Shortsword",
  "Steel Longsword",
  "Oak Spear",
  "War Pick",
  "Battle Axe",
  "Knight Mace",
  "Hunting Bow",
  "Composite Bow",
  "Light Crossbow",
  "Heavy Crossbow",
  "Twin Daggers",
  "Halberd",
  "Pike",
  "Morningstar",
  "Whip",
  "Rapier",
];

const armorNames = [
  "Padded Vest",
  "Leather Coat",
  "Studded Leather",
  "Chain Shirt",
  "Scale Mail",
  "Breastplate",
  "Half Plate",
  "Ring Mail",
  "Chain Mail",
  "Splint Armor",
  "Plate Armor",
  "Tower Shield",
];

const itemNames = [
  "Potion of Mending",
  "Potion of Focus",
  "Potion of Swift Steps",
  "Traveler Rations",
  "Arcane Ink Kit",
  "Lockpick Set",
  "Alchemist Fire Flask",
  "Smokebomb Capsule",
  "Antitoxin Ampoule",
  "Rope Bundle",
  "Portable Camp Kit",
  "Signal Flare",
];

const monsterNames = [
  "Ashfang Drake",
  "Bog Mireling",
  "Bone Warden",
  "Clockwork Sentry",
  "Crypt Stalker",
  "Dune Howler",
  "Feral Troll",
  "Frost Lurker",
  "Ghast Knight",
  "Gloom Spider",
  "Harrow Bat Swarm",
  "Ironclad Ogre",
  "Marsh Hydra",
  "Night Hag Adept",
  "Obsidian Golem",
  "Plague Rat Alpha",
  "Rift Specter",
  "Runebound Guardian",
  "Scorch Basilisk",
  "Sea Wight",
  "Shadow Duelist",
  "Storm Wyvern",
  "Sunken Colossus",
  "Thornback Chimera",
  "Umbral Assassin",
  "Void Cultist",
  "Wailing Revenant",
  "Zephyr Roc",
];

const spellNames = [
  "Arc Bolt",
  "Aegis Ward",
  "Blooming Vines",
  "Blazing Lance",
  "Chain Spark",
  "Crystal Barrier",
  "Echo Step",
  "Ember Burst",
  "Frost Pin",
  "Guiding Pulse",
  "Iron Skin",
  "Lunar Spear",
  "Mist Veil",
  "Radiant Lash",
  "Rift Seal",
  "Shadow Bind",
  "Stone Grasp",
  "Tempest Orb",
  "Verdant Surge",
  "Void Lance",
];

export const createDnd5eFullSystemPack = (): Dnd5eCompendiumData => {
  const now = new Date().toISOString();

  const classes: DndClassEntry[] = classNames.map((name, idx) => ({
    ...base(`class-${idx + 1}`, name, `${name} progression and role package.`, [
      "class",
      "core",
    ]),
    hitDie: (["d6", "d8", "d10", "d12"] as const)[idx % 4],
    primaryAbilities: [abilities[idx % 6], abilities[(idx + 2) % 6]],
    savingThrowProficiencies: [abilities[idx % 6], abilities[(idx + 3) % 6]],
    skillChoices: [skills[idx % skills.length], skills[(idx + 4) % skills.length]],
    spellcastingProgression: (["none", "half", "full", "third", "pact"] as const)[
      idx % 5
    ],
    classFeatures: [
      { level: 1, featureName: `${name} Initiate`, description: "Core opening feature." },
      { level: 5, featureName: `${name} Adept`, description: "Mid-tier feature unlock." },
      { level: 11, featureName: `${name} Mastery`, description: "Advanced class feature." },
      { level: 17, featureName: `${name} Paragon`, description: "High-tier capstone path." },
    ],
  }));

  const subclasses: DndSubclassEntry[] = Array.from({ length: 16 }).map((_, idx) => {
    const parent = classes[idx % classes.length];
    return {
      ...base(
        `subclass-${idx + 1}`,
        `${parent.name} Path ${idx + 1}`,
        `Subclass specialization for ${parent.name}.`,
        ["subclass", parent.slug],
      ),
      classId: parent.id,
      subclassFeatureLevels: [3, 6, 10, 14],
    };
  });

  const species: DndSpeciesEntry[] = Array.from({ length: 12 }).map((_, idx) => ({
    ...base(
      `species-${idx + 1}`,
      `Ancestry ${idx + 1}`,
      `Playable species profile ${idx + 1}.`,
      ["species"],
    ),
    size: (["small", "medium", "medium", "large"] as const)[idx % 4],
    speedWalk: 25 + (idx % 3) * 5,
    speedFly: idx % 4 === 0 ? 30 : undefined,
    speedSwim: idx % 4 === 1 ? 30 : undefined,
    traits: [`Trait ${idx + 1}A`, `Trait ${idx + 1}B`],
    languages: ["Common", `Dialect-${idx + 1}`],
  }));

  const backgrounds: DndBackgroundEntry[] = Array.from({ length: 10 }).map(
    (_, idx) => ({
      ...base(
        `background-${idx + 1}`,
        `Background ${idx + 1}`,
        "Narrative and proficiency package.",
        ["background"],
      ),
      skillProficiencies: [skills[idx % skills.length], skills[(idx + 7) % skills.length]],
      toolProficiencies: [`Tool Set ${idx + 1}`],
      startingEquipment: [`Starting Kit ${idx + 1}`],
      roleplayHooks: [`Hook ${idx + 1}A`, `Hook ${idx + 1}B`],
    }),
  );

  const feats: DndFeatEntry[] = Array.from({ length: 14 }).map((_, idx) => ({
    ...base(`feat-${idx + 1}`, `Feat ${idx + 1}`, "Character advancement feat.", ["feat"]),
    featType: (["general", "origin", "epic-boon", "custom"] as const)[idx % 4],
    repeatable: idx % 3 === 0,
  }));

  const spells: DndSpellEntry[] = spellNames.map((name, idx) => ({
    ...base(`spell-${idx + 1}`, name, `${name} spell profile.`, ["spell"]),
    level: idx % 10,
    school: (
      [
        "abjuration",
        "conjuration",
        "divination",
        "enchantment",
        "evocation",
        "illusion",
        "necromancy",
        "transmutation",
      ] as const
    )[idx % 8],
    castingTime: "1 action",
    range: idx % 3 === 0 ? "Self" : "60 feet",
    components: ["V", "S"],
    duration: idx % 4 === 0 ? "Concentration, up to 1 minute" : "Instantaneous",
    ritual: idx % 5 === 0,
    concentration: idx % 4 === 0,
    classes: [classes[idx % classes.length].name, classes[(idx + 1) % classes.length].name],
    scalingText: "Scales by slot level.",
  }));

  const items: DndItemEntry[] = [
    ...weaponNames.map((name, idx) => ({
      ...base(`weapon-${idx + 1}`, name, `${name} weapon entry.`, ["weapon"]),
      itemType: "weapon" as const,
      rarity: (["common", "uncommon", "rare", "very-rare"] as const)[idx % 4],
      attunement: false,
      valueGp: 5 + idx * 10,
      weightLb: 1 + (idx % 8),
    })),
    ...armorNames.map((name, idx) => ({
      ...base(`armor-${idx + 1}`, name, `${name} armor entry.`, ["armor"]),
      itemType: "armor" as const,
      rarity: (["common", "uncommon", "rare"] as const)[idx % 3],
      attunement: false,
      valueGp: 20 + idx * 15,
      weightLb: 8 + idx * 2,
    })),
    ...itemNames.map((name, idx) => ({
      ...base(`item-${idx + 1}`, name, `${name} utility item entry.`, ["item"]),
      itemType: (["consumable", "wondrous", "tool", "adventuring-gear"] as const)[idx % 4],
      rarity: (["common", "uncommon", "rare"] as const)[idx % 3],
      attunement: idx % 5 === 0,
      valueGp: 2 + idx * 6,
      weightLb: 1 + (idx % 4),
    })),
  ];

  const conditions: ConditionName[] = [
    "blinded",
    "charmed",
    "deafened",
    "frightened",
    "grappled",
    "incapacitated",
    "invisible",
    "paralyzed",
    "petrified",
    "poisoned",
    "prone",
    "restrained",
    "stunned",
    "unconscious",
  ];

  const monsters: DndMonsterEntry[] = monsterNames.map((name, idx) => ({
    ...base(`monster-${idx + 1}`, name, `${name} bestiary profile.`, ["monster"]),
    size: (["small", "medium", "large", "huge"] as const)[idx % 4],
    creatureType: ["beast", "fiend", "aberration", "construct", "undead"][idx % 5],
    alignment: ["neutral", "chaotic evil", "lawful neutral", "unaligned"][idx % 4],
    armorClass: 11 + (idx % 10),
    hitPoints: 18 + idx * 9,
    speed: idx % 3 === 0 ? "30 ft., fly 40 ft." : "30 ft.",
    abilityScores: {
      strength: 8 + (idx % 12),
      dexterity: 8 + ((idx + 2) % 12),
      constitution: 8 + ((idx + 4) % 12),
      intelligence: 6 + ((idx + 1) % 12),
      wisdom: 7 + ((idx + 3) % 12),
      charisma: 6 + ((idx + 5) % 12),
    },
    challengeRating: `${(idx % 15) + 1}`,
    experienceValue: 200 + idx * 150,
    conditionImmunities: idx % 2 === 0 ? [conditions[idx % conditions.length]] : [],
  }));

  const rules: DndRuleSystemEntry[] = Array.from({ length: 10 }).map((_, idx) => ({
    ...base(
      `rule-${idx + 1}`,
      `System Rule ${idx + 1}`,
      "Subsystem rule block and resolution flow.",
      ["rule", "system"],
    ),
    domain: (
      [
        "combat",
        "exploration",
        "social",
        "magic",
        "downtime",
        "encounter-building",
        "treasure",
        "campaign",
        "custom",
        "combat",
      ] as const
    )[idx],
    triggerConditions: [`Trigger ${idx + 1}`],
    resolutionSteps: [`Step ${idx + 1}A`, `Step ${idx + 1}B`, `Step ${idx + 1}C`],
  }));

  const craftingRecipes: DndCraftingRecipeEntry[] = Array.from({ length: 6 }).map(
    (_, idx) => ({
      ...base(
        `recipe-${idx + 1}`,
        `Recipe ${idx + 1}`,
        "Crafting pipeline definition.",
        ["crafting"],
      ),
      outputItemId: items[idx].id,
      outputQuantity: 1 + (idx % 3),
      requiredToolProficiency: [`Craft Tool ${idx + 1}`],
      requiredMaterials: [
        { itemId: items[(idx + 1) % items.length].id, quantity: 2 + (idx % 4) },
      ],
      requiredGoldCostGp: 10 + idx * 25,
      requiredTimeDays: 1 + idx,
      requiredChecks: [{ ability: abilities[idx % 6], dc: 10 + idx, skill: skills[idx % skills.length] }],
      failureOutcome: "Materials partially consumed; attempt can be retried after rest.",
    }),
  );

  const storyArcs: DndStoryArcEntry[] = Array.from({ length: 3 }).map((_, idx) => ({
    ...base(`arc-${idx + 1}`, `Story Arc ${idx + 1}`, "Campaign story arc.", ["story"]),
    arcType: (["main", "side", "faction"] as const)[idx],
    themes: ["mystery", "politics", "survival"],
    startingState: "Regional tensions are escalating.",
    milestones: [`Milestone ${idx + 1}A`, `Milestone ${idx + 1}B`, `Milestone ${idx + 1}C`],
    climax: `Arc ${idx + 1} final confrontation.`,
    outcomes: ["Alliance forged", "Threat contained", "Power vacuum remains"],
  }));

  const quests: DndQuestEntry[] = Array.from({ length: 7 }).map((_, idx) => ({
    ...base(`quest-${idx + 1}`, `Quest ${idx + 1}`, "Quest definition block.", ["quest"]),
    questType: (["main", "side", "job", "faction", "character", "exploration", "side"] as const)[idx],
    offeredByNpcId: `npc-${idx + 1}`,
    requiredLevelMin: 1 + idx,
    objectives: [`Objective ${idx + 1}A`, `Objective ${idx + 1}B`],
    rewards: [`Reward ${idx + 1}A`, `${50 + idx * 25} gp`],
    failStates: ["Timer expired", "Critical NPC defeated"],
  }));

  const factions: DndFactionEntry[] = Array.from({ length: 4 }).map((_, idx) => ({
    ...base(`faction-${idx + 1}`, `Faction ${idx + 1}`, "Faction progression set.", ["faction"]),
    goals: [`Goal ${idx + 1}A`, `Goal ${idx + 1}B`],
    allies: [`Faction ${(idx + 1) % 4 + 1}`],
    rivals: [`Faction ${(idx + 2) % 4 + 1}`],
    reputationTiers: [
      { threshold: 10, name: "Known", rewards: ["Access to faction jobs"] },
      { threshold: 25, name: "Trusted", rewards: ["Discounted services"] },
      { threshold: 50, name: "Champion", rewards: ["Faction unique boon"] },
    ],
  }));

  const locations: DndLocationEntry[] = Array.from({ length: 5 }).map((_, idx) => ({
    ...base(`location-${idx + 1}`, `Location ${idx + 1}`, "Regional location entry.", ["location"]),
    locationType: (["city", "settlement", "dungeon", "wilderness", "landmark"] as const)[idx],
    region: `Region-${idx + 1}`,
    travelHooks: [`Hook ${idx + 1}A`, `Hook ${idx + 1}B`],
    pointsOfInterest: [`POI ${idx + 1}A`, `POI ${idx + 1}B`],
    encounterTableIds: [`encounter-${(idx % 4) + 1}`],
  }));

  const encounters: DndEncounterTemplateEntry[] = Array.from({ length: 4 }).map(
    (_, idx) => ({
      ...base(
        `encounter-${idx + 1}`,
        `Encounter Template ${idx + 1}`,
        "Encounter setup template.",
        ["encounter"],
      ),
      environment: ["forest", "ruins", "cavern", "city"][idx],
      difficulty: (["easy", "medium", "hard", "deadly"] as const)[idx],
      partyLevelRange: [1 + idx * 2, 4 + idx * 2],
      recommendedPartySize: [3, 5],
      monsterIds: [monsters[idx * 2].id, monsters[idx * 2 + 1].id],
      tacticalNotes: [`Tactic ${idx + 1}A`, `Tactic ${idx + 1}B`],
    }),
  );

  const lootTables: DndLootTableEntry[] = Array.from({ length: 3 }).map((_, idx) => ({
    ...base(`loot-${idx + 1}`, `Loot Table ${idx + 1}`, "Loot roll table.", ["loot"]),
    rollFormula: "1d100",
    entries: [
      { minRoll: 1, maxRoll: 40, resultText: "Common consumable", itemId: items[idx].id, quantity: "1d2" },
      { minRoll: 41, maxRoll: 75, resultText: "Uncommon gear", itemId: items[idx + 10].id, quantity: "1" },
      { minRoll: 76, maxRoll: 95, resultText: "Rare equipment", itemId: items[idx + 20].id, quantity: "1" },
      { minRoll: 96, maxRoll: 100, resultText: "Treasure cache", quantity: "2d6 x 10 gp" },
    ],
  }));

  const downtimeActivities: DndDowntimeActivityEntry[] = Array.from({ length: 2 }).map(
    (_, idx) => ({
      ...base(
        `downtime-${idx + 1}`,
        `Downtime Activity ${idx + 1}`,
        "Downtime activity workflow.",
        ["downtime"],
      ),
      activityType: (["crafting", "research"] as const)[idx],
      requiredTimeDays: 5 + idx * 3,
      requiredCostGp: 25 + idx * 30,
      requiredChecks: [{ ability: abilities[idx], dc: 12 + idx, skill: skills[idx] }],
      outcomes: ["Progress achieved", "Complication introduced", "Unexpected opportunity"],
    }),
  );

  const pack: Dnd5eCompendiumData = {
    schemaVersion: 1,
    metadata: {
      title: "DnD5e Full System Pack (200 Entries)",
      description:
        "Large, editable DnD5e-style system pack with classes, monsters, gear, and campaign systems.",
      campaignSetting: "High-Fantasy Shared Realm",
      sourcePolicy:
        "Homebrew structured data only. Add proprietary text only when properly licensed.",
      createdAt: now,
      updatedAt: now,
    },
    classes,
    subclasses,
    species,
    backgrounds,
    feats,
    spells,
    items,
    monsters,
    rules,
    craftingRecipes,
    storyArcs,
    quests,
    factions,
    locations,
    encounters,
    lootTables,
    downtimeActivities,
  };

  const total =
    pack.classes.length +
    pack.subclasses.length +
    pack.species.length +
    pack.backgrounds.length +
    pack.feats.length +
    pack.spells.length +
    pack.items.length +
    pack.monsters.length +
    pack.rules.length +
    pack.craftingRecipes.length +
    pack.storyArcs.length +
    pack.quests.length +
    pack.factions.length +
    pack.locations.length +
    pack.encounters.length +
    pack.lootTables.length +
    pack.downtimeActivities.length;

  if (total !== 200) {
    throw new Error(`Full system pack must contain exactly 200 entries, got ${total}`);
  }

  return pack;
};

