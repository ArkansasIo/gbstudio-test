import type { SciFiFeatureDefinition } from "./types";

export const SCIFI_DIALOGUE_SYSTEM_FEATURE: SciFiFeatureDefinition = {
  id: "scifi_dialogue_system",
  name: "SciFi Dialogue System",
  summary: "Author branching dialogue for crew, aliens, and mission contacts with condition-gated choices.",
  status: "alpha",
  capabilities: [
    "Build dialogue trees with node-based visual editor",
    "Define variable and reputation conditions on choice branches",
    "Trigger mission flags, morale changes, and item rewards from dialogue",
  ],
};

export function initSciFiDialogueSystem(): SciFiFeatureDefinition {
  return SCIFI_DIALOGUE_SYSTEM_FEATURE;
}
