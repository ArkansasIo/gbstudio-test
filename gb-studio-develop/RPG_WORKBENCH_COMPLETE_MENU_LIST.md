# RPG Workbench - Complete Menu, Submenu, and Tools List

## Overview
This document lists all menus, submenus, tools, and actions available in the RPG Workbench.

**Total Statistics:**
- 10 Main Menus
- 21 Submenus
- 50 Tools
- 58 Actions

---

## 1. Main Menu

### 1.1 Start and Continue
**Tools:**
- **Save Slot Browser** (content) - Selects existing profiles and save snapshots
- **Profile Selector** (content) - Chooses player profile metadata

**Actions:**
- New Game → `startNewGame()`
- Continue → `continueFromSave()`

### 1.2 Pre-Game Options
**Tools:**
- **Language Picker** (content) - Sets locale before session start
- **Accessibility Presets** (content) - Applies predefined readability settings

**Actions:**
- Options → `openOptionsMenu()`
- How To Play → `openTutorialMenu()`

---

## 2. In-game Pause Menu

### 2.1 Party and Inventory
**Tools:**
- **Party Manager** (authoring) - Edits active lineup and reserves
- **Inventory Grid** (authoring) - Shows item stacks and categories
- **Equipment Inspector** (authoring) - Compares loadouts and derived stats

**Actions:**
- Party → `openPartyMenu()`
- Inventory → `openInventoryMenu()`
- Skills → `openSkillsMenu()`

### 2.2 Save and System
**Tools:**
- **Save Slot Manager** (runtime) - Manages save slot create/update/delete
- **Checkpoint Browser** (runtime) - Lists world checkpoints by map and chapter

**Actions:**
- Save → `saveGame()`
- Load → `loadGame()`
- Options → `openOptionsMenu()`
- Quit → `quitToTitle()`

---

## 3. Character Status Menu

### 3.1 Stats and Progression
**Tools:**
- **Stat Graph** (authoring) - Plots attributes over level range
- **Level Curve Viewer** (authoring) - Previews exp gain and breakpoints
- **Trait Matrix** (authoring) - Compares passive/active trait impacts

**Actions:**
- View Stats → `openCharacterStats(actorId)`
- Allocate Points → `allocateStatPoints(actorId)`

### 3.2 Equipment and Loadout
**Tools:**
- **Equipment Slots** (authoring) - Edits weapon/armor/accessory slots
- **Set Bonus Preview** (authoring) - Shows active and potential set bonuses

**Actions:**
- Equip Item → `equipItem(actorId, itemId)`
- Unequip Item → `unequipItem(actorId, slotId)`

---

## 4. Map, Quest, and Journal Menus

### 4.1 Map and Fast Travel
**Tools:**
- **World Map** (content) - Displays regions, nodes, and markers
- **Region Markers** (content) - Configures named map landmarks
- **Teleport Nodes** (runtime) - Links reachable fast-travel points

**Actions:**
- Open Map → `openWorldMap()`
- Fast Travel → `fastTravel(targetNodeId)`

### 4.2 Quest and Journal
**Tools:**
- **Quest Tracker** (authoring) - Sets active objectives and states
- **Objective Timeline** (authoring) - Orders steps and completion triggers
- **Lore Journal** (content) - Stores codex entries and notes

**Actions:**
- Quest Log → `openQuestJournal()`
- Track Quest → `setActiveQuest(questId)`

---

## 5. Battle and Tactical Menus

### 5.1 Battle Commands
**Tools:**
- **Turn Queue** (runtime) - Displays current and next turn actors
- **Skill Palette** (authoring) - Groups skills by class and role
- **Target Preview** (runtime) - Shows effect previews before commit

**Actions:**
- Attack → `battleAttack(targetId)`
- Skill → `battleUseSkill(skillId, targetId)`
- Item → `battleUseItem(itemId, targetId)`
- Guard → `battleGuard()`

### 5.2 Summons and Escape
**Tools:**
- **Summon Deck** (authoring) - Configures summon entities and costs
- **Escape Probability Meter** (runtime) - Reports flee chance and modifiers

**Actions:**
- Summon → `battleSummon(summonId)`
- Escape → `battleAttemptEscape()`

---

## 6. Options, Help, and Debug Menus

### 6.1 Accessibility and Language
**Tools:**
- **Text Size Slider** (content) - Scales dialogue and menu fonts
- **Contrast Profiles** (content) - Applies contrast and brightness profiles
- **Colorblind Modes** (content) - Provides palette-safe accessibility presets

**Actions:**
- Language → `setLanguage(locale)`
- Accessibility → `applyAccessibilityPreset(presetId)`

### 6.2 Debug and Diagnostics
**Tools:**
- **Debug Console** (debug) - Runs runtime debug commands
- **Profiler Overlay** (debug) - Shows frame, CPU, and memory metrics
- **Script Trace Monitor** (debug) - Streams event and script traces

**Actions:**
- Debug Tools → `openDebugMenu()`
- Bestiary → `openBestiary()`
- Gallery → `openGallery()`
- Credits → `openCreditsRoll()`

---

## 7. Crafting, Gathering, and Housing Menus

### 7.1 Crafting Stations
**Tools:**
- **Crafting Station Editor** (authoring) - Define station types, recipes, and upgrade tiers
- **Resource Node Editor** (authoring) - Configure gatherable nodes, respawn rules, and loot

**Actions:**
- Recipe Book → `openCraftingBook()`
- Craft Item → `craftItem(recipeId)`
- Salvage → `salvageItem(itemId)`

### 7.2 Housing and Base Building
**Tools:**
- **Housing Layout Editor** (authoring) - Build player housing floors, rooms, and props
- **Furniture Placement Grid** (authoring) - Snap and validate furniture placement rules

**Actions:**
- Housing → `openHousingMenu()`
- Place Furniture → `placeFurniture(furnitureId)`
- Set Home Point → `setHomePoint(locationId)`

---

## 8. MMORPG Social and Guild Menus

### 8.1 Chat and Presence
**Tools:**
- **Chat Channel Manager** (runtime) - Create public/private channels and moderation rules
- **Presence State Editor** (runtime) - Set online/away/busy social status behavior

**Actions:**
- Open Chat → `openChatWindow(channelId)`
- Send Message → `sendChatMessage(channelId, text)`
- Block Player → `blockPlayer(playerId)`

### 8.2 Guild and Clan
**Tools:**
- **Guild Rank Editor** (authoring) - Define guild rank permissions and hierarchy
- **Guild Bank Auditor** (debug) - Track deposits, withdrawals, and role limits

**Actions:**
- Open Guild Panel → `openGuildPanel()`
- Create Guild → `createGuild(guildName)`
- Invite Member → `inviteGuildMember(playerId)`
- Guild Quest → `startGuildQuest(questId)`

### 8.3 Party Finder and Matchmaking
**Tools:**
- **Matchmaking Rule Editor** (authoring) - Set queue filters for role, level, and region
- **LFG Board Moderator** (debug) - Inspect listings and anti-spam controls

**Actions:**
- Open LFG → `openLookingForGroup()`
- Create Listing → `createPartyListing(templateId)`
- Join Listing → `joinPartyListing(listingId)`

---

## 9. MMORPG Live Ops and Seasonal Menus

### 9.1 Season Pass and Rewards
**Tools:**
- **Season Track Editor** (authoring) - Define tiers, XP requirements, and claim windows
- **Reward Claim Debugger** (debug) - Validate reward claims and duplicate protection

**Actions:**
- Season Pass → `openSeasonPass()`
- Claim Reward → `claimSeasonReward(tierId)`

### 9.2 Events and Rotations
**Tools:**
- **Event Rotation Editor** (authoring) - Schedule dailies, weeklies, and timed challenges
- **Telemetry KPI Viewer** (debug) - Track retention, completion, and event economy impact

**Actions:**
- Open Events → `openEventCalendar()`
- Start World Event → `startWorldEvent(eventId)`
- Claim Daily → `claimDailyReward(dayKey)`

---

## 10. System Admin and Operations Menus

### 10.1 Server Operations
**Tools:**
- **Server Shard Panel** (runtime) - Inspect shard uptime, load, and channel health
- **Maintenance Mode Switch** (build) - Manage safe deploy and downtime windows

**Actions:**
- Server Status → `openServerStatus()`
- Toggle Maintenance → `toggleMaintenanceMode()`
- Broadcast Message → `broadcastSystemMessage(text)`

### 10.2 Economy and Security
**Tools:**
- **Economy Anomaly Detector** (debug) - Flags unusual market spikes and exploit signatures
- **Anti-Cheat Rule Editor** (debug) - Define suspicious activity triggers and responses

**Actions:**
- Economy Board → `openEconomyBoard()`
- Run Cheat Scan → `runCheatScan(playerId)`
- Suspend Account → `suspendAccount(playerId)`

---

## Tool Categories

### Authoring (19 tools)
Tools for creating and editing game content:
- Party Manager, Inventory Grid, Equipment Inspector
- Stat Graph, Level Curve Viewer, Trait Matrix
- Equipment Slots, Set Bonus Preview
- Quest Tracker, Objective Timeline
- Skill Palette, Summon Deck
- Crafting Station Editor, Resource Node Editor
- Housing Layout Editor, Furniture Placement Grid
- Guild Rank Editor, Matchmaking Rule Editor
- Season Track Editor, Event Rotation Editor

### Runtime (9 tools)
Tools for runtime game systems:
- Save Slot Manager, Checkpoint Browser
- Teleport Nodes, Turn Queue, Target Preview
- Escape Probability Meter
- Chat Channel Manager, Presence State Editor
- Server Shard Panel

### Content (10 tools)
Tools for content management:
- Save Slot Browser, Profile Selector
- Language Picker, Accessibility Presets
- World Map, Region Markers, Lore Journal
- Text Size Slider, Contrast Profiles, Colorblind Modes

### Debug (8 tools)
Tools for debugging and diagnostics:
- Debug Console, Profiler Overlay, Script Trace Monitor
- Guild Bank Auditor, LFG Board Moderator
- Reward Claim Debugger, Telemetry KPI Viewer
- Economy Anomaly Detector, Anti-Cheat Rule Editor

### Build (1 tool)
Tools for build and deployment:
- Maintenance Mode Switch

---

## Quick Reference

### Most Common Actions
1. Save/Load game
2. Open inventory/party
3. View character stats
4. Open world map
5. Track quests
6. Battle commands (Attack, Skill, Item, Guard)
7. Craft items
8. Social features (chat, guild)

### Most Used Tools
1. Party Manager
2. Inventory Grid
3. Quest Tracker
4. World Map
5. Skill Palette
6. Equipment Inspector
7. Save Slot Manager
8. Debug Console

---

## File Location
Source: `src/app/rpg/input/menuTree.ts`

## Related Documentation
- `RPG_WORKBENCH_DEBUG_GUIDE.md` - Debugging guide
- `RPG_WORKBENCH_TEMPLATE_LIBS.md` - Template documentation
- `MENU_TESTING_GUIDE.md` - Testing instructions
