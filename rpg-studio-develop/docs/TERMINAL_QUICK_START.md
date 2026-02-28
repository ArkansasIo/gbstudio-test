# Terminal System Quick Start Guide

Get up and running with the RPG Workbench Terminal System in minutes.

## Installation

### 1. Add Terminal Reducer to Store

```typescript
// src/store/configureStore.ts
import terminalReducer from "./features/terminal/terminalState";

export const store = configureStore({
  reducer: {
    // ... existing reducers
    terminal: terminalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Add Terminal Theme

```typescript
// src/components/ui/theme/index.ts
import { darkTerminalTheme, lightTerminalTheme } from "./terminalTheme";

export const darkTheme = {
  colors: {
    // ... existing colors
    terminal: darkTerminalTheme,
  },
};

export const lightTheme = {
  colors: {
    // ... existing colors
    terminal: lightTerminalTheme,
  },
};
```

### 3. Add Terminal Component to UI

```typescript
// src/components/app/App.tsx
import { Terminal } from "components/terminal/Terminal";
import { useAppSelector } from "store/hooks";
import { selectIsTerminalOpen } from "store/features/terminal/terminalSelectors";

function App() {
  const isTerminalOpen = useAppSelector(selectIsTerminalOpen);
  
  return (
    <div>
      {/* Your existing UI */}
      
      {/* Terminal panel */}
      {isTerminalOpen && (
        <div style={{ height: "300px", borderTop: "1px solid #ccc" }}>
          <Terminal />
        </div>
      )}
    </div>
  );
}
```

### 4. Add Terminal Toggle Button

```typescript
// Add to your toolbar or menu
import { useAppDispatch } from "store/hooks";
import terminalActions from "store/features/terminal/terminalActions";

function Toolbar() {
  const dispatch = useAppDispatch();
  
  return (
    <button onClick={() => dispatch(terminalActions.toggleTerminal())}>
      Toggle Terminal
    </button>
  );
}
```

## Basic Usage

### Simple Logging

```typescript
import { useAppDispatch } from "store/hooks";
import terminalActions from "store/features/terminal/terminalActions";

function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    dispatch(terminalActions.log("Button clicked"));
    dispatch(terminalActions.success("Operation successful"));
    dispatch(terminalActions.warn("This is a warning"));
    dispatch(terminalActions.error("An error occurred"));
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

### Using Terminal Logger

```typescript
import { useAppDispatch } from "store/hooks";
import { createTerminalLogger } from "lib/terminal/terminalLogger";

function MyComponent() {
  const dispatch = useAppDispatch();
  const logger = createTerminalLogger(dispatch, "MyComponent");
  
  useEffect(() => {
    logger.info("Component mounted");
    
    return () => {
      logger.info("Component unmounted");
    };
  }, []);
  
  const loadData = async () => {
    try {
      logger.info("Loading data...");
      const data = await fetchData();
      logger.success("Data loaded successfully");
    } catch (error) {
      logger.error("Failed to load data", error);
    }
  };
  
  return <button onClick={loadData}>Load Data</button>;
}
```

### Error Handling

```typescript
import { useAppDispatch } from "store/hooks";
import { createErrorHandler } from "lib/terminal/errorHandler";

function MyComponent() {
  const dispatch = useAppDispatch();
  const errorHandler = createErrorHandler(dispatch);
  
  const compileScript = () => {
    try {
      // Your compilation logic
      throw new Error("Syntax error");
    } catch (error) {
      errorHandler.handleCompilationError(
        "Failed to compile script",
        "script.js",
        42,
        10,
        "SYNTAX_ERROR"
      );
    }
  };
  
  return <button onClick={compileScript}>Compile</button>;
}
```

## Common Patterns

### Build Process

```typescript
import { withBuildLogging } from "lib/terminal/terminalIntegration";

async function buildGame(dispatch: Dispatch) {
  await withBuildLogging(dispatch, "Game Build", async () => {
    // Your build logic here
    await compileScripts();
    await processAssets();
    await generateROM();
  });
}
```

### Progress Reporting

```typescript
import { createProgressReporter } from "lib/terminal/terminalIntegration";

async function loadAssets(dispatch: Dispatch) {
  const progress = createProgressReporter(dispatch, "asset-loader");
  const assets = ["sprite1.png", "sprite2.png", "music.mp3"];
  
  progress.start(assets.length, "Loading assets...");
  
  for (const asset of assets) {
    await loadAsset(asset);
    progress.step(`Loaded ${asset}`);
  }
  
  progress.complete("All assets loaded");
}
```

### Performance Monitoring

```typescript
import { createPerformanceMonitor } from "lib/terminal/terminalIntegration";

function MyComponent() {
  const dispatch = useAppDispatch();
  const monitor = createPerformanceMonitor(dispatch, 100); // 100ms threshold
  
  const processData = () => {
    monitor.measure("Data processing", () => {
      // Your processing logic
    });
  };
  
  return <button onClick={processData}>Process</button>;
}
```

## Keyboard Shortcuts

- **Arrow Up/Down**: Navigate command history in terminal input
- **Enter**: Execute command
- **Ctrl+L**: Clear terminal (if implemented)

## Built-in Commands

Type these commands in the terminal input:

- `clear` - Clear all messages
- `help` - Show available commands
- `stats` - Display message statistics
- `filter` - Show current filter settings

## Tips

1. **Use appropriate message types** for better organization
2. **Include context** in your logger names (e.g., "build", "compiler", "assets")
3. **Add details** to error messages for easier debugging
4. **Use severity levels** to prioritize issues
5. **Group related messages** for better readability
6. **Time operations** to identify performance bottlenecks

## Next Steps

- Read the full [Terminal System README](./TERMINAL_SYSTEM_README.md)
- Explore [examples](./src/lib/terminal/examples.ts)
- Customize the [theme](./src/components/ui/theme/terminalTheme.ts)
- Add custom commands to the terminal
- Integrate with your build system
- Set up error tracking and analytics

## Troubleshooting

### Terminal not showing
- Check if `isTerminalOpen` is true
- Verify Redux store configuration
- Check theme provider setup

### Messages not appearing
- Check if terminal is paused
- Verify filter settings
- Check Redux DevTools for state

### Styling issues
- Verify theme is properly configured
- Check styled-components setup
- Ensure ThemeProvider wraps components

## Support

For issues and questions:
- Check the [full documentation](./TERMINAL_SYSTEM_README.md)
- Review [examples](./src/lib/terminal/examples.ts)
- Check existing issues in the project

## License

Part of the RPG Workbench project.
