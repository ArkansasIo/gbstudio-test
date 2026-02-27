export type AudioDomain = "rpg" | "mmorpg";
export type AudioCategory =
  | "music"
  | "sfx"
  | "ambient"
  | "ui"
  | "voice"
  | "combat"
  | "world"
  | "magic"
  | "crafting"
  | "social";
export type AudioClass =
  | "core"
  | "battle"
  | "exploration"
  | "settlement"
  | "dungeon"
  | "event"
  | "interface"
  | "character";
export type AudioBitDepth = 8 | 16 | 32 | 64;

export interface GameWaveAsset {
  id: string;
  name: string;
  domain: AudioDomain;
  category: AudioCategory;
  audioClass: AudioClass;
  bitDepth: AudioBitDepth;
  sampleRate: number;
  channels: 1 | 2;
  extension: "wav";
  path: string;
  tags: string[];
  loop: boolean;
}

export interface WaveSynthesisOptions {
  sampleRate?: number;
  durationMs?: number;
  frequencyHz?: number;
  amplitude?: number;
}

const AUDIO_CLASSES: AudioClass[] = [
  "core",
  "battle",
  "exploration",
  "interface",
];

const AUDIO_TYPES: Array<{ name: string; category: AudioCategory; loop: boolean }> = [
  { name: "title_theme", category: "music", loop: true },
  { name: "overworld_theme", category: "music", loop: true },
  { name: "battle_theme", category: "music", loop: true },
  { name: "boss_theme", category: "music", loop: true },
  { name: "victory_fanfare", category: "music", loop: false },
  { name: "dungeon_ambience", category: "ambient", loop: true },
  { name: "town_ambience", category: "ambient", loop: true },
  { name: "forest_ambience", category: "ambient", loop: true },
  { name: "cave_drip", category: "ambient", loop: true },
  { name: "rain_loop", category: "ambient", loop: true },
  { name: "wind_loop", category: "ambient", loop: true },
  { name: "menu_open", category: "ui", loop: false },
  { name: "menu_select", category: "ui", loop: false },
  { name: "menu_cancel", category: "ui", loop: false },
  { name: "quest_accept", category: "sfx", loop: false },
  { name: "quest_complete", category: "sfx", loop: false },
  { name: "coin_pickup", category: "sfx", loop: false },
  { name: "item_pickup", category: "sfx", loop: false },
  { name: "footstep_stone", category: "world", loop: false },
  { name: "footstep_grass", category: "world", loop: false },
  { name: "sword_slash", category: "combat", loop: false },
  { name: "shield_block", category: "combat", loop: false },
  { name: "critical_hit", category: "combat", loop: false },
  { name: "heal_cast", category: "magic", loop: false },
  { name: "fire_spell", category: "magic", loop: false },
];

const BIT_DEPTHS: AudioBitDepth[] = [8, 16, 32, 64];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "_");

const bitDepthForIndex = (index: number): AudioBitDepth =>
  BIT_DEPTHS[index % BIT_DEPTHS.length];

const sampleRateForBitDepth = (bitDepth: AudioBitDepth): number =>
  bitDepth >= 32 ? 48000 : 44100;

const channelsForCategory = (category: AudioCategory): 1 | 2 =>
  category === "music" || category === "ambient" ? 2 : 1;

const buildAsset = (
  domain: AudioDomain,
  typeName: string,
  category: AudioCategory,
  audioClass: AudioClass,
  index: number,
  loop: boolean,
): GameWaveAsset => {
  const bitDepth = bitDepthForIndex(index);
  const id = `${slug(domain)}_${slug(typeName)}_${slug(audioClass)}`;
  return {
    id,
    name: `${domain.toUpperCase()} ${typeName} (${audioClass})`,
    domain,
    category,
    audioClass,
    bitDepth,
    sampleRate: sampleRateForBitDepth(bitDepth),
    channels: channelsForCategory(category),
    extension: "wav",
    path: `audio/library/${domain}/${category}/${id}.wav`,
    tags: [domain, category, audioClass, `${bitDepth}bit`],
    loop,
  };
};

export const RPG_MMO_AUDIO_LIBRARY: GameWaveAsset[] = (() => {
  const domains: AudioDomain[] = ["rpg", "mmorpg"];
  const assets: GameWaveAsset[] = [];
  let idx = 0;

  for (const domain of domains) {
    for (const typeDef of AUDIO_TYPES) {
      for (const audioClass of AUDIO_CLASSES) {
        assets.push(
          buildAsset(
            domain,
            typeDef.name,
            typeDef.category,
            audioClass,
            idx,
            typeDef.loop,
          ),
        );
        idx += 1;
      }
    }
  }

  return assets;
})();

export const AUDIO_LIBRARY_TYPE_COUNT = RPG_MMO_AUDIO_LIBRARY.length; // 200

const pcm8 = (sample: number) => Math.max(0, Math.min(255, Math.round((sample + 1) * 127.5)));
const pcm16 = (sample: number) =>
  Math.max(-32768, Math.min(32767, Math.round(sample * 32767)));
const pcm32 = (sample: number) =>
  Math.max(-2147483648, Math.min(2147483647, Math.round(sample * 2147483647)));

const writeString = (view: DataView, offset: number, value: string) => {
  for (let i = 0; i < value.length; i++) {
    view.setUint8(offset + i, value.charCodeAt(i));
  }
};

export const synthesizeGameWave = (
  bitDepth: AudioBitDepth,
  options: WaveSynthesisOptions = {},
): Uint8Array => {
  const sampleRate = options.sampleRate ?? sampleRateForBitDepth(bitDepth);
  const durationMs = options.durationMs ?? 500;
  const frequencyHz = options.frequencyHz ?? 440;
  const amplitude = Math.max(0, Math.min(1, options.amplitude ?? 0.4));
  const channels: 1 | 2 = 1;
  const sampleCount = Math.max(1, Math.floor((sampleRate * durationMs) / 1000));
  const bytesPerSample = bitDepth === 8 ? 1 : bitDepth === 16 ? 2 : bitDepth === 32 ? 4 : 8;
  const blockAlign = channels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = sampleCount * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, bitDepth === 64 ? 3 : 1, true); // float for 64-bit
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < sampleCount; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequencyHz * t) * amplitude;

    if (bitDepth === 8) {
      view.setUint8(offset, pcm8(sample));
    } else if (bitDepth === 16) {
      view.setInt16(offset, pcm16(sample), true);
    } else if (bitDepth === 32) {
      view.setInt32(offset, pcm32(sample), true);
    } else {
      view.setFloat64(offset, sample, true);
    }
    offset += bytesPerSample;
  }

  return new Uint8Array(buffer);
};

export const getAudioLibraryByDomain = (domain: AudioDomain) =>
  RPG_MMO_AUDIO_LIBRARY.filter((entry) => entry.domain === domain);

export const getAudioLibraryByBitDepth = (bitDepth: AudioBitDepth) =>
  RPG_MMO_AUDIO_LIBRARY.filter((entry) => entry.bitDepth === bitDepth);

export const getAudioLibraryByCategory = (category: AudioCategory) =>
  RPG_MMO_AUDIO_LIBRARY.filter((entry) => entry.category === category);
