import type { SciFiFeatureDefinition } from "./types";

export const TECHNOLOGY_RESEARCH_TREE_FEATURE: SciFiFeatureDefinition = {
  id: "technology_research_tree",
  name: "Technology Research Tree",
  summary: "Design technology research nodes, prerequisite chains, costs, and unlock effects.",
  status: "alpha",
  capabilities: [
    "Layout research nodes with drag-and-drop canvas",
    "Define prerequisite chains and tier gating",
    "Configure research costs, time, and unlock payloads",
  ],
};

export function initTechnologyResearchTree(): SciFiFeatureDefinition {
  return TECHNOLOGY_RESEARCH_TREE_FEATURE;
}
