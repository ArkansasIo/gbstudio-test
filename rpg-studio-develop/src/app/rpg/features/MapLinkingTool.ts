import type { RPGFeatureDefinition } from "./types";

export const MAP_LINKING_TOOL_FEATURE: RPGFeatureDefinition = {
  id: "map_linking_tool",
  name: "Map Linking/World Map Tool",
  summary: "Author scene connections and overworld travel graph relationships.",
  status: "alpha",
  capabilities: [
    "Connect scenes by directional links",
    "Define world map nodes",
    "Validate unreachable destinations",
  ],
};

export function initMapLinkingTool(): RPGFeatureDefinition {
  return MAP_LINKING_TOOL_FEATURE;
}
