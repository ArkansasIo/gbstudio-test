import type { RPGFeatureDefinition } from "./types";

export const ANIMATION_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "animation_editor",
  name: "Animation Editor",
  summary: "Create timeline-based sprite, UI, and effect animations.",
  status: "alpha",
  capabilities: [
    "Define animation clips",
    "Set keyframes and easing",
    "Preview frame timings",
  ],
};

export function initAnimationEditor(): RPGFeatureDefinition {
  return ANIMATION_EDITOR_FEATURE;
}
