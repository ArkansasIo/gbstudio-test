import type { SciFiFeatureDefinition } from "./types";

export const SCIFI_SAVE_LOAD_MANAGER_FEATURE: SciFiFeatureDefinition = {
  id: "scifi_save_load_manager",
  name: "SciFi Save/Load Manager",
  summary: "Manage save slots, autosave intervals, checkpoint triggers, and schema migration workflows.",
  status: "stable",
  capabilities: [
    "Configure named save slots and autosave frequency",
    "Define checkpoint triggers based on mission or location events",
    "Author migration scripts to update legacy save data schemas",
  ],
};

export function initSciFiSaveLoadManager(): SciFiFeatureDefinition {
  return SCIFI_SAVE_LOAD_MANAGER_FEATURE;
}
