import {
  createToolWorkbenchRecords,
  ensureWorkbenchToolRecord,
  markWorkbenchToolRun,
  setWorkbenchToolBitMode,
  setWorkbenchToolCoverageTarget,
  setWorkbenchToolFrameBudget,
  setWorkbenchToolOwner,
  setWorkbenchToolRisk,
  setWorkbenchToolStatus,
  toggleWorkbenchChecklistItem,
} from "app/rpg/runtime";

describe("toolWorkbench runtime model", () => {
  test("creates default records for registered tools", () => {
    const records = createToolWorkbenchRecords();
    expect(Object.keys(records).length).toBeGreaterThan(20);
    expect(records["Map Editor"]).toBeDefined();
    expect(records["Map Editor"].checklist.length).toBeGreaterThan(0);
  });

  test("can ensure and mutate ad-hoc tool records", () => {
    const customTool = "Custom Tool XYZ";
    const withCustom = ensureWorkbenchToolRecord(createToolWorkbenchRecords(), customTool);
    expect(withCustom[customTool]).toBeDefined();

    let records = withCustom;
    records = setWorkbenchToolStatus(records, customTool, "blocked");
    records = setWorkbenchToolOwner(records, customTool, "qa_owner");
    records = setWorkbenchToolBitMode(records, customTool, "64bit");
    records = setWorkbenchToolRisk(records, customTool, "high");
    records = setWorkbenchToolFrameBudget(records, customTool, 33);
    records = setWorkbenchToolCoverageTarget(records, customTool, 93);

    expect(records[customTool].status).toBe("blocked");
    expect(records[customTool].owner).toBe("qa_owner");
    expect(records[customTool].bitMode).toBe("64bit");
    expect(records[customTool].config.risk).toBe("high");
    expect(records[customTool].config.frameBudgetMs).toBe(33);
    expect(records[customTool].config.coverageTarget).toBe(93);
  });

  test("tracks checklist progress and run markers", () => {
    const tool = "Map Editor";
    let records = createToolWorkbenchRecords();
    const firstItem = records[tool].checklist[0];

    records = toggleWorkbenchChecklistItem(records, tool, firstItem.id);
    expect(records[tool].completion).toBeGreaterThan(0);
    expect(records[tool].status).toBe("in_progress");

    records = markWorkbenchToolRun(records, tool, "smoke test");
    expect(records[tool].lastRunAt).toBeTruthy();
    expect(records[tool].notes).toContain("smoke test");
  });
});
