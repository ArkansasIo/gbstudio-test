import type { RPGFeatureDefinition } from "./types";

export const TILEMAP_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "tilemap_editor",
  name: "Tilemap Editor",
  summary: "Manage layered tilemaps with brush tools and autotile definitions.",
  status: "alpha",
  capabilities: [
    "Edit multi-layer tilemaps",
    "Configure autotile rules",
    "Validate tile collision metadata",
  ],
};

export function initTilemapEditor(): RPGFeatureDefinition {
  return TILEMAP_EDITOR_FEATURE;
}
