import React, { useState } from "react";
import { defaultProjectStructure, menuStructure, exampleEvent } from "./rpgGameMakerConfig";

// MenuBar Component with dropdowns
const MenuBar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <div className="menu-bar" style={{ display: 'flex', gap: 16, background: '#eee', padding: 4 }}>
      {menuStructure.map((menu) => (
        <div
          key={menu.label}
          className="menu-label"
          style={{ position: 'relative' }}
          onMouseEnter={() => setOpenMenu(menu.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span style={{ cursor: 'pointer', fontWeight: 600 }}>{menu.label}</span>
          {openMenu === menu.label && (
            <div style={{ position: 'absolute', top: 20, left: 0, background: '#fff', border: '1px solid #bbb', zIndex: 10 }}>
              {menu.items.map((item) => (
                <div key={item} style={{ padding: '4px 16px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{item}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Toolbar Component
const Toolbar: React.FC<{ onPlaytest: () => void; onBuild: () => void }> = ({ onPlaytest, onBuild }) => (
  <div className="toolbar">
    <button>New</button>
    <button>Open</button>
    <button>Save</button>
    <button>Undo</button>
    <button>Redo</button>
    <button onClick={onPlaytest}>Playtest</button>
    <button onClick={onBuild}>Build/Export</button>
    <button>Import Asset</button>
  </div>
);

// ProjectExplorer Component with context menu
const ProjectExplorer: React.FC<{ onSelect: (type: string, name: string) => void }> = ({ onSelect }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: string } | null>(null);
  const handleContextMenu = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type });
  };
  const handleMenuAction = (action: string) => {
    // For demo, just close menu
    setContextMenu(null);
    // Could add logic for New, Rename, Delete, Duplicate
  };
  return (
    <div className="project-explorer" style={{ minWidth: 160, background: '#f5f5f5', padding: 8 }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.keys(defaultProjectStructure).map((type) => (
          <li key={type} onContextMenu={e => handleContextMenu(e, type)} style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 600 }}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <ul style={{ listStyle: 'none', paddingLeft: 16 }}>
              <li onClick={() => onSelect(type, "Sample")}>Sample {type.slice(0, -1)}</li>
            </ul>
          </li>
        ))}
      </ul>
      {contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: '#fff',
            border: '1px solid #bbb',
            zIndex: 100,
            boxShadow: '2px 2px 8px #ccc'
          }}
          onMouseLeave={() => setContextMenu(null)}
        >
          {['New', 'Rename', 'Delete', 'Duplicate'].map((action) => (
            <div key={action} style={{ padding: '4px 16px', cursor: 'pointer' }} onClick={() => handleMenuAction(action)}>{action}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// PropertiesInspector Component (advanced editing)
const PropertiesInspector: React.FC<{ selected: { type: string; name: string } | null }> = ({ selected }) => {
  const [name, setName] = useState(selected?.name || "");
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    setName(selected?.name || "");
    setDesc("");
    setValue(0);
  }, [selected]);

  if (!selected) {
    return (
      <div className="properties-inspector">
        <h3>Properties</h3>
        <div>Select an item to view properties.</div>
      </div>
    );
  }
  return (
    <div className="properties-inspector">
      <h3>Properties</h3>
      <div>Type: {selected.type}</div>
      <div>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Description: <input value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div>
        Value: <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
      </div>
      {/* Add more advanced fields as needed */}
    </div>
  );
};

// OutputConsole Component
const OutputConsole: React.FC<{ logs: string[] }> = ({ logs }) => (
  <div className="output-console">
    <h3>Output / Console</h3>
    <pre>{logs.join("\n")}</pre>
  </div>
);


// MapEditor Component (basic grid and palette)
const TILE_SIZE = 32;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 8;
const PALETTE = ["#7cfc00", "#228b22", "#deb887", "#4682b4", "#fff", "#000"];

const MapEditor: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [tiles, setTiles] = useState<string[][]>(
    Array(GRID_HEIGHT).fill(null).map(() => Array(GRID_WIDTH).fill(PALETTE[0]))
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleTileClick = (y: number, x: number) => {
    setTiles((prev) => {
      const newTiles = prev.map((row) => [...row]);
      newTiles[y][x] = selectedColor;
      return newTiles;
    });
  };

  const handleTileMouseDown = (y: number, x: number) => {
    setIsDragging(true);
    handleTileClick(y, x);
  };
  const handleTileMouseUp = () => setIsDragging(false);
  const handleTileMouseEnter = (y: number, x: number) => {
    if (isDragging) handleTileClick(y, x);
  };

  return (
    <div className="map-editor" style={{ display: "flex", gap: 16 }}>
      <div>
        <div style={{ marginBottom: 8 }}>Tile Palette:</div>
        <div style={{ display: "flex", gap: 4 }}>
          {PALETTE.map((color) => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: 32,
                height: 32,
                background: color,
                border: selectedColor === color ? "2px solid #333" : "1px solid #aaa",
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>Map Grid:</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_WIDTH}, ${TILE_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_HEIGHT}, ${TILE_SIZE}px)`,
            gap: 1,
            background: "#888",
            border: "2px solid #444"
          }}
          onMouseUp={handleTileMouseUp}
          onMouseLeave={handleTileMouseUp}
        >
          {tiles.map((row, y) =>
            row.map((color, x) => (
              <div
                key={`${y}-${x}`}
                onMouseDown={() => handleTileMouseDown(y, x)}
                onMouseEnter={() => handleTileMouseEnter(y, x)}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  background: color,
                  border: "1px solid #222",
                  cursor: "pointer"
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};


// EventEditor Component (basic node-based mockup)
const EventEditor: React.FC = () => {
  // Example nodes and connections
  const nodes = [
    { id: 1, label: "On Interact", x: 20, y: 40 },
    { id: 2, label: "Play Animation", x: 200, y: 20 },
    { id: 3, label: "Add Item", x: 200, y: 100 },
    { id: 4, label: "Show Message", x: 400, y: 60 }
  ];
  const connections = [
    [1, 2],
    [2, 3],
    [3, 4]
  ];
  return (
    <div className="event-editor" style={{ position: "relative", width: 600, height: 200, background: "#f8f8ff", border: "1px solid #bbb", margin: 8 }}>
      {/* Render connections as SVG lines */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {connections.map(([from, to], i) => {
          const n1 = nodes.find(n => n.id === from);
          const n2 = nodes.find(n => n.id === to);
          if (!n1 || !n2) return null;
          return (
            <line
              key={i}
              x1={n1.x + 80}
              y1={n1.y + 20}
              x2={n2.x}
              y2={n2.y + 20}
              stroke="#888"
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L10,5 L0,10 Z" fill="#888" />
          </marker>
        </defs>
      </svg>
      {/* Render nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          style={{
            position: "absolute",
            left: node.x,
            top: node.y,
            width: 80,
            height: 40,
            background: "#fff",
            border: "2px solid #4682b4",
            borderRadius: 8,
            textAlign: "center",
            lineHeight: "40px",
            fontWeight: 600,
            boxShadow: "2px 2px 6px #ccc"
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
};


// DatabaseEditor Component (simple table for items, skills, enemies)
const DatabaseEditor: React.FC = () => {
  const [tab, setTab] = useState<'items' | 'skills' | 'enemies'>('items');
  // Example data
  const data = {
    items: [
      { name: 'Potion', effect: 'Heal 50 HP' },
      { name: 'Ether', effect: 'Restore 20 MP' }
    ],
    skills: [
      { name: 'Fireball', power: 30 },
      { name: 'Ice Shard', power: 25 }
    ],
    enemies: [
      { name: 'Slime', hp: 20 },
      { name: 'Goblin', hp: 35 }
    ]
  };
  return (
    <div className="database-editor" style={{ marginTop: 24, background: '#f4f4f4', padding: 12, borderRadius: 8, width: 400 }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setTab('items')} style={{ fontWeight: tab === 'items' ? 'bold' : 'normal' }}>Items</button>
        <button onClick={() => setTab('skills')} style={{ fontWeight: tab === 'skills' ? 'bold' : 'normal', marginLeft: 8 }}>Skills</button>
        <button onClick={() => setTab('enemies')} style={{ fontWeight: tab === 'enemies' ? 'bold' : 'normal', marginLeft: 8 }}>Enemies</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {Object.keys(data[tab][0]).map((col) => (
              <th key={col} style={{ borderBottom: '1px solid #bbb', textAlign: 'left', padding: 4 }}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data[tab].map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j} style={{ padding: 4 }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


// AssetManager Component (simple asset list for graphics/audio)
const AssetManager: React.FC = () => {
  const graphics = ["hero.png", "tileset.png", "enemy.png"];
  const audio = ["battle_theme.mp3", "victory.wav"];
  return (
    <div className="asset-manager" style={{ marginTop: 24, background: '#f9f9f9', padding: 12, borderRadius: 8, width: 300 }}>
      <h4>Asset Manager</h4>
      <div>
        <strong>Graphics:</strong>
        <ul>
          {graphics.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </div>
      <div>
        <strong>Audio:</strong>
        <ul>
          {audio.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
};


// EmulatorWindow Component (playtest mockup)
const EmulatorWindow: React.FC<{ visible: boolean }> = ({ visible }) => (
  visible ? (
    <div style={{
      marginTop: 24,
      width: 320,
      height: 240,
      background: '#222',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid #4682b4',
      borderRadius: 8
    }}>
      <span>Emulator/Playtest Window</span>
    </div>
  ) : null
);

// MainWorkspace Component (MapEditor + EventEditor + DatabaseEditor + AssetManager + EmulatorWindow)
const MainWorkspace: React.FC<{ selected: { type: string; name: string } | null, playtest: boolean }> = ({ selected, playtest }) => (
  <div className="main-workspace">
    <MapEditor />
    <div style={{ marginTop: 24 }}>
      <h4>Event Scripting Panel</h4>
      <EventEditor />
    </div>
    <DatabaseEditor />
    <AssetManager />
    <EmulatorWindow visible={playtest} />
  </div>
);

// Main UI Layout
const RPGGameMakerUI: React.FC = () => {
  const [selected, setSelected] = useState<{ type: string; name: string } | null>(null);
  const [logs, setLogs] = useState<string[]>(["Welcome to RPG Game Maker UI!"]);
  const [playtest, setPlaytest] = useState(false);

  const handlePlaytest = () => {
    setLogs((prev) => [...prev, "[Playtest] Game started in emulator window."]);
    setPlaytest(true);
    setTimeout(() => setPlaytest(false), 3000); // Hide after 3 seconds (mockup)
  };

  const handleBuild = () => {
    setLogs((prev) => [...prev, "[Build] Project built and exported successfully."]);
  };

  const handleSelect = (type: string, name: string) => {
    setSelected({ type, name });
    setLogs((prev) => [...prev, `[Select] ${type}: ${name}`]);
  };

  return (
    <div className="rpg-game-maker-ui">
      <MenuBar />
      <Toolbar onPlaytest={handlePlaytest} onBuild={handleBuild} />
      <div className="main-area" style={{ display: "flex" }}>
        <ProjectExplorer onSelect={handleSelect} />
        <MainWorkspace selected={selected} playtest={playtest} />
        <PropertiesInspector selected={selected} />
      </div>
      <OutputConsole logs={logs} />
    </div>
  );
};

export default RPGGameMakerUI;
