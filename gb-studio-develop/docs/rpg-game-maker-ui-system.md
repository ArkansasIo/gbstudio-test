# RPG Game Maker UI System

This document describes the conceptual layout, UI components, and system design for a modern RPG game maker, inspired by RPG Maker and visual scripting tools.

---

## 1. UI Layout Overview

- **Menu Bar:** File | Edit | View | Tools | Build | Run | Help
- **Toolbar:** New, Open, Save, Undo, Redo, Playtest, Build, Import Asset
- **Panels:**
  - **Project Explorer (Left):** Maps, Characters, Events, Items, Skills, Enemies, Tilesets, Audio, Scripts
  - **Main Workspace (Center):** Map Editor, Event Editor, Database Editor, Script/Logic Editor, Asset Viewer
  - **Properties/Inspector (Right):** Context-sensitive properties for selected objects
  - **Output/Console (Bottom):** Build logs, errors, playtest output

---

## 2. Panel Details

### Project Explorer
- Tree view of all project assets and data
- Right-click: New, Rename, Delete, Duplicate

### Main Workspace
- **Map Editor:** Tile grid, palette, layers, zoom/pan, drag-and-drop
- **Event Editor:** Visual scripting (node-based or list)
- **Database Editor:** Table/grid for items, skills, enemies, etc.
- **Asset Viewer:** Thumbnails for graphics/audio

### Properties/Inspector
- Shows editable fields for selected map, event, character, etc.
- Example fields: Name, Type, Stats, Triggers, Images

### Output/Console
- Displays logs, errors, playtest/debug output

---

## 3. Menu Structure Example

- **File:** New Project, Open, Save, Save As, Export, Exit
- **Edit:** Undo, Redo, Cut, Copy, Paste, Preferences
- **View:** Toggle panels, Zoom, Grid, Fullscreen
- **Tools:** Map Editor, Event Editor, Database, Asset Manager, Script Editor
- **Build:** Build Project, Clean, Export ROM
- **Run:** Playtest, Debug
- **Help:** Documentation, Tutorials, About

---

## 4. Visual Scripting/Event Example

- **Event: Treasure Chest**
  - Trigger: On Interact
  - Actions:
    - Play open animation
    - Add item to inventory
    - Show message: "You found a potion!"

---

## 5. Blueprint/Visual Scripting System

- **Blueprint Types:**
  - Blueprint Class, Level Blueprint, Function Library, Interface, Macro Library, Animation Blueprint, Widget Blueprint
- **Editor Menus:**
  - File, Edit, View, Blueprint, Debug, Window
- **System Components:**
  - Event Graph, Construction Script, Variables, Functions, Macros, Events, Components, Timeline, State Machines
- **Features:**
  - Visual scripting, debugging, variable watching, C++ integration, inheritance, interfaces

---

## 6. Game Types, Classes, and Tools

### Platformer
- Classes: Player, Enemy, Platform, Level, PowerUp, Projectile
- Tools: Level Editor, Sprite Editor, Physics Editor, Sound Editor, Debugger

### RPG
- Classes: Player, NPC, Enemy, Item, Inventory, Quest, Map, Dialogue
- Tools: Map Editor, Dialogue Editor, Character Editor, Inventory Editor, Battle Editor, Music Editor, Debugger

### Puzzle
- Classes: Board, Piece, Player, Timer, Score
- Tools: Board Editor, Piece Editor, Logic Editor, Sound Editor, Debugger

### Shooter
- Classes: Player, Enemy, Bullet, PowerUp, Level, Boss
- Tools: Level Editor, Sprite Editor, Weapon Editor, Sound Editor, Debugger

### Adventure
- Classes: Player, NPC, Item, Puzzle, Map, Dialogue
- Tools: Map Editor, Dialogue Editor, Inventory Editor, Puzzle Editor, Sound Editor, Debugger

### Racing
- Classes: Car, Track, Player, Opponent, PowerUp, LapTimer
- Tools: Track Editor, Car Editor, Physics Editor, Sound Editor, Debugger

---

## 7. Tools for 8, 16, 32, 64-bit Game Development

### 8-bit (Game Boy)
- RGBDS, BGB, GBTD, GBMB, hUGETracker, Enchantment Game Engine

### 16-bit (SNES, Genesis)
- WLA-DX, bsnes, SGDK, YY-CHR

### 32-bit (GBA, PS1)
- devkitPro, mGBA, No$GBA, PSY-Q SDK

### 64-bit (N64, PS2)
- libdragon, Project64, PCSX2, PS2SDK

---

## 8. UI Mockup (Mermaid Diagram)

```mermaid
flowchart TD
    MenuBar["Menu Bar: File | Edit | View | Tools | Build | Run | Help"]
    Toolbar["Toolbar: New | Open | Save | Undo | Redo | Playtest | Build | Import Asset"]
    ProjectExplorer["Project Explorer\n- Maps\n- Characters\n- Events\n- Items\n- Skills\n- Enemies\n- Tilesets\n- Audio\n- Scripts"]
    MainWorkspace["Main Workspace\n(Map Editor, Event Editor, Database, Asset Viewer)"]
    PropertiesInspector["Properties / Inspector\n(Name, Type, Stats, Triggers, etc.)"]
    OutputConsole["Output / Console\n(Build logs, errors, playtest output)"]

    MenuBar --> Toolbar
    Toolbar --> MainArea
    MainArea --> ProjectExplorer
    MainArea --> MainWorkspace
    MainArea --> PropertiesInspector
    MainWorkspace --> EventScripting["Event Scripting Panel (Node-based or List)"]
    MainWorkspace --> MapEditor["Map Editor Area (Tile grid, drag & drop)"]
    MainArea --> OutputConsole

    classDef panel fill:#f9f,stroke:#333,stroke-width:1px;
    class MenuBar,Toolbar,ProjectExplorer,MainWorkspace,PropertiesInspector,OutputConsole,panel;
    class MainArea panel;
```

---

This document can be used as a reference for UI/UX design, system planning, or as a starting point for implementation in TypeScript/React or other frameworks.
