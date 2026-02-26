import type { RPGFeatureDefinition } from "./types";

export const VISUAL_EVENT_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "visual_event_editor",
  name: "Visual Event Editor",
  summary: "Compose event flows using declarative nodes and connection rules.",
  status: "alpha",
  capabilities: [
    "Build drag-and-drop event graphs",
    "Validate event graph connectivity",
    "Serialize graph definitions",
  ],
};

export function initVisualEventEditor(): RPGFeatureDefinition {
  return VISUAL_EVENT_EDITOR_FEATURE;
}
