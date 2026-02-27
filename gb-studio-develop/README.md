# Enchantment Game Engine


Enchantment Game Engine is a quick and easy to use retro adventure game creator for Game Boy available for Mac, Linux and Windows.
For more information see the [Enchantment Game Engine]

Enchantment Game Engine consists of an [Electron](https://electronjs.org/) game builder application and a C based game engine using [GBDK](http://gbdk.sourceforge.net/).

## Installation

Download a release for your operating system from the [Enchantment Game Engine Downloads](https:// page.

Or to run from source, clone this repo then:

Install [NodeJS](https://nodejs.org/) (required version is given in [.nvmrc](.nvmrc))

```bash
> cd enchantment-game-engine
> corepack enable
> yarn
> npm run fetch-deps
> npm start
```

## AI Chat Key Setup

Create a `.env.local` file in the project root and set one provider:

```bash
# OpenRouter
AI_PROVIDER=openrouter
AI_MODEL=openai/gpt-4o-mini
AI_BASE_URL=https://openrouter.ai/api/v1/chat/completions
AI_API_KEY=your_openrouter_api_key_here

# OR OpenAI direct
# AI_PROVIDER=openai
# AI_MODEL=gpt-4o-mini
# AI_BASE_URL=https://api.openai.com/v1/chat/completions
# OPENAI_API_KEY=your_openai_api_key_here
```

Restart the app after changing env vars.

After checking out a new version you may also need to fetch dependencies again to ensure you have the latest v
```bash
> cd enchantment-game-engine
> npm run fetch-deps
```

The Studio currently uses Node 21.7.1. If you have [NVM](https://github.com/nvm-sh/nvm) installed you can use the included `.nvmrc` to switch to the supported Node version.

``
```

## Enchantment Game Engine CLI

Install Enchantment Game Engine from source as above then

```bash
> npm run make:cli
> yarn link
# From any folder you can now run gb-studio-cli
> $(yarn bin gb-studio-cli) -V
4.1.2
> $(yarn bin gb-studio-cli) --help
```

### Update the CLI

Pull the latest code and run make:cli again, yarn link is only needed for the first run.

```bash
> npm run make:cli
```

### CLI Examples

- **Export Project**

  ```bash
  > $(yarn bin -studio-cli) export path/to/project.proj out/
  ```

  Export GBDK project from gbsproj to out directory

- **Export Data**
  ```bash
  > $(yarn bin gb-studio-cli) export -d path/to/project.gbsproj out/
  ```
  Export only src/data and include/data from gbsproj to out directory
- **Make ROM**

  ```bash
  > $(yarn bin gb-studio-cli) make:rom path/to/project.gbsproj out/game.gb
  ```

  Make a ROM file from gbsproj

- **Make Pocket**

  ```bash
  > $(yarn bin gb-studio-cli) make:pocket path/to/project.gbsproj out/game.pocket
  ```

  Make a Pocket file from gbsproj

- **Make Web**
  ```bash
  > $(yarn bin gb-studio-cli) make:web path/to/project.gbsproj out/
  ```
  Make a Web build from gbsproj

## Documentation

[Enchantment Game Engine Documentation](https://github.com/ArkansasIo/gbstudio-test)

Local project docs index: [docs/README.md](./docs/README.md)

## Planned RPG Maker-Style Features & Tools

### Features & Tools
- Visual Event Editor (drag-and-drop event scripting)
- Tilemap Editor with autotiling
- Character/Enemy Database Editor
- Item/Inventory System Editor
- Quest/Journal System Tool
- Skill/Ability Editor
- Battle System Designer (turn-based, action, etc.)
- Cutscene/Dialogue Editor with branching choices
- Animation Editor for sprites and effects
- Map Linking/World Map Tool
- Save/Load System Manager
- Plugin/Script Manager for custom logic
- Visual Script Debugger (step through events, watch variables)
- Customizable HUD/Overlay Editor
- Enemy AI Behavior Editor (state machines, patrols, aggression)
- Sound/Music Manager (background music, sound effects, triggers)
- Achievement/Badge System Tool
- Resource Gathering/Crafting System Editor
- Minigame Editor (puzzles, card games, etc.)
- Import/Export Tool for assets and projects
- Localization/Translation Manager
- Modding Support Tools

### Game Engine Logic
- Turn-based and real-time battle systems
- Pathfinding for NPCs and monsters
- Day/Night and weather cycles
- Party management (switching, formation, etc.)
- Equipment and stat calculation systems
- Leveling and experience point logic
- Quest tracking and completion logic
- Dialogue branching and variable tracking
- Random encounter and spawn logic
- Autosave and checkpoint logic
- Grid-based and free movement systems
- Dynamic lighting and shadow logic
- Multi-layer parallax backgrounds
- Physics/collision system for action elements
- Dynamic event spawning/despawning
- Advanced save data management (multiple slots, cloud sync)
- In-game scripting API for user extensions
- Real-time multiplayer logic (if desired)
- Dynamic difficulty adjustment logic

### System Menus
- Main Menu (New Game, Continue, Options, Quit)
- In-game Pause Menu (Inventory, Equipment, Skills, Save, Load, Options, Quit)
- Character Status Menu
- Quest/Journal Menu
- Map/World Map Menu
- Party Management Menu
- Shop/Buy/Sell Menu
- Battle UI (commands, status, turn order)
- Options/Settings Menu (audio, controls, display, etc.)
- Bestiary/Monster Compendium
- Gallery/Unlockables Menu
- In-game Help/Tutorial Menu
- Credits/Roll Menu
- Debug/Cheat Menu (for development/testing)
- Language Selection Menu
- Accessibility Options Menu (colorblind modes, text size, etc.)

## Note For Translators

If you'd like to help contribute new language localisations to Enchantment Game Engine you can do so by submitting pull requests adding or updating the JSON files found here https://github.com/ArkansasIo/gbstudio-test/tree/main/src/lang

If you're looking to update an existing translation with content that is missing, there is a handy script that lists keys found in the English localisation that are not found and copies them to your localisation

```bash
npm run missing-translations lang
# e.g. npm run missing-translations de
# e.g. npm run missing-translations en-GB
````bash
> cd enchantment-game-engine
> nvm use
