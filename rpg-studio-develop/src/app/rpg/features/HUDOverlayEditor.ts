import type { RPGFeatureDefinition } from "./types";

export const HUD_OVERLAY_EDITOR_FEATURE: RPGFeatureDefinition = {
  id: "hud_overlay_editor",
  name: "Customizable HUD/Overlay Editor",
  summary: "Define HUD widgets, anchors, and context-sensitive visibility rules.",
  status: "alpha",
  capabilities: [
    "Configure widget layout regions",
    "Bind HUD values to game variables",
    "Preview overlays by state",
  ],
};

export function initHUDOverlayEditor(): RPGFeatureDefinition {
  return HUD_OVERLAY_EDITOR_FEATURE;
}
