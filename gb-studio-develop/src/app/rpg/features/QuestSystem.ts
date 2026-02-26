import type { RPGFeatureDefinition } from "./types";

export const QUEST_SYSTEM_FEATURE: RPGFeatureDefinition = {
  id: "quest_system",
  name: "Quest/Journal System Tool",
  summary: "Define quests, objectives, and completion state transitions.",
  status: "alpha",
  capabilities: [
    "Create multi-stage quest chains",
    "Track objective progress",
    "Handle completion and reward hooks",
  ],
};

export function initQuestSystem(): RPGFeatureDefinition {
  return QUEST_SYSTEM_FEATURE;
}
