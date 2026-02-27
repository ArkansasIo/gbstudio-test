import type { RPGColorProfileDefinition } from "./types";

export const RPG_COLOR_PROFILES: RPGColorProfileDefinition[] = [
  {
    id: "crystal-cyan",
    label: "Crystal Cyan",
    description: "Bright UI accents for readability-focused workflows.",
    colors: {
      background: "#0f1b2d",
      panel: "#13263f",
      panelAlt: "#18324f",
      accent: "#22d3ee",
      accentStrong: "#06b6d4",
      text: "#e2f3ff",
      mutedText: "#8bb7d1",
      border: "#2a4e73",
    },
  },
  {
    id: "ember-sunset",
    label: "Ember Sunset",
    description: "Warm and high-contrast palette for combat iteration.",
    colors: {
      background: "#241813",
      panel: "#2f2019",
      panelAlt: "#3a281f",
      accent: "#fb923c",
      accentStrong: "#f97316",
      text: "#ffefe5",
      mutedText: "#d7ab8a",
      border: "#6b3e28",
    },
  },
  {
    id: "jade-forest",
    label: "Jade Forest",
    description: "Green tactical palette for world-building sessions.",
    colors: {
      background: "#13221c",
      panel: "#1a2d24",
      panelAlt: "#214033",
      accent: "#34d399",
      accentStrong: "#10b981",
      text: "#e8fff3",
      mutedText: "#9fd2b8",
      border: "#2f5f4b",
    },
  },
  {
    id: "violet-noir",
    label: "Violet Noir",
    description: "Deep contrast palette for narrative and cutscene editing.",
    colors: {
      background: "#1b1328",
      panel: "#251a35",
      panelAlt: "#2f2145",
      accent: "#a78bfa",
      accentStrong: "#8b5cf6",
      text: "#f0eaff",
      mutedText: "#b6a9d8",
      border: "#4b3a75",
    },
  },
  {
    id: "slate-industrial",
    label: "Slate Industrial",
    description: "Neutral engineering palette for long production sessions.",
    colors: {
      background: "#1a1f26",
      panel: "#232a33",
      panelAlt: "#2c3541",
      accent: "#60a5fa",
      accentStrong: "#3b82f6",
      text: "#edf2f8",
      mutedText: "#9ca8b8",
      border: "#455365",
    },
  },
  {
    id: "sandstorm",
    label: "Sandstorm",
    description: "Earth-tone palette optimized for UI testing in lighter contrast.",
    colors: {
      background: "#2c251f",
      panel: "#352d25",
      panelAlt: "#3f352b",
      accent: "#f59e0b",
      accentStrong: "#d97706",
      text: "#fff5e6",
      mutedText: "#d0b490",
      border: "#70563a",
    },
  },
];

export const RPG_COLOR_PROFILE_LABELS = RPG_COLOR_PROFILES.map(
  (profile) => profile.label,
);

export const RPG_COLOR_PROFILE_VARIABLES = RPG_COLOR_PROFILES.flatMap((profile) =>
  Object.entries(profile.colors).map(
    ([token, value]) => `${profile.label}: ${token}=${value}`,
  ),
);
