import type { RPGFeatureDefinition } from "./types";

export const CUTSCENE_DIALOGUE_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "cutscene_dialogue_editor",
  name: "Cutscene/Dialogue Editor",
  summary: "Build branching dialogue nodes and sequence cutscene actions.",
  status: "alpha",
  capabilities: [
    "Author branching dialogue trees",
    "Attach conditions and consequences",
    "Preview dialogue flow",
  ],
};

export function initCutsceneDialogueEditor(): RPGFeatureDefinition {
  return CUTSCENE_DIALOGUE_EDITOR_FEATURE;
}
