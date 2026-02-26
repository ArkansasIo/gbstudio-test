import React, { useMemo, useState } from "react";
import {
  blueprintGraph,
  blueprintNodeCatalog,
  unrealPanels,
  unrealToolbar,
  unrealTopMenus,
} from "./rpgGameMakerConfig";

const styles = {
  root: {
    display: "grid",
    gridTemplateRows: "30px 40px 1fr 24px",
    height: "100vh",
    background: "#111827",
    color: "#e5e7eb",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
  } as React.CSSProperties,
  menuBar: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "0 12px",
    background: "#1f2937",
    borderBottom: "1px solid #374151",
    fontSize: 12,
    userSelect: "none",
  } as React.CSSProperties,
  commandBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 10px",
    background: "#111827",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,
  group: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingRight: 10,
    marginRight: 10,
    borderRight: "1px solid #374151",
  } as React.CSSProperties,
  button: {
    background: "#374151",
    color: "#e5e7eb",
    border: "1px solid #4b5563",
    borderRadius: 4,
    padding: "4px 8px",
    fontSize: 12,
    cursor: "pointer",
  } as React.CSSProperties,
  workspace: {
    display: "grid",
    gridTemplateColumns: "260px 1fr 300px",
    gap: 8,
    padding: 8,
    overflow: "hidden",
  } as React.CSSProperties,
  column: {
    display: "grid",
    gap: 8,
    overflow: "hidden",
  } as React.CSSProperties,
  leftColumn: {
    gridTemplateRows: "1fr 1fr",
  } as React.CSSProperties,
  centerColumn: {
    gridTemplateRows: "58% 42%",
  } as React.CSSProperties,
  rightColumn: {
    gridTemplateRows: "1fr 1fr",
  } as React.CSSProperties,
  panel: {
    display: "grid",
    gridTemplateRows: "30px 1fr",
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: 6,
    overflow: "hidden",
    minHeight: 0,
  } as React.CSSProperties,
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    fontSize: 12,
    fontWeight: 700,
    background: "#111827",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,
  panelBody: {
    overflow: "auto",
    padding: 10,
    fontSize: 12,
  } as React.CSSProperties,
  listRow: {
    padding: "6px 8px",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,
  viewport: {
    background:
      "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1220 100%)",
    border: "1px solid #374151",
    borderRadius: 6,
    display: "grid",
    gridTemplateRows: "30px 1fr",
    overflow: "hidden",
    minHeight: 0,
  } as React.CSSProperties,
  viewportTabs: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 10px",
    fontSize: 12,
    background: "#0b1220",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,
  viewportArea: {
    position: "relative",
    overflow: "hidden",
  } as React.CSSProperties,
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  } as React.CSSProperties,
  blueprintArea: {
    position: "relative",
    background: "#0b1220",
    border: "1px solid #374151",
    borderRadius: 6,
    overflow: "hidden",
    minHeight: 0,
  } as React.CSSProperties,
  blueprintCanvas: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 200,
    backgroundImage:
      "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
    backgroundSize: "24px 24px",
  } as React.CSSProperties,
  statusBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    fontSize: 11,
    background: "#1f2937",
    borderTop: "1px solid #374151",
  } as React.CSSProperties,
};

const BlueprintGraphCanvas = () => {
  const nodeById = useMemo(() => {
    const map = new Map<string, (typeof blueprintGraph.nodes)[number]>();
    blueprintGraph.nodes.forEach((node) => map.set(node.id, node));
    return map;
  }, []);

  return (
    <div style={styles.blueprintArea}>
      <div style={styles.panelHeader}>
        <span>Level Blueprint: BP_SecretDoorController</span>
        <span>Schema: 8-bit 2D Gameplay</span>
      </div>
      <div style={styles.blueprintCanvas}>
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {blueprintGraph.edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) {
              return null;
            }
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

        {blueprintGraph.nodes.map((node) => (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              width: 170,
              borderRadius: 8,
              border: "1px solid #4b5563",
              background: node.color,
              color: "#f8fafc",
              boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
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
              Exec In | Exec Out
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RPGGameMakerUILayout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("File");
  const [selectedToolCategory, setSelectedToolCategory] = useState("Events");

  return (
    <div style={styles.root}>
      <div style={styles.menuBar}>
        {unrealTopMenus.map((menu) => (
          <div
            key={menu.label}
            style={{
              padding: "4px 6px",
              borderRadius: 4,
              background:
                selectedMenu === menu.label ? "rgba(59,130,246,0.25)" : "none",
              cursor: "pointer",
            }}
            onClick={() => setSelectedMenu(menu.label)}
            title={menu.items.join(" | ")}
          >
            {menu.label}
          </div>
        ))}
      </div>

      <div style={styles.commandBar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {unrealToolbar.map((group) => (
            <div key={group.name} style={styles.group}>
              <strong style={{ fontSize: 11 }}>{group.name}</strong>
              {group.actions.map((action) => (
                <button key={`${group.name}-${action}`} style={styles.button}>
                  {action}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={styles.button}>Target: Game Boy</button>
          <button style={styles.button}>Build: Development</button>
          <button style={styles.button}>Play In Editor</button>
        </div>
      </div>

      <div style={styles.workspace}>
        <div style={{ ...styles.column, ...styles.leftColumn }}>
          {unrealPanels.slice(0, 2).map((panel) => (
            <div key={panel.id} style={styles.panel}>
              <div style={styles.panelHeader}>{panel.title}</div>
              <div style={styles.panelBody}>
                {panel.entries.map((entry) => (
                  <div key={entry} style={styles.listRow}>
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...styles.column, ...styles.centerColumn }}>
          <div style={styles.viewport}>
            <div style={styles.viewportTabs}>
              <span>Perspective</span>
              <span>Top</span>
              <span>Front</span>
              <span style={{ marginLeft: "auto" }}>Viewport: 2D Tilemap</span>
            </div>
            <div style={styles.viewportArea}>
              <div style={styles.gridOverlay} />
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  top: 18,
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: "rgba(17,24,39,0.85)",
                  border: "1px solid #4b5563",
                  fontSize: 12,
                }}
              >
                Active Tool: Paint Tile
              </div>
            </div>
          </div>
          <BlueprintGraphCanvas />
        </div>

        <div style={{ ...styles.column, ...styles.rightColumn }}>
          {unrealPanels.slice(2).map((panel) => (
            <div key={panel.id} style={styles.panel}>
              <div style={styles.panelHeader}>{panel.title}</div>
              <div style={styles.panelBody}>
                {panel.id === "tools" ? (
                  <>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      {blueprintNodeCatalog.map((group) => (
                        <button
                          key={group.category}
                          style={{
                            ...styles.button,
                            background:
                              selectedToolCategory === group.category
                                ? "#2563eb"
                                : "#374151",
                          }}
                          onClick={() => setSelectedToolCategory(group.category)}
                        >
                          {group.category}
                        </button>
                      ))}
                    </div>
                    {blueprintNodeCatalog
                      .find((group) => group.category === selectedToolCategory)
                      ?.nodes.map((node) => (
                        <div key={node} style={styles.listRow}>
                          {node}
                        </div>
                      ))}
                  </>
                ) : (
                  panel.entries.map((entry) => (
                    <div key={entry} style={styles.listRow}>
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.statusBar}>
        <span>Project: Adventure_08bit | Map: Forest_Entrance | Layer: FG</span>
        <span>RAM Budget: 68% | ROM Bank: 21/32 | FPS: 60</span>
      </div>
    </div>
  );
};

export default RPGGameMakerUILayout;
