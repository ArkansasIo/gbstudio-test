import React, { useMemo, useState } from "react";
import {
  audioLibraryPacks,
  addBlueprintNodeFromCategory,
  type BlueprintNodeModel,
  connectSelectedToLatestNode,
  createInitialEditorState,
  removeSelectedBlueprintNode,
  runMenuCommand,
  runToolbarAction,
  selectAsset,
  selectBlueprintNode,
  selectLeftSidebarEntry,
  selectOutlinerEntry,
  setInspectorSection,
  setLeftSidebarList,
  setTopSearchQuery,
  setWorkspace,
  setToolCategory,
  triggerQuickTool,
} from "./rpgMakerEditorSystems";
import {
  blueprintNodeCatalog,
  linkedRPGFeatureCapabilities,
  linkedRPGFeatureNames,
  unrealToolbar,
  unrealTopMenus,
} from "./rpgGameMakerConfig";
import {
  leftSidebarLists,
  rightInspectorSections,
  statusActions,
  topBarQuickTools,
  workspacePresets,
} from "./rpgGameMakerAdvancedConfig";

const panelStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateRows: "30px 1fr",
  background: "#1f2937",
  border: "1px solid #374151",
  borderRadius: 6,
  overflow: "hidden",
  minHeight: 0,
};

const panelHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 6,
  padding: "0 10px",
  fontSize: 12,
  fontWeight: 700,
  background: "#111827",
  borderBottom: "1px solid #374151",
};

const panelBodyStyle: React.CSSProperties = {
  overflow: "auto",
  padding: 10,
  fontSize: 12,
};

const buttonStyle: React.CSSProperties = {
  background: "#374151",
  color: "#e5e7eb",
  border: "1px solid #4b5563",
  borderRadius: 4,
  padding: "4px 8px",
  fontSize: 12,
  cursor: "pointer",
};

const listRowStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderBottom: "1px solid #374151",
  cursor: "pointer",
};

export const RPGGameMakerUILayout: React.FC = () => {
  const [state, setState] = useState(createInitialEditorState);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const nodeById = useMemo(() => {
    const map = new Map<string, BlueprintNodeModel>();
    state.blueprintNodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [state.blueprintNodes]);

  const quickToolsByGroup = useMemo(() => {
    return topBarQuickTools.reduce<Record<string, typeof topBarQuickTools>>(
      (acc, tool) => {
        acc[tool.group] = [...(acc[tool.group] ?? []), tool];
        return acc;
      },
      {},
    );
  }, []);

  const leftList = useMemo(
    () => leftSidebarLists.find((list) => list.id === state.selectedLeftListId),
    [state.selectedLeftListId],
  );

  const inspectorSection = useMemo(
    () =>
      rightInspectorSections.find(
        (section) => section.id === state.selectedInspectorSectionId,
      ),
    [state.selectedInspectorSectionId],
  );

  const normalizedSearch = state.topSearchQuery.trim().toLowerCase();

  const filteredAssets = useMemo(() => {
    if (!normalizedSearch) {
      return state.assets;
    }
    return state.assets.filter((asset) =>
      `${asset.name} ${asset.type}`.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, state.assets]);

  const filteredOutliner = useMemo(() => {
    if (!normalizedSearch) {
      return state.outliner;
    }
    return state.outliner.filter((entry) =>
      entry.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, state.outliner]);

  const filteredLeftEntries = useMemo(() => {
    if (!leftList) {
      return [];
    }
    if (!normalizedSearch) {
      return leftList.entries;
    }
    return leftList.entries.filter((entry) =>
      entry.toLowerCase().includes(normalizedSearch),
    );
  }, [leftList, normalizedSearch]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "30px 42px 40px 1fr 120px 24px",
        height: "100vh",
        background: "#111827",
        color: "#e5e7eb",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "0 12px",
          background: "#1f2937",
          borderBottom: "1px solid #374151",
          fontSize: 12,
          userSelect: "none",
        }}
      >
        {unrealTopMenus.map((menu) => (
          <div
            key={menu.label}
            style={{ position: "relative" }}
            onMouseEnter={() => setOpenMenu(menu.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <div
              style={{
                padding: "4px 6px",
                borderRadius: 4,
                background:
                  state.selectedMenu === menu.label
                    ? "rgba(59,130,246,0.25)"
                    : "none",
                cursor: "pointer",
              }}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  selectedMenu: menu.label,
                }))
              }
            >
              {menu.label}
            </div>
            {openMenu === menu.label && (
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 0,
                  minWidth: 210,
                  background: "#0f172a",
                  border: "1px solid #334155",
                  zIndex: 20,
                }}
              >
                {menu.items.map((item) => (
                  <div
                    key={`${menu.label}-${item}`}
                    style={{
                      ...listRowStyle,
                      borderBottom: "1px solid #334155",
                    }}
                    onClick={() => {
                      setState((prev) => runMenuCommand(prev, menu.label, item));
                      setOpenMenu(null);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          background: "#0b1220",
          borderBottom: "1px solid #374151",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {workspacePresets.map((workspace) => (
            <button
              key={workspace.id}
              style={{
                ...buttonStyle,
                background:
                  state.activeWorkspaceId === workspace.id ? "#1d4ed8" : "#273244",
              }}
              title={workspace.description}
              onClick={() => setState((prev) => setWorkspace(prev, workspace.id))}
            >
              {workspace.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Object.entries(quickToolsByGroup).map(([group, tools]) => (
            <div
              key={group}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingRight: 8,
                borderRight: "1px solid #334155",
              }}
            >
              <span style={{ fontSize: 10, color: "#94a3b8" }}>{group}</span>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  style={{
                    ...buttonStyle,
                    padding: "3px 6px",
                    background:
                      state.activeQuickToolId === tool.id ? "#2563eb" : "#374151",
                  }}
                  onClick={() => setState((prev) => triggerQuickTool(prev, tool.id))}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          ))}
          <input
            value={state.topSearchQuery}
            placeholder="Search assets, actors, layers..."
            onChange={(e) =>
              setState((prev) => setTopSearchQuery(prev, e.currentTarget.value))
            }
            style={{
              width: 260,
              background: "#0f172a",
              color: "#e5e7eb",
              border: "1px solid #334155",
              borderRadius: 4,
              padding: "6px 8px",
              fontSize: 12,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 10px",
          background: "#111827",
          borderBottom: "1px solid #374151",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {unrealToolbar.map((group) => (
            <div
              key={group.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingRight: 10,
                marginRight: 10,
                borderRight: "1px solid #374151",
              }}
            >
              <strong style={{ fontSize: 11 }}>{group.name}</strong>
              {group.actions.map((action) => (
                <button
                  key={`${group.name}-${action}`}
                  style={{
                    ...buttonStyle,
                    background:
                      state.activeTool === action ? "#2563eb" : buttonStyle.background,
                  }}
                  onClick={() =>
                    setState((prev) => runToolbarAction(prev, group.name, action))
                  }
                >
                  {action}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={buttonStyle}>Target: Game Boy</button>
          <button style={buttonStyle}>Build: Development</button>
          <button
            style={buttonStyle}
            onClick={() =>
              setState((prev) => runToolbarAction(prev, "Play", "Play"))
            }
          >
            Play In Editor
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          gap: 8,
          padding: 8,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: 8 }}>
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Content Browser</div>
            <div style={panelBodyStyle}>
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedAssetId === asset.id
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectAsset(prev, asset.id))}
                >
                  <strong>[{asset.type}]</strong> {asset.name}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>World Outliner</div>
            <div style={panelBodyStyle}>
              {filteredOutliner.map((entry) => (
                <div
                  key={entry}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedOutlinerId === entry
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectOutlinerEntry(prev, entry))}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Scene Lists</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {leftSidebarLists.map((list) => (
                  <button
                    key={list.id}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedLeftListId === list.id ? "#2563eb" : "#374151",
                    }}
                    onClick={() => setState((prev) => setLeftSidebarList(prev, list.id))}
                  >
                    {list.title}
                  </button>
                ))}
              </div>
              {filteredLeftEntries.map((entry) => (
                <div
                  key={entry}
                  style={{
                    ...listRowStyle,
                    background:
                      state.selectedLeftListEntry === entry
                        ? "rgba(37,99,235,0.2)"
                        : "transparent",
                  }}
                  onClick={() => setState((prev) => selectLeftSidebarEntry(prev, entry))}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "58% 42%", gap: 8 }}>
          <div
            style={{
              ...panelStyle,
              background:
                "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1220 100%)",
            }}
          >
            <div style={panelHeaderStyle}>
              <span>2D Viewport</span>
              <span>Active Tool: {state.activeTool}</span>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                backgroundImage:
                  "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>
              <span>Blueprint Graph</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => addBlueprintNodeFromCategory(prev))}
                >
                  Add Node
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => connectSelectedToLatestNode(prev))}
                >
                  Connect
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => setState((prev) => removeSelectedBlueprintNode(prev))}
                >
                  Remove
                </button>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#0b1220",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            >
              <svg
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                {state.blueprintEdges.map((edge, index) => {
                  const from = nodeById.get(edge.from);
                  const to = nodeById.get(edge.to);
                  if (!from || !to) return null;
                  return (
                    <path
                      key={`${edge.from}-${edge.to}-${index}`}
                      d={`M ${from.x + 170} ${from.y + 25} C ${from.x + 220} ${
                        from.y + 25
                      }, ${to.x - 70} ${to.y + 25}, ${to.x} ${to.y + 25}`}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      fill="none"
                    />
                  );
                })}
              </svg>
              {state.blueprintNodes.map((node) => (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    width: 170,
                    borderRadius: 8,
                    border:
                      state.selectedBlueprintNodeId === node.id
                        ? "2px solid #60a5fa"
                        : "1px solid #4b5563",
                    background: node.color,
                    color: "#f8fafc",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setState((prev) => selectBlueprintNode(prev, node.id))
                  }
                >
                  <div
                    style={{
                      padding: "6px 10px",
                      fontWeight: 700,
                      fontSize: 12,
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {node.title}
                  </div>
                  <div style={{ padding: "6px 10px", fontSize: 11 }}>
                    {node.id} | Exec In/Out
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: 8 }}>
          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Details</div>
            <div style={panelBodyStyle}>
              <div style={listRowStyle}>Project: {state.projectName}</div>
              <div style={listRowStyle}>Map: {state.mapName}</div>
              <div style={listRowStyle}>Layer: {state.layerName}</div>
              <div style={listRowStyle}>
                Workspace:{" "}
                {workspacePresets.find((w) => w.id === state.activeWorkspaceId)?.label}
              </div>
              <div style={listRowStyle}>Modified: {state.modified ? "Yes" : "No"}</div>
              <div style={listRowStyle}>
                Selection:{" "}
                {state.selectedAssetId ||
                  state.selectedOutlinerId ||
                  state.selectedLeftListEntry ||
                  state.selectedBlueprintNodeId ||
                  "None"}
              </div>
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Tools and Features</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {blueprintNodeCatalog.map((group) => (
                  <button
                    key={group.category}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedToolCategory === group.category
                          ? "#2563eb"
                          : "#374151",
                    }}
                    onClick={() =>
                      setState((prev) => setToolCategory(prev, group.category))
                    }
                  >
                    {group.category}
                  </button>
                ))}
              </div>
              {(blueprintNodeCatalog.find(
                (group) => group.category === state.selectedToolCategory,
              )?.nodes ?? []
              ).map((node) => (
                <div key={node} style={listRowStyle}>
                  {node}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>Audio Libraries</div>
              <div style={listRowStyle}>
                Music Packs: {audioLibraryPacks.music.join(", ")}
              </div>
              <div style={listRowStyle}>SFX Packs: {audioLibraryPacks.sfx.join(", ")}</div>
              <div style={{ marginTop: 10, fontWeight: 700 }}>Linked RPG Features</div>
              {linkedRPGFeatureNames.map((featureName) => (
                <div key={featureName} style={listRowStyle}>
                  {featureName}
                </div>
              ))}
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                Linked Feature Capabilities
              </div>
              {linkedRPGFeatureCapabilities.slice(0, 20).map((capability) => (
                <div key={capability} style={listRowStyle}>
                  {capability}
                </div>
              ))}
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelHeaderStyle}>Inspector</div>
            <div style={panelBodyStyle}>
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {rightInspectorSections.map((section) => (
                  <button
                    key={section.id}
                    style={{
                      ...buttonStyle,
                      background:
                        state.selectedInspectorSectionId === section.id
                          ? "#2563eb"
                          : "#374151",
                    }}
                    onClick={() =>
                      setState((prev) => setInspectorSection(prev, section.id))
                    }
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              {(inspectorSection?.fields ?? []).map((field) => (
                <div key={field} style={listRowStyle}>
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #374151",
          background: "#0f172a",
          padding: "8px 10px",
          overflow: "auto",
          fontSize: 11,
          fontFamily: "Consolas, monospace",
        }}
      >
        {state.outputLog.map((line, idx) => (
          <div key={`log-${idx}`}>{line}</div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          fontSize: 11,
          background: "#1f2937",
          borderTop: "1px solid #374151",
        }}
      >
        <span>
          Project: {state.projectName} | Map: {state.mapName} | Layer: {state.layerName}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {statusActions.map((action) => (
            <button
              key={action.id}
              style={{ ...buttonStyle, padding: "2px 6px" }}
              onClick={() =>
                setState((prev) => triggerQuickTool(prev, `status:${action.id}`))
              }
            >
              {action.label}
            </button>
          ))}
          <span>RAM Budget: 68% | ROM Bank: 21/32 | FPS: 60</span>
        </span>
      </div>
    </div>
  );
};

export default RPGGameMakerUILayout;
