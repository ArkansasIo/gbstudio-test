import type { RPGFeatureDefinition } from "./types";

export const MINIGAME_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "minigame_editor",
  name: "Minigame Editor",
  summary: "Create small standalone gameplay modules with entry and reward flow.",
  status: "alpha",
  capabilities: [
    "Register minigame metadata",
    "Define entry and exit hooks",
    "Assign reward outcomes",
  ],
};

export function initMinigameEditor(): RPGFeatureDefinition {
  return MINIGAME_EDITOR_FEATURE;
}
