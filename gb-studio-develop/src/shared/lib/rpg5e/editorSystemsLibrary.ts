import {
  createDefaultRPG5EData,
  type RPG5EData,
  type RPGCategoryKey,
  type RPGEntry,
} from "./editorData";
import { createDnd5eFullSystemPack } from "./fullSystemPack";
import { createStoryEditorSystemsPack200 } from "./storyEditorSystems";

export interface Dnd5eEditorSystemDefinition {
  id: RPGCategoryKey;
  label: string;
  description: string;
}

const systemDefinitions: Dnd5eEditorSystemDefinition[] = [
  { id: "maps", label: "Maps", description: "World and region map entries." },
  { id: "dungeons", label: "Dungeons", description: "Dungeon location and crawl entries." },
  { id: "zones", label: "Zones", description: "Gameplay zone segmentation data." },
  { id: "biomes", label: "Biomes", description: "Biome/environment tagging entries." },
  { id: "weapons", label: "Weapons", description: "Weapon database records." },
  { id: "armors", label: "Armors", description: "Armor database records." },
  { id: "items", label: "Items", description: "General item and consumable records." },
  { id: "monsters", label: "Monsters", description: "Bestiary monster entries." },
  { id: "characters", label: "Characters", description: "Player and NPC character templates." },
  { id: "classes", label: "Classes", description: "Class and subclass progression data." },
  { id: "races", label: "Races", description: "Species/race playable entries." },
  { id: "spells", label: "Spells", description: "Spell compendium entries." },
  { id: "quests", label: "Quests", description: "Main and side quest definitions." },
  { id: "npcs", label: "NPCs", description: "NPC role and quest giver entries." },
  { id: "factions", label: "Factions", description: "Faction and reputation structures." },
  { id: "encounters", label: "Encounters", description: "Encounter templates and notes." },
  { id: "lootTables", label: "Loot Tables", description: "Loot roll table entries." },
];

const buildEntry = (
  id: string,
  name: string,
  notes: string,
  tags: string[],
  fields: Record<string, string | number | boolean>,
): RPGEntry => ({
  id,
  name,
  notes,
  tags,
  fields,
});

const toNpcId = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildCategorySeeds = (): Record<RPGCategoryKey, RPGEntry[]> => {
  const pack = createDnd5eFullSystemPack();
  const story = createStoryEditorSystemsPack200();

  const maps: RPGEntry[] = pack.locations.map((location) =>
    buildEntry(
      `map-${location.id}`,
      `${location.name} Map`,
      location.summary,
      ["map", ...location.tags],
      {
        region: location.region,
        locationType: location.locationType,
        pointCount: location.pointsOfInterest.length,
      },
    ),
  );

  const dungeons: RPGEntry[] = pack.locations
    .filter((location) => location.locationType === "dungeon")
    .map((location) =>
      buildEntry(
        `dungeon-${location.id}`,
        location.name,
        location.summary,
        ["dungeon", ...location.tags],
        {
          region: location.region,
          encounterTableCount: location.encounterTableIds.length,
        },
      ),
    );

  const zones: RPGEntry[] = story.chapters.map((chapter) =>
    buildEntry(
      `zone-${chapter.id}`,
      `${chapter.title} Zone`,
      chapter.synopsis,
      ["zone", chapter.theme.toLowerCase()],
      {
        actId: chapter.actId,
        chapterId: chapter.id,
        minLevel: chapter.levelRange[0],
        maxLevel: chapter.levelRange[1],
      },
    ),
  );

  const biomes: RPGEntry[] = ["forest", "mountain", "desert", "swamp", "coast", "urban"].map(
    (biome, idx) =>
      buildEntry(
        `biome-${idx + 1}`,
        biome[0].toUpperCase() + biome.slice(1),
        `${biome} biome profile for encounter and weather tuning.`,
        ["biome", biome],
        {
          hazardRating: 1 + (idx % 5),
          resourceDensity: 2 + (idx % 4),
        },
      ),
  );

  const weapons: RPGEntry[] = pack.items
    .filter((item) => item.itemType === "weapon")
    .map((item) =>
      buildEntry(item.id, item.name, item.summary, ["weapon", ...item.tags], {
        rarity: item.rarity,
        attunement: item.attunement,
        valueGp: item.valueGp ?? 0,
        weightLb: item.weightLb ?? 0,
      }),
    );

  const armors: RPGEntry[] = pack.items
    .filter((item) => item.itemType === "armor")
    .map((item) =>
      buildEntry(item.id, item.name, item.summary, ["armor", ...item.tags], {
        rarity: item.rarity,
        attunement: item.attunement,
        valueGp: item.valueGp ?? 0,
        weightLb: item.weightLb ?? 0,
      }),
    );

  const items: RPGEntry[] = pack.items
    .filter((item) => item.itemType !== "weapon" && item.itemType !== "armor")
    .map((item) =>
      buildEntry(item.id, item.name, item.summary, ["item", ...item.tags], {
        itemType: item.itemType,
        rarity: item.rarity,
        attunement: item.attunement,
        valueGp: item.valueGp ?? 0,
      }),
    );

  const monsters: RPGEntry[] = pack.monsters.map((monster) =>
    buildEntry(monster.id, monster.name, monster.summary, ["monster", ...monster.tags], {
      size: monster.size,
      creatureType: monster.creatureType,
      challengeRating: monster.challengeRating,
      armorClass: monster.armorClass,
      hitPoints: monster.hitPoints,
      experienceValue: monster.experienceValue,
    }),
  );

  const classes: RPGEntry[] = [
    ...pack.classes.map((entry) =>
      buildEntry(entry.id, entry.name, entry.summary, ["class", ...entry.tags], {
        hitDie: entry.hitDie,
        spellcastingProgression: entry.spellcastingProgression,
        featureCount: entry.classFeatures.length,
      }),
    ),
    ...pack.subclasses.map((entry) =>
      buildEntry(entry.id, entry.name, entry.summary, ["subclass", ...entry.tags], {
        classId: entry.classId,
        featureLevels: entry.subclassFeatureLevels.join(","),
      }),
    ),
  ];

  const races: RPGEntry[] = pack.species.map((entry) =>
    buildEntry(entry.id, entry.name, entry.summary, ["species", ...entry.tags], {
      size: entry.size,
      speedWalk: entry.speedWalk,
      speedFly: entry.speedFly ?? 0,
      speedSwim: entry.speedSwim ?? 0,
    }),
  );

  const spells: RPGEntry[] = pack.spells.map((entry) =>
    buildEntry(entry.id, entry.name, entry.summary, ["spell", ...entry.tags], {
      level: entry.level,
      school: entry.school,
      ritual: entry.ritual,
      concentration: entry.concentration,
      duration: entry.duration,
    }),
  );

  const quests: RPGEntry[] = [
    ...pack.quests.map((entry) =>
      buildEntry(entry.id, entry.name, entry.summary, ["quest", ...entry.tags], {
        questType: entry.questType,
        objectiveCount: entry.objectives.length,
        rewardCount: entry.rewards.length,
      }),
    ),
    ...story.mainQuests.map((entry) =>
      buildEntry(entry.id, entry.title, entry.summary, ["main-quest", ...entry.requiredClasses], {
        actId: entry.actId,
        chapterId: entry.chapterId,
        minLevel: entry.levelRange[0],
        maxLevel: entry.levelRange[1],
        rewardTier: entry.reward.tier,
      }),
    ),
    ...story.sideQuests.map((entry) =>
      buildEntry(entry.id, entry.title, entry.summary, ["side-quest", ...entry.requiredClasses], {
        actId: entry.actId,
        chapterId: entry.chapterId,
        minLevel: entry.levelRange[0],
        maxLevel: entry.levelRange[1],
        rewardTier: entry.reward.tier,
      }),
    ),
  ];

  const npcs: RPGEntry[] = Array.from(
    new Set(
      [
        ...pack.quests.map((entry) => entry.offeredByNpcId).filter(Boolean),
        ...story.mainQuests.map((entry) => `npc-${entry.chapterId}`),
        ...story.sideQuests.map((entry) => `npc-${entry.chapterId}`),
      ] as string[],
    ),
  ).map((npcId, idx) =>
    buildEntry(
      toNpcId(npcId),
      `NPC ${idx + 1}`,
      "Quest giver / narrative support character.",
      ["npc"],
      {
        npcId,
        role: idx % 2 === 0 ? "quest-giver" : "support",
        chapterAffinity: `chapter-${(idx % 40) + 1}`,
      },
    ),
  );

  const factions: RPGEntry[] = pack.factions.map((entry) =>
    buildEntry(entry.id, entry.name, entry.summary, ["faction", ...entry.tags], {
      allyCount: entry.allies.length,
      rivalCount: entry.rivals.length,
      reputationTiers: entry.reputationTiers.length,
    }),
  );

  const encounters: RPGEntry[] = pack.encounters.map((entry) =>
    buildEntry(entry.id, entry.name, entry.summary, ["encounter", ...entry.tags], {
      difficulty: entry.difficulty,
      environment: entry.environment,
      minPartyLevel: entry.partyLevelRange[0],
      maxPartyLevel: entry.partyLevelRange[1],
      monsterCount: entry.monsterIds.length,
    }),
  );

  const lootTables: RPGEntry[] = pack.lootTables.map((entry) =>
    buildEntry(entry.id, entry.name, entry.summary, ["loot-table", ...entry.tags], {
      rollFormula: entry.rollFormula,
      entryCount: entry.entries.length,
    }),
  );

  const characters: RPGEntry[] = pack.classes.map((entry, idx) =>
    buildEntry(
      `character-template-${idx + 1}`,
      `${entry.name} Template`,
      `Starter character template for ${entry.name}.`,
      ["character", entry.name.toLowerCase()],
      {
        classId: entry.id,
        level: 1,
        statFocus: entry.primaryAbilities.join(","),
      },
    ),
  );

  return {
    maps,
    dungeons,
    zones,
    biomes,
    weapons,
    armors,
    items,
    monsters,
    characters,
    classes,
    races,
    spells,
    quests,
    npcs,
    factions,
    encounters,
    lootTables,
  };
};

export const DND5E_EDITOR_SYSTEM_DEFINITIONS = systemDefinitions;

export const createDnd5eEditorSystemsLibraryData = (): RPG5EData => {
  const data = createDefaultRPG5EData();
  const seeds = buildCategorySeeds();
  (Object.keys(seeds) as RPGCategoryKey[]).forEach((key) => {
    data.categories[key] = seeds[key];
  });
  return data;
};

export const getDnd5eEditorSystemEntries = (
  category: RPGCategoryKey,
): RPGEntry[] => createDnd5eEditorSystemsLibraryData().categories[category];

