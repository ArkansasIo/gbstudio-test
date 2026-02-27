export type StoryAssetType =
  | "map"
  | "dungeon"
  | "npc"
  | "monster"
  | "item"
  | "weapon"
  | "armor"
  | "dialogue"
  | "cutscene"
  | "music"
  | "sfx"
  | "script"
  | "encounter"
  | "loot_table";

export type StoryClassTag =
  | "artificer"
  | "barbarian"
  | "bard"
  | "cleric"
  | "druid"
  | "fighter"
  | "monk"
  | "paladin"
  | "ranger"
  | "rogue"
  | "sorcerer"
  | "warlock"
  | "wizard";

export type QuestType = "main" | "side";
export type QuestObjectiveType = "talk" | "travel" | "combat" | "collect" | "craft" | "boss";
export type RewardTier = "minor" | "standard" | "major" | "epic";

export interface StoryReward {
  tier: RewardTier;
  xp: number;
  gold: number;
  itemRewards: string[];
  classRewards: Array<{ classTag: StoryClassTag; reward: string }>;
  unlockAssets: string[];
}

export interface StoryObjective {
  id: string;
  label: string;
  objectiveType: QuestObjectiveType;
  targetCount: number;
  optional: boolean;
}

export interface StoryQuest {
  id: string;
  actId: string;
  chapterId: string;
  type: QuestType;
  title: string;
  summary: string;
  levelRange: [number, number];
  requiredClasses: StoryClassTag[];
  requiredAssets: StoryAssetType[];
  objectives: StoryObjective[];
  reward: StoryReward;
  prerequisiteQuestIds: string[];
}

export interface StoryChapter {
  id: string;
  actId: string;
  title: string;
  synopsis: string;
  theme: string;
  levelRange: [number, number];
  mainQuestIds: string[];
  sideQuestIds: string[];
  assetBudget: Array<{ assetType: StoryAssetType; targetCount: number }>;
}

export interface StoryAct {
  id: string;
  title: string;
  premise: string;
  tone: "heroic" | "mystery" | "war" | "survival" | "mythic";
  levelRange: [number, number];
  chapterIds: string[];
}

export interface StoryEditorSystemsPack {
  metadata: {
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  acts: StoryAct[];
  chapters: StoryChapter[];
  mainQuests: StoryQuest[];
  sideQuests: StoryQuest[];
  assetTypes: StoryAssetType[];
  classTypes: StoryClassTag[];
  rewardTiers: RewardTier[];
}

const assetTypes: StoryAssetType[] = [
  "map",
  "dungeon",
  "npc",
  "monster",
  "item",
  "weapon",
  "armor",
  "dialogue",
  "cutscene",
  "music",
  "sfx",
  "script",
  "encounter",
  "loot_table",
];

const classTypes: StoryClassTag[] = [
  "artificer",
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];

const makeId = (prefix: string, n: number) => `${prefix}-${String(n).padStart(3, "0")}`;

const chapterTitle = (n: number) => `Chapter ${n}: Frontier Tension`;
const actTitle = (n: number) => `Act ${n}: Rising Convergence`;

const makeObjective = (
  questId: string,
  idx: number,
  objectiveType: QuestObjectiveType,
): StoryObjective => ({
  id: `${questId}-obj-${idx + 1}`,
  label: `Objective ${idx + 1} for ${questId}`,
  objectiveType,
  targetCount: idx === 0 ? 1 : 3 + idx,
  optional: idx === 3,
});

const makeReward = (seed: number, questType: QuestType): StoryReward => {
  const tier: RewardTier =
    questType === "main"
      ? (["standard", "major", "epic"] as const)[seed % 3]
      : (["minor", "standard", "major"] as const)[seed % 3];
  return {
    tier,
    xp: questType === "main" ? 300 + seed * 20 : 120 + seed * 10,
    gold: questType === "main" ? 80 + seed * 6 : 30 + seed * 4,
    itemRewards: [`reward-item-${(seed % 40) + 1}`, `reward-material-${(seed % 25) + 1}`],
    classRewards: [
      {
        classTag: classTypes[seed % classTypes.length],
        reward: `Class Feature Unlock ${((seed % 12) + 1).toString()}`,
      },
      {
        classTag: classTypes[(seed + 3) % classTypes.length],
        reward: `Class Technique ${((seed % 10) + 1).toString()}`,
      },
    ],
    unlockAssets: [`encounter-pack-${(seed % 20) + 1}`, `loot-table-${(seed % 16) + 1}`],
  };
};

const makeQuest = (
  n: number,
  type: QuestType,
  actId: string,
  chapterId: string,
  prerequisiteQuestIds: string[],
): StoryQuest => {
  const id = makeId(type === "main" ? "main-quest" : "side-quest", n);
  return {
    id,
    actId,
    chapterId,
    type,
    title: `${type === "main" ? "Main" : "Side"} Quest ${n}`,
    summary: `${type === "main" ? "Primary" : "Optional"} narrative objective with progression hooks, encounter setup, and reward path.`,
    levelRange: [1 + (n % 15), 3 + (n % 15)],
    requiredClasses: [
      classTypes[n % classTypes.length],
      classTypes[(n + 5) % classTypes.length],
    ],
    requiredAssets: [
      assetTypes[n % assetTypes.length],
      assetTypes[(n + 3) % assetTypes.length],
      assetTypes[(n + 7) % assetTypes.length],
      assetTypes[(n + 9) % assetTypes.length],
    ],
    objectives: [
      makeObjective(id, 0, "talk"),
      makeObjective(id, 1, "travel"),
      makeObjective(id, 2, type === "main" ? "combat" : "collect"),
      makeObjective(id, 3, type === "main" ? "boss" : "craft"),
    ],
    reward: makeReward(n, type),
    prerequisiteQuestIds,
  };
};

export const createStoryEditorSystemsPack200 = (): StoryEditorSystemsPack => {
  const actCount = 10;
  const chapterCount = 40;
  const mainQuestCount = 75;
  const sideQuestCount = 75;

  const acts: StoryAct[] = Array.from({ length: actCount }).map((_, idx) => {
    const id = makeId("act", idx + 1);
    const chapterStart = idx * 4 + 1;
    return {
      id,
      title: actTitle(idx + 1),
      premise: `Act ${idx + 1} escalates faction conflict and regional stakes.`,
      tone: (["heroic", "mystery", "war", "survival", "mythic"] as const)[idx % 5],
      levelRange: [1 + idx * 2, 8 + idx * 2],
      chapterIds: [
        makeId("chapter", chapterStart),
        makeId("chapter", chapterStart + 1),
        makeId("chapter", chapterStart + 2),
        makeId("chapter", chapterStart + 3),
      ],
    };
  });

  const chapters: StoryChapter[] = Array.from({ length: chapterCount }).map((_, idx) => {
    const chapterNum = idx + 1;
    const actNum = Math.floor(idx / 4) + 1;
    const actId = makeId("act", actNum);
    return {
      id: makeId("chapter", chapterNum),
      actId,
      title: chapterTitle(chapterNum),
      synopsis: `Chapter ${chapterNum} advances local conflicts and introduces new quest chains.`,
      theme: ["Intrigue", "Warfront", "Expedition", "Siege", "Revelation"][idx % 5],
      levelRange: [1 + (idx % 18), 4 + (idx % 18)],
      mainQuestIds: [],
      sideQuestIds: [],
      assetBudget: [
        { assetType: assetTypes[idx % assetTypes.length], targetCount: 4 + (idx % 5) },
        {
          assetType: assetTypes[(idx + 2) % assetTypes.length],
          targetCount: 3 + (idx % 4),
        },
        {
          assetType: assetTypes[(idx + 6) % assetTypes.length],
          targetCount: 2 + (idx % 3),
        },
      ],
    };
  });

  const mainQuests: StoryQuest[] = [];
  for (let n = 1; n <= mainQuestCount; n++) {
    const chapter = chapters[(n - 1) % chapters.length];
    const prerequisite =
      n > 1 && n % 3 !== 0 ? [makeId("main-quest", n - 1)] : [];
    const quest = makeQuest(n, "main", chapter.actId, chapter.id, prerequisite);
    mainQuests.push(quest);
    chapter.mainQuestIds.push(quest.id);
  }

  const sideQuests: StoryQuest[] = [];
  for (let n = 1; n <= sideQuestCount; n++) {
    const chapter = chapters[(n * 3 - 1) % chapters.length];
    const prerequisite = n % 5 === 0 ? [makeId("main-quest", Math.min(75, n))] : [];
    const quest = makeQuest(n, "side", chapter.actId, chapter.id, prerequisite);
    sideQuests.push(quest);
    chapter.sideQuestIds.push(quest.id);
  }

  const totalRecords = acts.length + chapters.length + mainQuests.length + sideQuests.length;
  if (totalRecords !== 200) {
    throw new Error(`Story editor pack must contain 200 records, got ${totalRecords}`);
  }

  const now = new Date().toISOString();
  return {
    metadata: {
      title: "Story Editor Systems Pack (200 Records)",
      description:
        "Detailed story-authoring systems with Acts, Chapters, Main Quests, Side Quests, asset requirements, class constraints, and rewards.",
      createdAt: now,
      updatedAt: now,
    },
    acts,
    chapters,
    mainQuests,
    sideQuests,
    assetTypes,
    classTypes,
    rewardTiers: ["minor", "standard", "major", "epic"],
  };
};

export const STORY_EDITOR_RECORD_COUNT = (() => {
  const pack = createStoryEditorSystemsPack200();
  return pack.acts.length + pack.chapters.length + pack.mainQuests.length + pack.sideQuests.length;
})();

