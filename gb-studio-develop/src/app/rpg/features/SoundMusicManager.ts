import type { RPGFeatureDefinition } from "./types";

export const SOUND_MUSIC_MANAGER_FEATURE: RPGFeatureDefinition = {
  id: "sound_music_manager",
  name: "Sound/Music Manager",
  summary: "Catalog background tracks, SFX clips, and playback trigger rules.",
  status: "alpha",
  capabilities: [
    "Register BGM and SFX assets",
    "Define playback triggers",
    "Control loop and fade settings",
  ],
};

export function initSoundMusicManager(): RPGFeatureDefinition {
  return SOUND_MUSIC_MANAGER_FEATURE;
}
