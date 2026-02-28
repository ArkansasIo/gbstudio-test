import type { ConditionName } from "./conditions";
import type { Ability, Skill } from "./types";

export type Dnd5eSourceId =
  | "srd-5.1"
  | "basic-rules-2014"
  | "players-handbook-2014"
  | "dungeon-masters-guide-2014"
  | "monster-manual-2014"
  | "xanathars-guide-to-everything"
  | "tashas-cauldron-of-everything"
  | "mordenkainen-presents-monsters-of-the-multiverse"
  | "fizbans-treasury-of-dragons"
  | "van-richtens-guide-to-ravenloft"
  | "players-handbook-2024"
  | "dungeon-masters-guide-2024"
  | "monster-manual-2024"
  | "custom";

export type ContentLicense = "srd" | "basic-rules" | "licensed" | "homebrew";

export interface SourceReference {
  sourceId: Dnd5eSourceId;
  sourceName: string;
  page?: string;
  section?: string;
  license: ContentLicense;
  notes?: string;
}

export interface RuleTextBlock {
  title: string;
  summary: string;
  mechanicalText: string;
}

export interface PrerequisiteRule {
  type:
    | "level"
    | "class"
    | "subclass"
    | "abilityScore"
    | "proficiency"
    | "feat"
    | "species"
    | "background"
    | "alignment"
    | "custom";
  key: string;
  value: string | number | boolean;
}

export interface CompendiumEntryBase {
  id: string;
  name: string;
  slug: string;
  summary: string;
  tags: string[];
  sources: SourceReference[];
  prerequisites: PrerequisiteRule[];
  rules: RuleTextBlock[];
  gmNotes?: string;
}

export interface ClassProgressionFeature {
  level: number;
  featureName: string;
  description: string;
}

export interface DndClassEntry extends CompendiumEntryBase {
  hitDie: "d6" | "d8" | "d10" | "d12";
  primaryAbilities: Ability[];
  savingThrowProficiencies: Ability[];
  skillChoices: Skill[];
  spellcastingProgression: "none" | "full" | "half" | "third" | "pact";
  classFeatures: ClassProgressionFeature[];
}

export interface DndSubclassEntry extends CompendiumEntryBase {
  classId: string;
  subclassFeatureLevels: number[];
}

export interface DndSpeciesEntry extends CompendiumEntryBase {
  size: "tiny" | "small" | "medium" | "large";
  speedWalk: number;
  speedFly?: number;
  speedSwim?: number;
  traits: string[];
  languages: string[];
}

export interface DndBackgroundEntry extends CompendiumEntryBase {
  skillProficiencies: Skill[];
  toolProficiencies: string[];
  startingEquipment: string[];
  roleplayHooks: string[];
}

export interface DndFeatEntry extends CompendiumEntryBase {
  featType: "general" | "origin" | "epic-boon" | "custom";
  repeatable: boolean;
}

export interface DndSpellEntry extends CompendiumEntryBase {
  level: number;
  school:
    | "abjuration"
    | "conjuration"
    | "divination"
    | "enchantment"
    | "evocation"
    | "illusion"
    | "necromancy"
    | "transmutation";
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  ritual: boolean;
  concentration: boolean;
  classes: string[];
  scalingText?: string;
}

export interface DndItemEntry extends CompendiumEntryBase {
  itemType:
    | "weapon"
    | "armor"
    | "consumable"
    | "wondrous"
    | "tool"
    | "adventuring-gear"
    | "currency"
    | "custom";
  rarity:
    | "common"
    | "uncommon"
    | "rare"
    | "very-rare"
    | "legendary"
    | "artifact"
    | "varies";
  attunement: boolean;
  valueGp?: number;
  weightLb?: number;
}

export interface DndMonsterEntry extends CompendiumEntryBase {
  size: "tiny" | "small" | "medium" | "large" | "huge" | "gargantuan";
  creatureType: string;
  alignment: string;
  armorClass: number;
  hitPoints: number;
  speed: string;
  abilityScores: Record<Ability, number>;
  challengeRating: string;
  experienceValue: number;
  conditionImmunities: ConditionName[];
}

export interface DndRuleSystemEntry extends CompendiumEntryBase {
  domain:
    | "combat"
    | "exploration"
    | "social"
    | "magic"
    | "downtime"
    | "encounter-building"
    | "treasure"
    | "campaign"
    | "custom";
  triggerConditions: string[];
  resolutionSteps: string[];
}

export interface DndCraftingRecipeEntry extends CompendiumEntryBase {
  outputItemId: string;
  outputQuantity: number;
  requiredToolProficiency: string[];
  requiredMaterials: Array<{ itemId: string; quantity: number }>;
  requiredGoldCostGp: number;
  requiredTimeDays: number;
  requiredChecks: Array<{ ability: Ability; dc: number; skill?: Skill }>;
  failureOutcome: string;
}

export interface DndStoryArcEntry extends CompendiumEntryBase {
  arcType: "main" | "side" | "faction" | "character" | "world-event";
  themes: string[];
  startingState: string;
  milestones: string[];
  climax: string;
  outcomes: string[];
}

export interface DndQuestEntry extends CompendiumEntryBase {
  questType: "main" | "side" | "job" | "faction" | "character" | "exploration";
  offeredByNpcId?: string;
  requiredLevelMin?: number;
  objectives: string[];
  rewards: string[];
  failStates: string[];
}

export interface DndFactionEntry extends CompendiumEntryBase {
  goals: string[];
  allies: string[];
  rivals: string[];
  reputationTiers: Array<{ threshold: number; name: string; rewards: string[] }>;
}

export interface DndLocationEntry extends CompendiumEntryBase {
  locationType:
    | "city"
    | "settlement"
    | "dungeon"
    | "wilderness"
    | "plane"
    | "landmark"
    | "custom";
  region: string;
  travelHooks: string[];
  pointsOfInterest: string[];
  encounterTableIds: string[];
}

export interface DndEncounterTemplateEntry extends CompendiumEntryBase {
  environment: string;
  difficulty: "easy" | "medium" | "hard" | "deadly" | "boss";
  partyLevelRange: [number, number];
  recommendedPartySize: [number, number];
  monsterIds: string[];
  tacticalNotes: string[];
}

export interface DndLootTableEntry extends CompendiumEntryBase {
  rollFormula: string;
  entries: Array<{
    minRoll: number;
    maxRoll: number;
    resultText: string;
    itemId?: string;
    quantity?: string;
  }>;
}

export interface DndDowntimeActivityEntry extends CompendiumEntryBase {
  activityType:
    | "crafting"
    | "research"
    | "training"
    | "carousing"
    | "business"
    | "custom";
  requiredTimeDays: number;
  requiredCostGp: number;
  requiredChecks: Array<{ ability: Ability; dc: number; skill?: Skill }>;
  outcomes: string[];
}

export interface Dnd5eCompendiumData {
  schemaVersion: 1;
  metadata: {
    title: string;
    description: string;
    campaignSetting: string;
    sourcePolicy: string;
    createdAt: string;
    updatedAt: string;
  };
  classes: DndClassEntry[];
  subclasses: DndSubclassEntry[];
  species: DndSpeciesEntry[];
  backgrounds: DndBackgroundEntry[];
  feats: DndFeatEntry[];
  spells: DndSpellEntry[];
  items: DndItemEntry[];
  monsters: DndMonsterEntry[];
  rules: DndRuleSystemEntry[];
  craftingRecipes: DndCraftingRecipeEntry[];
  storyArcs: DndStoryArcEntry[];
  quests: DndQuestEntry[];
  factions: DndFactionEntry[];
  locations: DndLocationEntry[];
  encounters: DndEncounterTemplateEntry[];
  lootTables: DndLootTableEntry[];
  downtimeActivities: DndDowntimeActivityEntry[];
}

export const createDefaultDnd5eCompendiumData = (): Dnd5eCompendiumData => {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    metadata: {
      title: "DnD5e Compendium Project",
      description:
        "Structured input pack for legal DnD5e-style content authoring.",
      campaignSetting: "Custom Setting",
      sourcePolicy:
        "Store source references and metadata. Add proprietary text only if licensed.",
      createdAt: now,
      updatedAt: now,
    },
    classes: [],
    subclasses: [],
    species: [],
    backgrounds: [],
    feats: [],
    spells: [],
    items: [],
    monsters: [],
    rules: [],
    craftingRecipes: [],
    storyArcs: [],
    quests: [],
    factions: [],
    locations: [],
    encounters: [],
    lootTables: [],
    downtimeActivities: [],
  };
};

export interface DndFieldDefinition {
  key: string;
  label: string;
  type:
    | "string"
    | "text"
    | "number"
    | "boolean"
    | "string[]"
    | "object[]"
    | "enum";
  required: boolean;
  description: string;
}

export const DND5E_INPUT_FIELD_LIBRARY: Record<string, DndFieldDefinition[]> = {
  metadata: [
    {
      key: "sources",
      label: "Sources",
      type: "object[]",
      required: true,
      description: "Source book id/name/page/license references.",
    },
    {
      key: "rules",
      label: "Rules Text Blocks",
      type: "object[]",
      required: true,
      description: "Mechanical sections split into digestible rule blocks.",
    },
    {
      key: "prerequisites",
      label: "Prerequisites",
      type: "object[]",
      required: false,
      description: "Requirement checks for availability/use.",
    },
  ],
  story: [
    {
      key: "milestones",
      label: "Milestones",
      type: "string[]",
      required: true,
      description: "Story beats and progression checkpoints.",
    },
    {
      key: "outcomes",
      label: "Outcomes",
      type: "string[]",
      required: true,
      description: "Potential endings and campaign impact states.",
    },
    {
      key: "hooks",
      label: "Adventure Hooks",
      type: "string[]",
      required: false,
      description: "Player-facing entry points for engagement.",
    },
  ],
  crafting: [
    {
      key: "requiredMaterials",
      label: "Required Materials",
      type: "object[]",
      required: true,
      description: "Item ids and quantities consumed by crafting.",
    },
    {
      key: "requiredChecks",
      label: "Required Checks",
      type: "object[]",
      required: true,
      description: "Skill/ability checks and DC gates for success.",
    },
    {
      key: "requiredTimeDays",
      label: "Time (days)",
      type: "number",
      required: true,
      description: "Downtime duration required for completion.",
    },
  ],
};
