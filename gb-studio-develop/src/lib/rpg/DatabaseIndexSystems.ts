import { RPG_MMO_AUDIO_LIBRARY, type GameWaveAsset } from "lib/audio/RPGMMORPGAudioLibrary";
import { RPG_SOUND_LIBRARY } from "lib/audio/RPGSoundEffects";
import { PIXEL_ART_EDITOR_SYSTEMS } from "lib/sprites/PixelArtEditorSystems";
import {
  createDnd5eFullSystemPack,
  createStoryEditorSystemsPack200,
} from "shared/lib/rpg5e";

export type GameSystemDomain = "rpg" | "mmorpg" | "shared";
export type GameSystemSource = "audio" | "audio-legacy" | "rpg5e" | "story" | "pixel";

export interface GameDatabaseIndexRecord {
  id: string;
  name: string;
  domain: GameSystemDomain;
  source: GameSystemSource;
  category: string;
  subtype: string;
  tags: string[];
}

export interface GameDatabaseIndex {
  records: GameDatabaseIndexRecord[];
  byId: Record<string, GameDatabaseIndexRecord>;
  byDomain: Record<GameSystemDomain, GameDatabaseIndexRecord[]>;
  bySource: Record<GameSystemSource, GameDatabaseIndexRecord[]>;
  byCategory: Record<string, GameDatabaseIndexRecord[]>;
  stats: {
    total: number;
    domains: Record<GameSystemDomain, number>;
    sources: Record<GameSystemSource, number>;
    categories: Record<string, number>;
  };
}

export interface GameDatabaseSearchQuery {
  text?: string;
  domain?: GameSystemDomain;
  source?: GameSystemSource;
  category?: string;
  tag?: string;
  limit?: number;
}

const normalize = (value: string) => value.trim().toLowerCase();

const fromAudioAsset = (asset: GameWaveAsset): GameDatabaseIndexRecord => ({
  id: `audio:${asset.id}`,
  name: asset.name,
  domain: asset.domain,
  source: "audio",
  category: asset.category,
  subtype: `${asset.audioClass}:${asset.bitDepth}bit`,
  tags: [...asset.tags, asset.extension, `${asset.sampleRate}hz`],
});

const fromLegacySound = (sound: (typeof RPG_SOUND_LIBRARY)[number]): GameDatabaseIndexRecord => {
  const inferredDomain: GameSystemDomain = sound.id.includes("mmo") ? "mmorpg" : "rpg";
  return {
    id: `audio-legacy:${sound.id}`,
    name: sound.name,
    domain: inferredDomain,
    source: "audio-legacy",
    category: sound.category,
    subtype: "legacy-library",
    tags: [sound.category, "legacy", "audio"],
  };
};

const fromRpg5ePack = (): GameDatabaseIndexRecord[] => {
  const pack = createDnd5eFullSystemPack();
  const add = (category: string, subtype: string, entries: Array<{ id: string; name: string; tags: string[] }>) =>
    entries.map((entry) => ({
      id: `rpg5e:${category}:${entry.id}`,
      name: entry.name,
      domain: "rpg",
      source: "rpg5e" as const,
      category,
      subtype,
      tags: ["rpg5e", category, ...entry.tags],
    }));

  return [
    ...add("class", "core", pack.classes),
    ...add("subclass", "core", pack.subclasses),
    ...add("species", "core", pack.species),
    ...add("background", "core", pack.backgrounds),
    ...add("feat", "core", pack.feats),
    ...add("spell", "magic", pack.spells),
    ...add("item", "gear", pack.items),
    ...add("monster", "bestiary", pack.monsters),
    ...add("rule", "system", pack.rules),
    ...add("crafting", "system", pack.craftingRecipes),
    ...add("story-arc", "narrative", pack.storyArcs),
    ...add("quest", "narrative", pack.quests),
    ...add("faction", "narrative", pack.factions),
    ...add("location", "world", pack.locations),
    ...add("encounter", "combat", pack.encounters),
    ...add("loot-table", "reward", pack.lootTables),
    ...add("downtime", "system", pack.downtimeActivities),
  ];
};

const fromStoryPack = (): GameDatabaseIndexRecord[] => {
  const pack = createStoryEditorSystemsPack200();
  const actRecords = pack.acts.map((act) => ({
    id: `story:act:${act.id}`,
    name: act.title,
    domain: "rpg" as const,
    source: "story" as const,
    category: "story-act",
    subtype: act.tone,
    tags: ["story", "act", ...act.chapterIds],
  }));
  const chapterRecords = pack.chapters.map((chapter) => ({
    id: `story:chapter:${chapter.id}`,
    name: chapter.title,
    domain: "rpg" as const,
    source: "story" as const,
    category: "story-chapter",
    subtype: chapter.theme.toLowerCase(),
    tags: ["story", "chapter", chapter.actId],
  }));
  const mainQuestRecords = pack.mainQuests.map((quest) => ({
    id: `story:main:${quest.id}`,
    name: quest.title,
    domain: "rpg" as const,
    source: "story" as const,
    category: "main-quest",
    subtype: `${quest.levelRange[0]}-${quest.levelRange[1]}`,
    tags: ["story", "quest", "main", ...quest.requiredAssets, ...quest.requiredClasses],
  }));
  const sideQuestRecords = pack.sideQuests.map((quest) => ({
    id: `story:side:${quest.id}`,
    name: quest.title,
    domain: "rpg" as const,
    source: "story" as const,
    category: "side-quest",
    subtype: `${quest.levelRange[0]}-${quest.levelRange[1]}`,
    tags: ["story", "quest", "side", ...quest.requiredAssets, ...quest.requiredClasses],
  }));

  return [...actRecords, ...chapterRecords, ...mainQuestRecords, ...sideQuestRecords];
};

const fromPixelSystems = (): GameDatabaseIndexRecord[] => {
  const toolRecords = PIXEL_ART_EDITOR_SYSTEMS.tools.map((tool) => ({
    id: `pixel:tool:${tool}`,
    name: `Pixel Tool: ${tool}`,
    domain: "shared" as const,
    source: "pixel" as const,
    category: "pixel-tool",
    subtype: "editor-tool",
    tags: ["pixel", "tool", tool],
  }));
  const supportRecords = PIXEL_ART_EDITOR_SYSTEMS.supports.map((feature) => ({
    id: `pixel:feature:${feature}`,
    name: `Pixel Feature: ${feature}`,
    domain: "shared" as const,
    source: "pixel" as const,
    category: "pixel-feature",
    subtype: "editor-system",
    tags: ["pixel", "feature", feature],
  }));
  return [...toolRecords, ...supportRecords];
};

const groupBy = <T extends GameDatabaseIndexRecord>(
  records: T[],
  pickKey: (record: T) => string,
) =>
  records.reduce<Record<string, T[]>>((acc, record) => {
    const key = pickKey(record);
    acc[key] = acc[key] ? [...acc[key], record] : [record];
    return acc;
  }, {});

export const createGameDatabaseIndex = (): GameDatabaseIndex => {
  const records: GameDatabaseIndexRecord[] = [
    ...RPG_MMO_AUDIO_LIBRARY.map(fromAudioAsset),
    ...RPG_SOUND_LIBRARY.map(fromLegacySound),
    ...fromRpg5ePack(),
    ...fromStoryPack(),
    ...fromPixelSystems(),
  ];

  const byId = records.reduce<Record<string, GameDatabaseIndexRecord>>((acc, record) => {
    acc[record.id] = record;
    return acc;
  }, {});

  const byDomain: Record<GameSystemDomain, GameDatabaseIndexRecord[]> = {
    rpg: records.filter((record) => record.domain === "rpg"),
    mmorpg: records.filter((record) => record.domain === "mmorpg"),
    shared: records.filter((record) => record.domain === "shared"),
  };

  const bySource: Record<GameSystemSource, GameDatabaseIndexRecord[]> = {
    audio: records.filter((record) => record.source === "audio"),
    "audio-legacy": records.filter((record) => record.source === "audio-legacy"),
    rpg5e: records.filter((record) => record.source === "rpg5e"),
    story: records.filter((record) => record.source === "story"),
    pixel: records.filter((record) => record.source === "pixel"),
  };

  const byCategory = groupBy(records, (record) => record.category);

  const stats = {
    total: records.length,
    domains: {
      rpg: byDomain.rpg.length,
      mmorpg: byDomain.mmorpg.length,
      shared: byDomain.shared.length,
    },
    sources: {
      audio: bySource.audio.length,
      "audio-legacy": bySource["audio-legacy"].length,
      rpg5e: bySource.rpg5e.length,
      story: bySource.story.length,
      pixel: bySource.pixel.length,
    },
    categories: Object.fromEntries(
      Object.entries(byCategory).map(([key, values]) => [key, values.length]),
    ),
  };

  return {
    records,
    byId,
    byDomain,
    bySource,
    byCategory,
    stats,
  };
};

export const searchGameDatabaseIndex = (
  index: GameDatabaseIndex,
  query: GameDatabaseSearchQuery,
): GameDatabaseIndexRecord[] => {
  const text = query.text ? normalize(query.text) : "";
  const limit = query.limit ?? 200;

  return index.records
    .filter((record) => (query.domain ? record.domain === query.domain : true))
    .filter((record) => (query.source ? record.source === query.source : true))
    .filter((record) => (query.category ? record.category === query.category : true))
    .filter((record) => (query.tag ? record.tags.includes(query.tag) : true))
    .filter((record) => {
      if (!text) return true;
      const haystack = `${record.id} ${record.name} ${record.category} ${record.subtype} ${record.tags.join(" ")}`;
      return normalize(haystack).includes(text);
    })
    .slice(0, limit);
};

export const GAME_DATABASE_INDEX = createGameDatabaseIndex();

