import type { RPGFeatureDefinition } from "./types";

export const ACHIEVEMENT_SYSTEM_FEATURE: RPGFeatureDefinition = {
  id: "achievement_system",
  name: "Achievement/Badge System Tool",
  summary: "Track unlock conditions, badge rewards, and completion metadata.",
  status: "alpha",
  capabilities: [
    "Register achievement definitions",
    "Evaluate unlock conditions",
    "Persist unlocked badge state",
  ],
};

export function initAchievementSystem(): RPGFeatureDefinition {
  return ACHIEVEMENT_SYSTEM_FEATURE;
}
