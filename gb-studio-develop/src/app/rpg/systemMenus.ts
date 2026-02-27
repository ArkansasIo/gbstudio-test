export interface RPGMenuActionDefinition {
  id: string;
  label: string;
  functionName: string;
}

export interface RPGSubMenuDefinition {
  id: string;
  label: string;
  tools: string[];
  actions: RPGMenuActionDefinition[];
}

export interface RPGSystemMenuDefinition {
  id: string;
  label: string;
  subMenus: RPGSubMenuDefinition[];
}

export const RPG_SYSTEM_MENU_DEFINITIONS: RPGSystemMenuDefinition[] = [
  {
    id: "main",
    label: "Main Menu",
    subMenus: [
      {
        id: "main-start",
        label: "Start and Continue",
        tools: ["Save Slot Browser", "Profile Selector"],
        actions: [
          { id: "new-game", label: "New Game", functionName: "startNewGame()" },
          { id: "continue", label: "Continue", functionName: "continueFromSave()" },
        ],
      },
      {
        id: "main-options",
        label: "Pre-Game Options",
        tools: ["Language Picker", "Accessibility Presets"],
        actions: [
          { id: "open-options", label: "Options", functionName: "openOptionsMenu()" },
          { id: "open-help", label: "How To Play", functionName: "openTutorialMenu()" },
        ],
      },
    ],
  },
  {
    id: "pause",
    label: "In-game Pause Menu",
    subMenus: [
      {
        id: "pause-party",
        label: "Party and Inventory",
        tools: ["Party Manager", "Inventory Grid", "Equipment Inspector"],
        actions: [
          { id: "open-party", label: "Party", functionName: "openPartyMenu()" },
          { id: "open-inventory", label: "Inventory", functionName: "openInventoryMenu()" },
          { id: "open-skills", label: "Skills", functionName: "openSkillsMenu()" },
        ],
      },
      {
        id: "pause-system",
        label: "Save and System",
        tools: ["Save Slot Manager", "Checkpoint Browser"],
        actions: [
          { id: "save-game", label: "Save", functionName: "saveGame()" },
          { id: "load-game", label: "Load", functionName: "loadGame()" },
          { id: "pause-options", label: "Options", functionName: "openOptionsMenu()" },
          { id: "pause-quit", label: "Quit", functionName: "quitToTitle()" },
        ],
      },
    ],
  },
  {
    id: "character",
    label: "Character Status Menu",
    subMenus: [
      {
        id: "char-stats",
        label: "Stats and Progression",
        tools: ["Stat Graph", "Level Curve Viewer", "Trait Matrix"],
        actions: [
          { id: "view-stats", label: "View Stats", functionName: "openCharacterStats(actorId)" },
          { id: "allocate-points", label: "Allocate Points", functionName: "allocateStatPoints(actorId)" },
        ],
      },
      {
        id: "char-gear",
        label: "Equipment and Loadout",
        tools: ["Equipment Slots", "Set Bonus Preview"],
        actions: [
          { id: "equip-item", label: "Equip Item", functionName: "equipItem(actorId, itemId)" },
          { id: "unequip-item", label: "Unequip Item", functionName: "unequipItem(actorId, slotId)" },
        ],
      },
    ],
  },
  {
    id: "world",
    label: "Map, Quest, and Journal Menus",
    subMenus: [
      {
        id: "world-map",
        label: "Map and Fast Travel",
        tools: ["World Map", "Region Markers", "Teleport Nodes"],
        actions: [
          { id: "open-map", label: "Open Map", functionName: "openWorldMap()" },
          { id: "fast-travel", label: "Fast Travel", functionName: "fastTravel(targetNodeId)" },
        ],
      },
      {
        id: "world-quest",
        label: "Quest and Journal",
        tools: ["Quest Tracker", "Objective Timeline", "Lore Journal"],
        actions: [
          { id: "open-quest", label: "Quest Log", functionName: "openQuestJournal()" },
          { id: "track-quest", label: "Track Quest", functionName: "setActiveQuest(questId)" },
        ],
      },
    ],
  },
  {
    id: "combat",
    label: "Battle and Tactical Menus",
    subMenus: [
      {
        id: "battle-command",
        label: "Battle Commands",
        tools: ["Turn Queue", "Skill Palette", "Target Preview"],
        actions: [
          { id: "battle-attack", label: "Attack", functionName: "battleAttack(targetId)" },
          { id: "battle-skill", label: "Skill", functionName: "battleUseSkill(skillId, targetId)" },
          { id: "battle-item", label: "Item", functionName: "battleUseItem(itemId, targetId)" },
          { id: "battle-guard", label: "Guard", functionName: "battleGuard()" },
        ],
      },
      {
        id: "battle-support",
        label: "Summons and Escape",
        tools: ["Summon Deck", "Escape Probability Meter"],
        actions: [
          { id: "battle-summon", label: "Summon", functionName: "battleSummon(summonId)" },
          { id: "battle-escape", label: "Escape", functionName: "battleAttemptEscape()" },
        ],
      },
    ],
  },
  {
    id: "meta",
    label: "Options, Help, and Debug Menus",
    subMenus: [
      {
        id: "meta-accessibility",
        label: "Accessibility and Language",
        tools: ["Text Size Slider", "Contrast Profiles", "Colorblind Modes"],
        actions: [
          { id: "set-language", label: "Language", functionName: "setLanguage(locale)" },
          { id: "set-accessibility", label: "Accessibility", functionName: "applyAccessibilityPreset(presetId)" },
        ],
      },
      {
        id: "meta-dev",
        label: "Debug and Diagnostics",
        tools: ["Debug Console", "Profiler Overlay", "Script Trace Monitor"],
        actions: [
          { id: "open-debug", label: "Debug Tools", functionName: "openDebugMenu()" },
          { id: "open-bestiary", label: "Bestiary", functionName: "openBestiary()" },
          { id: "open-gallery", label: "Gallery", functionName: "openGallery()" },
          { id: "open-credits", label: "Credits", functionName: "openCreditsRoll()" },
        ],
      },
    ],
  },
];

export const RPG_SYSTEM_MENUS = RPG_SYSTEM_MENU_DEFINITIONS.map(
  (menu) => menu.label,
);

export const RPG_SYSTEM_SUB_MENUS = RPG_SYSTEM_MENU_DEFINITIONS.flatMap((menu) =>
  menu.subMenus.map((subMenu) => `${menu.label}: ${subMenu.label}`),
);

export const RPG_SYSTEM_MENU_FUNCTIONS = RPG_SYSTEM_MENU_DEFINITIONS.flatMap(
  (menu) =>
    menu.subMenus.flatMap((subMenu) =>
      subMenu.actions.map(
        (action) => `${menu.label} > ${subMenu.label}: ${action.functionName}`,
      ),
    ),
);
