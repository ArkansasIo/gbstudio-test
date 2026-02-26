import React from "react";

export const MenuBar = () => (
  <div className="menu-bar">
    File | Edit | View | Tools | Build | Run | Help
  </div>
);

export const Toolbar = () => (
  <div className="toolbar">
    <button>New</button>
    <button>Open</button>
    <button>Save</button>
    <button>Undo</button>
    <button>Redo</button>
    <button>Playtest</button>
    <button>Build</button>
    <button>Import Asset</button>
  </div>
);

export const ProjectExplorer = () => (
  <div className="project-explorer">
    <ul>
      <li>Maps</li>
      <li>Characters</li>
      <li>Events</li>
      <li>Items</li>
      <li>Skills</li>
      <li>Enemies</li>
      <li>Tilesets</li>
      <li>Audio</li>
      <li>Scripts</li>
    </ul>
  </div>
);

export const PropertiesInspector = () => (
  <div className="properties-inspector">
    <h3>Properties</h3>
    <div>Name: <input type="text" /></div>
    <div>Type: <select><option>Map</option><option>Event</option><option>Character</option></select></div>
    <div>X: <input type="number" /></div>
    <div>Y: <input type="number" /></div>
    {/* ...other properties... */}
  </div>
);

export const OutputConsole = () => (
  <div className="output-console">
    <h3>Output / Console</h3>
    <pre>// Build logs, errors, playtest output</pre>
  </div>
);

export const MainWorkspace = () => (
  <div className="main-workspace">
    <div className="map-editor">Map Editor Area (Tile grid, drag & drop)</div>
    <div className="event-scripting">Event Scripting Panel (Node-based or List)</div>
    {/* Add Database Editor, Asset Viewer, etc. as needed */}
  </div>
);

export const RPGGameMakerUILayout = () => (
  <div className="rpg-game-maker-ui">
    <MenuBar />
    <Toolbar />
    <div className="main-area">
      <ProjectExplorer />
      <MainWorkspace />
      <PropertiesInspector />
    </div>
    <OutputConsole />
  </div>
);

export default RPGGameMakerUILayout;
