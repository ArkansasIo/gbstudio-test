import type { ThemeInterface } from "./ThemeInterface";
import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const createDarkVariant = (
  base: ThemeInterface,
  name: string,
  highlight: string,
  background: string,
  sidebar: string,
  panel: string,
  toolbarStart: string,
  toolbarEnd: string,
): ThemeInterface => ({
  ...base,
  name,
  type: "dark",
  colors: {
    ...base.colors,
    highlight,
    background,
    document: {
      ...base.colors.document,
      background,
    },
    toolbar: {
      ...base.colors.toolbar,
      background: `linear-gradient(to bottom, ${toolbarStart} 0%, ${toolbarEnd} 100%)`,
    },
    sidebar: {
      ...base.colors.sidebar,
      background: sidebar,
      well: {
        ...base.colors.sidebar.well,
        background: sidebar,
      },
    },
    panel: {
      ...base.colors.panel,
      background: panel,
    },
  },
});

const createLightVariant = (
  base: ThemeInterface,
  name: string,
  highlight: string,
  background: string,
  sidebar: string,
  panel: string,
  toolbarStart: string,
  toolbarEnd: string,
): ThemeInterface => ({
  ...base,
  name,
  type: "light",
  colors: {
    ...base.colors,
    highlight,
    background,
    document: {
      ...base.colors.document,
      background,
    },
    toolbar: {
      ...base.colors.toolbar,
      background: `linear-gradient(to bottom, ${toolbarStart} 0%, ${toolbarEnd} 100%)`,
    },
    sidebar: {
      ...base.colors.sidebar,
      background: sidebar,
      well: {
        ...base.colors.sidebar.well,
        background: sidebar,
      },
    },
    panel: {
      ...base.colors.panel,
      background: panel,
    },
  },
});

export const midnightBlueTheme = createDarkVariant(
  darkTheme,
  "Midnight Blue",
  "#4f8cff",
  "#10172a",
  "#111b32",
  "#15213b",
  "#1f2f56",
  "#16243f",
);

export const emeraldNightTheme = createDarkVariant(
  darkTheme,
  "Emerald Night",
  "#22c55e",
  "#101b17",
  "#12221c",
  "#152922",
  "#214436",
  "#173026",
);

export const crimsonForgeTheme = createDarkVariant(
  darkTheme,
  "Crimson Forge",
  "#ef4444",
  "#1a1113",
  "#241519",
  "#2a191d",
  "#4a252f",
  "#331a22",
);

export const amberTerminalTheme = createDarkVariant(
  darkTheme,
  "Amber Terminal",
  "#f59e0b",
  "#16140f",
  "#211d14",
  "#29241a",
  "#4a3a1d",
  "#312815",
);

export const frostLightTheme = createLightVariant(
  lightTheme,
  "Frost Light",
  "#3b82f6",
  "#eef5ff",
  "#dbe8fb",
  "#dce7f7",
  "#f6faff",
  "#dce8f7",
);

export const solarizedSandTheme = createLightVariant(
  lightTheme,
  "Solarized Sand",
  "#d97706",
  "#f7f1e5",
  "#efe5d2",
  "#e9dcc7",
  "#fbf5ea",
  "#eadcc4",
);

export const retroMintTheme = createLightVariant(
  lightTheme,
  "Retro Mint",
  "#10b981",
  "#ecfaf5",
  "#d8f2e8",
  "#d6efe5",
  "#f4fff9",
  "#d9f0e5",
);
