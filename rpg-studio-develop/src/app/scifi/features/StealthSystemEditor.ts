import type { SciFiFeatureDefinition } from "./types";

export const STEALTH_SYSTEM_EDITOR_FEATURE: SciFiFeatureDefinition = {
  id: "stealth_system_editor",
  name: "Stealth System Editor",
  summary: "Design cloaking devices, detection ranges, signature profiles, and counter-detection mechanics.",
  status: "planned",
  capabilities: [
    "Configure cloak activation cost and duration limits",
    "Define sensor signature profiles per ship class",
    "Set detection thresholds and counter-cloak ranges per sensor type",
  ],
};

export function initStealthSystemEditor(): SciFiFeatureDefinition {
  return STEALTH_SYSTEM_EDITOR_FEATURE;
}
