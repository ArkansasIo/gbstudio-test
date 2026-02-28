import {
  RPG_WORKBENCH_TEMPLATE,
  RPG_WORKBENCH_TEMPLATE_JSON,
} from "../../src/components/rpgWorkbenchTemplate";
import { RPG_TOOL_REGISTRY } from "../../src/app/rpg/input";
import { unrealTopMenus, unrealToolbar } from "../../src/components/rpgGameMakerConfig";

describe("RPG_WORKBENCH_TEMPLATE", () => {
  test("includes all shell menu labels", () => {
    const shellMenuLabels = unrealTopMenus.map((menu) => menu.label);
    shellMenuLabels.forEach((label) => {
      expect(RPG_WORKBENCH_TEMPLATE.starterState.enabledShellMenus).toContain(label);
    });
  });

  test("includes all toolbar and RPG registry tool labels", () => {
    const toolbarActions = unrealToolbar.flatMap((group) => group.actions);
    const registryTools = RPG_TOOL_REGISTRY.map((tool) => tool.label);
    [...toolbarActions, ...registryTools].forEach((label) => {
      expect(RPG_WORKBENCH_TEMPLATE.starterState.enabledTools).toContain(label);
    });
  });

  test("json export is valid and aligned with template id", () => {
    const parsed = JSON.parse(RPG_WORKBENCH_TEMPLATE_JSON) as {
      id: string;
      libraries: { counts: { toolCount: number } };
    };
    expect(parsed.id).toBe(RPG_WORKBENCH_TEMPLATE.id);
    expect(parsed.libraries.counts.toolCount).toBe(RPG_TOOL_REGISTRY.length);
  });
});
