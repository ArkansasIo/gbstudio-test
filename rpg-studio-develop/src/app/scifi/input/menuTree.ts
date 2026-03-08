import type { SciFiMenuInputDefinition } from "./types";

export const SCIFI_MENU_TREE: SciFiMenuInputDefinition[] = [
  {
    id: "file",
    label: "File",
    subMenus: [
      {
        id: "file-project",
        label: "Project",
        tools: [
          {
            id: "project-wizard",
            label: "New Project Wizard",
            category: "authoring",
            description: "Steps through new game project setup and template selection.",
          },
          {
            id: "project-browser",
            label: "Project Browser",
            category: "authoring",
            description: "Lists and opens recent scifi game projects.",
          },
        ],
        actions: [
          { id: "new-project", label: "New Project", functionName: "createNewProject()" },
          { id: "open-project", label: "Open Project", functionName: "openProject()" },
          { id: "close-project", label: "Close Project", functionName: "closeProject()" },
        ],
      },
      {
        id: "file-save",
        label: "Save and Export",
        tools: [
          {
            id: "export-pipeline",
            label: "Export Pipeline",
            category: "build",
            description: "Packages the project into distributable build targets.",
          },
          {
            id: "import-asset-wizard",
            label: "Import Asset Wizard",
            category: "content",
            description: "Guides asset import with format validation.",
          },
        ],
        actions: [
          { id: "save", label: "Save", functionName: "saveProject()" },
          { id: "save-as", label: "Save As", functionName: "saveProjectAs()" },
          { id: "export-build", label: "Export Build", functionName: "exportProjectBuild()" },
          { id: "import-assets", label: "Import Assets", functionName: "importAssets()" },
          { id: "export-assets", label: "Export Assets", functionName: "exportAssets()" },
        ],
      },
    ],
  },
  {
    id: "edit",
    label: "Edit",
    subMenus: [
      {
        id: "edit-history",
        label: "History",
        tools: [
          {
            id: "undo-history-panel",
            label: "Undo History Panel",
            category: "authoring",
            description: "Shows recent edit operations available to undo.",
          },
        ],
        actions: [
          { id: "undo", label: "Undo", functionName: "undoAction()" },
          { id: "redo", label: "Redo", functionName: "redoAction()" },
        ],
      },
      {
        id: "edit-clipboard",
        label: "Clipboard",
        tools: [
          {
            id: "clipboard-inspector",
            label: "Clipboard Inspector",
            category: "authoring",
            description: "Previews clipboard content before paste.",
          },
        ],
        actions: [
          { id: "cut", label: "Cut", functionName: "cutSelection()" },
          { id: "copy", label: "Copy", functionName: "copySelection()" },
          { id: "paste", label: "Paste", functionName: "pasteSelection()" },
          { id: "duplicate", label: "Duplicate", functionName: "duplicateSelection()" },
          { id: "delete", label: "Delete", functionName: "deleteSelection()" },
          { id: "select-all", label: "Select All", functionName: "selectAll()" },
          { id: "deselect-all", label: "Deselect All", functionName: "deselectAll()" },
        ],
      },
      {
        id: "edit-preferences",
        label: "Preferences",
        tools: [
          {
            id: "editor-settings-panel",
            label: "Editor Settings Panel",
            category: "authoring",
            description: "Configures editor-wide behaviour and keybindings.",
          },
        ],
        actions: [
          { id: "open-preferences", label: "Preferences", functionName: "openPreferences()" },
          { id: "reset-layout", label: "Reset Layout", functionName: "resetEditorLayout()" },
          { id: "manage-keybindings", label: "Key Bindings", functionName: "openKeyBindings()" },
        ],
      },
    ],
  },
  {
    id: "view",
    label: "View",
    subMenus: [
      {
        id: "view-panels",
        label: "Panels",
        tools: [
          {
            id: "panel-layout-manager",
            label: "Panel Layout Manager",
            category: "authoring",
            description: "Manages dockable panel positions and visibility.",
          },
        ],
        actions: [
          { id: "toggle-inspector", label: "Toggle Inspector", functionName: "toggleInspectorPanel()" },
          { id: "toggle-outliner", label: "Toggle Outliner", functionName: "toggleOutlinerPanel()" },
          { id: "toggle-console", label: "Toggle Console", functionName: "toggleConsolePanel()" },
          { id: "toggle-assets", label: "Toggle Asset Browser", functionName: "toggleAssetBrowserPanel()" },
        ],
      },
      {
        id: "view-zoom",
        label: "Zoom and Navigation",
        tools: [
          {
            id: "viewport-navigator",
            label: "Viewport Navigator",
            category: "authoring",
            description: "Provides minimap and zoom controls for the editor viewport.",
          },
        ],
        actions: [
          { id: "zoom-in", label: "Zoom In", functionName: "zoomIn()" },
          { id: "zoom-out", label: "Zoom Out", functionName: "zoomOut()" },
          { id: "zoom-fit", label: "Fit to Screen", functionName: "zoomFitAll()" },
          { id: "zoom-reset", label: "Reset Zoom", functionName: "zoomReset()" },
        ],
      },
      {
        id: "view-display",
        label: "Display Modes",
        tools: [
          {
            id: "grid-overlay-toggle",
            label: "Grid Overlay Toggle",
            category: "authoring",
            description: "Shows or hides the spatial grid in the editor.",
          },
        ],
        actions: [
          { id: "toggle-grid", label: "Toggle Grid", functionName: "toggleGrid()" },
          { id: "toggle-snapping", label: "Toggle Snapping", functionName: "toggleSnapping()" },
          { id: "toggle-dark-mode", label: "Toggle Dark Mode", functionName: "toggleDarkMode()" },
          { id: "toggle-fullscreen", label: "Full Screen", functionName: "toggleFullscreen()" },
        ],
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    subMenus: [
      {
        id: "db-ships",
        label: "Ships and Vessels",
        tools: [
          {
            id: "ship-class-editor",
            label: "Ship Class Editor",
            category: "authoring",
            description: "Defines hull classes, hardpoints, and base stats.",
          },
          {
            id: "ship-variant-editor",
            label: "Ship Variant Editor",
            category: "authoring",
            description: "Creates faction-specific variants from base hull classes.",
          },
        ],
        actions: [
          { id: "open-ship-db", label: "Ships", functionName: "openShipDatabase()" },
          { id: "open-hull-db", label: "Hull Classes", functionName: "openHullClassDatabase()" },
          { id: "open-module-db", label: "Ship Modules", functionName: "openShipModuleDatabase()" },
        ],
      },
      {
        id: "db-weapons",
        label: "Weapons and Defenses",
        tools: [
          {
            id: "weapon-stats-editor",
            label: "Weapon Stats Editor",
            category: "authoring",
            description: "Configures damage, range, fire rate, and energy cost.",
          },
          {
            id: "defense-system-editor",
            label: "Defense System Editor",
            category: "authoring",
            description: "Configures shields, armor, and point-defense stats.",
          },
        ],
        actions: [
          { id: "open-weapon-db", label: "Weapons", functionName: "openWeaponDatabase()" },
          { id: "open-shield-db", label: "Shields", functionName: "openShieldDatabase()" },
          { id: "open-armor-db", label: "Armor", functionName: "openArmorDatabase()" },
          { id: "open-ammo-db", label: "Ammunition", functionName: "openAmmunitionDatabase()" },
        ],
      },
      {
        id: "db-aliens",
        label: "Alien Species",
        tools: [
          {
            id: "species-profile-editor",
            label: "Species Profile Editor",
            category: "authoring",
            description: "Defines biology, culture, traits, and technology level.",
          },
        ],
        actions: [
          { id: "open-species-db", label: "Species", functionName: "openSpeciesDatabase()" },
          { id: "open-creatures-db", label: "Creatures", functionName: "openCreatureDatabase()" },
        ],
      },
      {
        id: "db-technology",
        label: "Technologies",
        tools: [
          {
            id: "tech-tree-editor",
            label: "Tech Tree Editor",
            category: "authoring",
            description: "Arranges technology nodes, prerequisites, and unlock effects.",
          },
        ],
        actions: [
          { id: "open-tech-db", label: "Technologies", functionName: "openTechnologyDatabase()" },
          { id: "open-research-db", label: "Research Projects", functionName: "openResearchDatabase()" },
        ],
      },
      {
        id: "db-items",
        label: "Items and Resources",
        tools: [
          {
            id: "item-database-editor",
            label: "Item Database Editor",
            category: "authoring",
            description: "Manages inventory items, consumables, and artifacts.",
          },
          {
            id: "resource-node-editor",
            label: "Resource Node Editor",
            category: "authoring",
            description: "Defines mineable resources, yields, and depletion rates.",
          },
        ],
        actions: [
          { id: "open-items-db", label: "Items", functionName: "openItemDatabase()" },
          { id: "open-resources-db", label: "Resources", functionName: "openResourceDatabase()" },
          { id: "open-commodities-db", label: "Commodities", functionName: "openCommodityDatabase()" },
          { id: "open-artifacts-db", label: "Artifacts", functionName: "openArtifactDatabase()" },
        ],
      },
    ],
  },
  {
    id: "world",
    label: "World",
    subMenus: [
      {
        id: "world-galaxy",
        label: "Galaxy Map",
        tools: [
          {
            id: "galaxy-map-canvas",
            label: "Galaxy Map Canvas",
            category: "authoring",
            description: "Visual editor for placing star systems and trade lanes.",
          },
          {
            id: "sector-boundary-tool",
            label: "Sector Boundary Tool",
            category: "authoring",
            description: "Draws and labels galactic sectors and regions.",
          },
        ],
        actions: [
          { id: "open-galaxy-map", label: "Galaxy Map", functionName: "openGalaxyMapEditor()" },
          { id: "open-sector-editor", label: "Sectors", functionName: "openSectorEditor()" },
          { id: "open-trade-lanes", label: "Trade Lanes", functionName: "openTradeLaneEditor()" },
        ],
      },
      {
        id: "world-systems",
        label: "Star Systems",
        tools: [
          {
            id: "star-system-builder",
            label: "Star System Builder",
            category: "authoring",
            description: "Arranges star, planet, moon, and station objects in a system.",
          },
        ],
        actions: [
          { id: "open-star-systems", label: "Star Systems", functionName: "openStarSystemEditor()" },
          { id: "open-anomalies", label: "Anomalies", functionName: "openAnomalyEditor()" },
          { id: "open-nebulae", label: "Nebulae", functionName: "openNebulaeEditor()" },
        ],
      },
      {
        id: "world-planets",
        label: "Planets and Stations",
        tools: [
          {
            id: "planet-surface-editor",
            label: "Planet Surface Editor",
            category: "authoring",
            description: "Paints terrain biomes, settlements, and point-of-interest markers.",
          },
          {
            id: "space-station-builder",
            label: "Space Station Builder",
            category: "authoring",
            description: "Assembles modular station layouts with docks and services.",
          },
        ],
        actions: [
          { id: "open-planets", label: "Planets", functionName: "openPlanetEditor()" },
          { id: "open-stations", label: "Space Stations", functionName: "openSpaceStationEditor()" },
          { id: "open-asteroids", label: "Asteroid Fields", functionName: "openAsteroidFieldEditor()" },
          { id: "open-derelicts", label: "Derelict Sites", functionName: "openDerelictEditor()" },
        ],
      },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    subMenus: [
      {
        id: "systems-ship",
        label: "Ship Systems",
        tools: [
          {
            id: "subsystem-designer",
            label: "Subsystem Designer",
            category: "authoring",
            description: "Configures ship subsystem specs, slots, and power costs.",
          },
        ],
        actions: [
          { id: "open-ship-systems", label: "Ship Systems Designer", functionName: "openShipSystemsDesigner()" },
          { id: "open-power-grid", label: "Power Grid Planner", functionName: "openPowerGridPlanner()" },
          { id: "open-life-support", label: "Life Support Designer", functionName: "openLifeSupportDesigner()" },
        ],
      },
      {
        id: "systems-crew",
        label: "Crew and Characters",
        tools: [
          {
            id: "crew-roster-editor",
            label: "Crew Roster Editor",
            category: "authoring",
            description: "Manages crew profiles, skills, and station assignments.",
          },
        ],
        actions: [
          { id: "open-crew-editor", label: "Crew Editor", functionName: "openCrewEditor()" },
          { id: "open-skills-tree", label: "Crew Skill Trees", functionName: "openCrewSkillTrees()" },
          { id: "open-crew-dialogue", label: "Crew Dialogue", functionName: "openCrewDialogueEditor()" },
        ],
      },
      {
        id: "systems-research",
        label: "Research and Technology",
        tools: [
          {
            id: "research-tree-canvas",
            label: "Research Tree Canvas",
            category: "authoring",
            description: "Drag-and-drop layout of technology research nodes.",
          },
        ],
        actions: [
          { id: "open-research-editor", label: "Research Designer", functionName: "openResearchDesigner()" },
          { id: "open-tech-upgrades", label: "Upgrade Paths", functionName: "openUpgradePathEditor()" },
        ],
      },
      {
        id: "systems-diplomacy",
        label: "Factions and Diplomacy",
        tools: [
          {
            id: "faction-graph-editor",
            label: "Faction Relation Graph",
            category: "authoring",
            description: "Visualises faction-to-faction relationship scores.",
          },
        ],
        actions: [
          { id: "open-faction-editor", label: "Faction Editor", functionName: "openFactionEditor()" },
          { id: "open-diplomacy-rules", label: "Diplomacy Rules", functionName: "openDiplomacyRulesEditor()" },
          { id: "open-treaty-templates", label: "Treaty Templates", functionName: "openTreatyTemplateEditor()" },
        ],
      },
    ],
  },
  {
    id: "play",
    label: "Play",
    subMenus: [
      {
        id: "play-test",
        label: "Test and Simulate",
        tools: [
          {
            id: "playtest-launcher",
            label: "Playtest Launcher",
            category: "debug",
            description: "Boots the game with current project state for rapid testing.",
          },
          {
            id: "combat-simulator",
            label: "Combat Simulator",
            category: "debug",
            description: "Runs isolated combat scenarios with configurable fleets.",
          },
        ],
        actions: [
          { id: "run-game", label: "Run Game", functionName: "runGame()" },
          { id: "test-mission", label: "Test Mission", functionName: "testCurrentMission()" },
          { id: "simulate-combat", label: "Simulate Combat", functionName: "simulateCombat()" },
          { id: "simulate-trade", label: "Simulate Trade Route", functionName: "simulateTradeRoute()" },
        ],
      },
      {
        id: "play-debug-run",
        label: "Debug Run",
        tools: [
          {
            id: "scenario-preset-picker",
            label: "Scenario Preset Picker",
            category: "debug",
            description: "Launches the game at predefined test checkpoints.",
          },
        ],
        actions: [
          { id: "debug-run", label: "Debug Run", functionName: "runGameWithDebugger()" },
          { id: "start-at-checkpoint", label: "Start at Checkpoint", functionName: "startAtCheckpoint()" },
          { id: "stress-test", label: "Stress Test", functionName: "runStressTest()" },
        ],
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    subMenus: [
      {
        id: "tools-plugins",
        label: "Plugins and Mods",
        tools: [
          {
            id: "plugin-manager-panel",
            label: "Plugin Manager",
            category: "authoring",
            description: "Installs, updates, and removes editor and runtime plugins.",
          },
        ],
        actions: [
          { id: "open-plugin-manager", label: "Plugin Manager", functionName: "openPluginManager()" },
          { id: "open-mod-manager", label: "Mod Manager", functionName: "openModManager()" },
          { id: "open-script-console", label: "Script Console", functionName: "openScriptConsole()" },
        ],
      },
      {
        id: "tools-debug",
        label: "Debug and Profile",
        tools: [
          {
            id: "debugger-panel",
            label: "Visual Debugger",
            category: "debug",
            description: "Steps through runtime execution with breakpoints.",
          },
          {
            id: "profiler-panel",
            label: "Performance Profiler",
            category: "debug",
            description: "Captures frame time, CPU, and memory usage graphs.",
          },
        ],
        actions: [
          { id: "open-debugger", label: "Debugger", functionName: "openDebugger()" },
          { id: "open-profiler", label: "Profiler", functionName: "openProfiler()" },
          { id: "open-log-viewer", label: "Log Viewer", functionName: "openLogViewer()" },
          { id: "run-diagnostics", label: "Run Diagnostics", functionName: "runDiagnostics()" },
        ],
      },
      {
        id: "tools-build",
        label: "Build and Deploy",
        tools: [
          {
            id: "build-pipeline-panel",
            label: "Build Pipeline",
            category: "build",
            description: "Configures and executes multi-target build pipelines.",
          },
        ],
        actions: [
          { id: "build-project", label: "Build Project", functionName: "buildProject()" },
          { id: "clean-build", label: "Clean Build", functionName: "cleanBuild()" },
          { id: "package-release", label: "Package Release", functionName: "packageRelease()" },
          { id: "upload-patch", label: "Upload Patch", functionName: "uploadPatch()" },
        ],
      },
    ],
  },
];
