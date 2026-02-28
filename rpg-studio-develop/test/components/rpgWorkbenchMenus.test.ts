import { runMenuCommand, createInitialEditorState } from "../../src/components/rpgMakerEditorSystems";
import { unrealTopMenus } from "../../src/components/rpgGameMakerConfig";

describe("RPG Workbench Top Bar Menus", () => {
  let initialState: ReturnType<typeof createInitialEditorState>;

  beforeEach(() => {
    initialState = createInitialEditorState();
  });

  describe("Menu Structure", () => {
    it("should have all expected top-level menus", () => {
      const expectedMenus = [
        "File",
        "Edit",
        "View",
        "Tools",
        "RPG",
        "Blueprints",
        "Build",
        "Play",
        "Window",
        "Help",
      ];

      const actualMenus = unrealTopMenus.map((menu) => menu.label);
      expect(actualMenus).toEqual(expectedMenus);
    });

    it("should have File menu items", () => {
      const fileMenu = unrealTopMenus.find((m) => m.label === "File");
      expect(fileMenu).toBeDefined();
      expect(fileMenu?.items).toContain("New Project");
      expect(fileMenu?.items).toContain("Open Project");
      expect(fileMenu?.items).toContain("Save All");
      expect(fileMenu?.items).toContain("Source Control");
      expect(fileMenu?.items).toContain("Project Settings");
      expect(fileMenu?.items).toContain("Package Project");
      expect(fileMenu?.items).toContain("Exit");
    });

    it("should have Edit menu items", () => {
      const editMenu = unrealTopMenus.find((m) => m.label === "Edit");
      expect(editMenu).toBeDefined();
      expect(editMenu?.items).toContain("Undo");
      expect(editMenu?.items).toContain("Redo");
      expect(editMenu?.items).toContain("Cut");
      expect(editMenu?.items).toContain("Copy");
      expect(editMenu?.items).toContain("Paste");
      expect(editMenu?.items).toContain("Duplicate");
      expect(editMenu?.items).toContain("Delete");
      expect(editMenu?.items).toContain("Editor Preferences");
    });

    it("should have RPG menu items", () => {
      const rpgMenu = unrealTopMenus.find((m) => m.label === "RPG");
      expect(rpgMenu).toBeDefined();
      expect(rpgMenu?.items).toContain("Party Manager");
      expect(rpgMenu?.items).toContain("Inventory Builder");
      expect(rpgMenu?.items).toContain("Dialogue Graph");
      expect(rpgMenu?.items).toContain("Quest Tracker");
      expect(rpgMenu?.items).toContain("Battle Designer");
      expect(rpgMenu?.items).toContain("Economy Tables");
    });

    it("should have Tools menu items", () => {
      const toolsMenu = unrealTopMenus.find((m) => m.label === "Tools");
      expect(toolsMenu).toBeDefined();
      expect(toolsMenu?.items).toContain("Tilemap Editor");
      expect(toolsMenu?.items).toContain("Sprite Editor");
      expect(toolsMenu?.items).toContain("C Script Editor");
      expect(toolsMenu?.items).toContain("Quest Designer");
      expect(toolsMenu?.items).toContain("Skill Database");
      expect(toolsMenu?.items).toContain("AI Behavior Graph");
    });

    it("should have Build menu items", () => {
      const buildMenu = unrealTopMenus.find((m) => m.label === "Build");
      expect(buildMenu).toBeDefined();
      expect(buildMenu?.items).toContain("Build Project");
      expect(buildMenu?.items).toContain("Build ROM");
      expect(buildMenu?.items).toContain("Build Web");
      expect(buildMenu?.items).toContain("Build Pocket");
      expect(buildMenu?.items).toContain("Clean");
    });
  });

  describe("Menu Command Execution", () => {
    it("should handle New Project command", () => {
      const result = runMenuCommand(initialState, "File", "New Project");
      expect(result.projectName).toBe("New_8bit_Project");
      expect(result.modified).toBe(false);
      expect(result.outputLog).toContain("[File] New Project");
    });

    it("should handle Save All command", () => {
      const modifiedState = { ...initialState, modified: true };
      const result = runMenuCommand(modifiedState, "File", "Save All");
      expect(result.modified).toBe(false);
      expect(result.outputLog.some((log) => log.includes("Project saved"))).toBe(true);
    });

    it("should handle Build ROM command", () => {
      const result = runMenuCommand(initialState, "Build", "Build ROM");
      expect(result.outputLog.some((log) => log.includes("ROM"))).toBe(true);
    });

    it("should handle Build Web command", () => {
      const result = runMenuCommand(initialState, "Build", "Build Web");
      expect(result.outputLog.some((log) => log.includes("Web"))).toBe(true);
    });

    it("should handle Build Pocket command", () => {
      const result = runMenuCommand(initialState, "Build", "Build Pocket");
      expect(result.outputLog.some((log) => log.includes("Pocket"))).toBe(true);
    });

    it("should handle C Script Editor command", () => {
      const result = runMenuCommand(initialState, "Tools", "C Script Editor");
      expect(result.outputLog.some((log) => log.includes("C script editor"))).toBe(true);
    });

    it("should handle Compile C Scripts command", () => {
      const result = runMenuCommand(initialState, "Blueprints", "Compile C Scripts");
      expect(result.outputLog.some((log) => log.includes("compile"))).toBe(true);
    });

    it("should handle Party Manager command", () => {
      const result = runMenuCommand(initialState, "RPG", "Party Manager");
      expect(result.outputLog.some((log) => log.includes("Party Manager"))).toBe(true);
    });

    it("should handle Battle Designer command", () => {
      const result = runMenuCommand(initialState, "RPG", "Battle Designer");
      expect(result.outputLog.some((log) => log.includes("battle designer"))).toBe(true);
    });

    it("should handle Quest Designer command", () => {
      const result = runMenuCommand(initialState, "Tools", "Quest Designer");
      expect(result.outputLog.some((log) => log.includes("Quest Designer"))).toBe(true);
    });

    it("should handle Undo command", () => {
      const result = runMenuCommand(initialState, "Edit", "Undo");
      expect(result.outputLog.some((log) => log.includes("Undo"))).toBe(true);
    });

    it("should handle Redo command", () => {
      const result = runMenuCommand(initialState, "Edit", "Redo");
      expect(result.outputLog.some((log) => log.includes("Redo"))).toBe(true);
    });

    it("should handle Documentation command", () => {
      const result = runMenuCommand(initialState, "Help", "Documentation");
      expect(result.outputLog.some((log) => log.includes("docs") || log.includes("Documentation"))).toBe(true);
    });

    it("should handle Check for Updates command", () => {
      const result = runMenuCommand(initialState, "Help", "Check for Updates (GitHub)");
      expect(result.outputLog.some((log) => log.includes("github"))).toBe(true);
    });
  });

  describe("Menu State Management", () => {
    it("should preserve state when executing menu commands", () => {
      const customState = {
        ...initialState,
        projectName: "MyProject",
        mapName: "CustomMap",
      };

      const result = runMenuCommand(customState, "File", "Open Project");
      expect(result.projectName).toBe("MyProject");
      expect(result.mapName).toBe("CustomMap");
    });

    it("should append to output log without losing previous entries", () => {
      const stateWithLog = {
        ...initialState,
        outputLog: ["Previous log entry"],
      };

      const result = runMenuCommand(stateWithLog, "File", "Save All");
      expect(result.outputLog).toContain("Previous log entry");
      expect(result.outputLog.length).toBeGreaterThan(1);
    });
  });

  describe("All Menu Items Coverage", () => {
    it("should handle all File menu items without errors", () => {
      const fileMenu = unrealTopMenus.find((m) => m.label === "File");
      fileMenu?.items.forEach((item) => {
        expect(() => runMenuCommand(initialState, "File", item)).not.toThrow();
      });
    });

    it("should handle all Edit menu items without errors", () => {
      const editMenu = unrealTopMenus.find((m) => m.label === "Edit");
      editMenu?.items.forEach((item) => {
        expect(() => runMenuCommand(initialState, "Edit", item)).not.toThrow();
      });
    });

    it("should handle all RPG menu items without errors", () => {
      const rpgMenu = unrealTopMenus.find((m) => m.label === "RPG");
      rpgMenu?.items.forEach((item) => {
        expect(() => runMenuCommand(initialState, "RPG", item)).not.toThrow();
      });
    });

    it("should handle all Tools menu items without errors", () => {
      const toolsMenu = unrealTopMenus.find((m) => m.label === "Tools");
      toolsMenu?.items.forEach((item) => {
        expect(() => runMenuCommand(initialState, "Tools", item)).not.toThrow();
      });
    });

    it("should handle all Build menu items without errors", () => {
      const buildMenu = unrealTopMenus.find((m) => m.label === "Build");
      buildMenu?.items.forEach((item) => {
        expect(() => runMenuCommand(initialState, "Build", item)).not.toThrow();
      });
    });
  });
});
