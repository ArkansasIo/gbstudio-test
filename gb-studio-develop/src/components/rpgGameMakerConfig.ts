// Example configuration for RPG Game Maker UI panels and data

export const defaultProjectStructure = {
  maps: [],
  characters: [],
  events: [],
  items: [],
  skills: [],
  enemies: [],
  tilesets: [],
  audio: [],
  scripts: []
};

export const menuStructure = [
  {
    label: "File",
    items: ["New Project", "Open", "Save", "Save As", "Export", "Exit"]
  },
  {
    label: "Edit",
    items: ["Undo", "Redo", "Cut", "Copy", "Paste", "Preferences"]
  },
  {
    label: "View",
    items: ["Toggle panels", "Zoom", "Grid", "Fullscreen"]
  },
  {
    label: "Tools",
    items: ["Map Editor", "Event Editor", "Database", "Asset Manager", "Script Editor"]
  },
  {
    label: "Build",
    items: ["Build Project", "Clean", "Export ROM"]
  },
  {
    label: "Run",
    items: ["Playtest", "Debug"]
  },
  {
    label: "Help",
    items: ["Documentation", "Tutorials", "About"]
  }
];

export const exampleEvent = {
  name: "Treasure Chest",
  trigger: "On Interact",
  actions: [
    "Play open animation",
    "Add item to inventory",
    "Show message: 'You found a potion!'"
  ]
};
