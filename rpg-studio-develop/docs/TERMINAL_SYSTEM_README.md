# RPG Workbench Terminal System

A comprehensive terminal system for debugging, error handling, warnings, and issue tracking in the RPG Workbench.

## Features

### Core Functionality
- **Real-time Message Logging**: Display info, success, warning, error, debug, system, and command messages
- **Message Filtering**: Filter by type, severity, source, and search query
- **Message Statistics**: Track total messages, errors, warnings, and debug messages
- **Command History**: Navigate through previously executed commands with arrow keys
- **Auto-scroll**: Automatically scroll to new messages (can be toggled)
- **Pause/Resume**: Pause message logging to review current messages
- **Expandable Messages**: Expand messages to view details and stack traces
- **Timestamps**: Optional timestamp display for each message

### Error Handling
- **Structured Errors**: Categorized error handling (compilation, runtime, script, asset, network, etc.)
- **Severity Levels**: Low, medium, high, and critical severity classification
- **Stack Traces**: Full stack trace display for debugging
- **File References**: Link errors to specific files, lines, and columns
- **Error Codes**: Display error codes for quick reference

### Message Types
1. **Info**: General informational messages
2. **Success**: Successful operation messages
3. **Warning**: Warning messages with severity levels
4. **Error**: Error messages with stack traces and file references
5. **Debug**: Debug messages for development
6. **System**: System-level messages
7. **Command**: Command execution and output
8. **Output**: General output messages

## Architecture

### State Management
```
src/store/features/terminal/
├── terminalState.ts       # Redux state and reducers
├── terminalActions.ts     # Action creators and helpers
└── terminalSelectors.ts   # Selectors for accessing state
```

### Components
```
src/components/terminal/
├── Terminal.tsx           # Main terminal component
├── TerminalMessage.tsx    # Individual message display
├── TerminalToolbar.tsx    # Toolbar with controls and filters
└── TerminalInput.tsx      # Command input with history
```

### Utilities
```
src/lib/terminal/
├── terminalLogger.ts      # Centralized logging system
└── errorHandler.ts        # Error handling utilities
```

### Theme
```
src/components/ui/theme/
└── terminalTheme.ts       # Terminal color schemes
```

## Usage

### Basic Logging

```typescript
import { useAppDispatch } from "store/hooks";
import terminalActions from "store/features/terminal/terminalActions";

function MyComponent() {
  const dispatch = useAppDispatch();
  
  // Log messages
  dispatch(terminalActions.log("Operation started"));
  dispatch(terminalActions.success("Operation completed successfully"));
  dispatch(terminalActions.warn("This is a warning"));
  dispatch(terminalActions.error("An error occurred"));
  dispatch(terminalActions.debug("Debug information"));
}
```

### Using Terminal Logger

```typescript
import { useAppDispatch } from "store/hooks";
import { createTerminalLogger } from "lib/terminal/terminalLogger";

function MyComponent() {
  const dispatch = useAppDispatch();
  const logger = createTerminalLogger(dispatch, "MyComponent");
  
  // Log with context
  logger.info("Component initialized");
  logger.success("Data loaded successfully");
  logger.warn("Deprecated API usage detected");
  logger.error("Failed to save data", new Error("Network error"));
  
  // Time operations
  await logger.time("Data fetch", async () => {
    return await fetchData();
  });
  
  // Group related messages
  logger.group("Processing items", () => {
    items.forEach(item => logger.debug(`Processing ${item.name}`));
  });
}
```

### Error Handling

```typescript
import { useAppDispatch } from "store/hooks";
import { createErrorHandler, ErrorCategory, ErrorSeverity } from "lib/terminal/errorHandler";

function MyComponent() {
  const dispatch = useAppDispatch();
  const errorHandler = createErrorHandler(dispatch);
  
  // Handle different error types
  try {
    compileScript();
  } catch (error) {
    errorHandler.handleCompilationError(
      "Failed to compile script",
      "script.js",
      42,
      10,
      "SYNTAX_ERROR"
    );
  }
  
  // Handle runtime errors
  errorHandler.handleRuntimeError(
    "Null pointer exception",
    error,
    "game.js",
    100
  );
  
  // Handle asset errors
  errorHandler.handleAssetError(
    "Failed to load sprite",
    "assets/sprites/player.png",
    "File not found"
  );
  
  // Install global error handlers
  errorHandler.installGlobalHandlers();
}
```

### Specialized Error Logging

```typescript
import terminalActions from "store/features/terminal/terminalActions";

// Compilation errors
dispatch(terminalActions.compileError(
  "Syntax error: unexpected token",
  "script.js",
  42,
  10,
  "E001"
));

// Runtime errors
dispatch(terminalActions.runtimeError(
  "Uncaught exception",
  error.stack,
  "game.js",
  100
));

// Script errors
dispatch(terminalActions.scriptError(
  "Invalid event handler",
  "onPlayerMove",
  "Handler must return a boolean"
));

// Asset errors
dispatch(terminalActions.assetError(
  "Failed to load texture",
  "assets/textures/wall.png",
  "File format not supported"
));

// Performance warnings
dispatch(terminalActions.performanceWarning(
  "Slow script execution detected",
  "Script took 150ms to execute"
));

// Deprecation warnings
dispatch(terminalActions.deprecationWarning(
  "API method 'oldFunction' is deprecated",
  "Use 'newFunction' instead"
));
```

### Console Interception

```typescript
import { interceptConsole } from "lib/terminal/terminalLogger";

// Redirect console.log, console.warn, console.error to terminal
const restoreConsole = interceptConsole(dispatch);

// All console calls now appear in terminal
console.log("This appears in terminal");
console.warn("This is a warning");
console.error("This is an error");

// Restore original console
restoreConsole();
```

## Integration

### Add to Redux Store

```typescript
// src/store/configureStore.ts
import terminalReducer from "./features/terminal/terminalState";

export const store = configureStore({
  reducer: {
    // ... other reducers
    terminal: terminalReducer,
  },
});
```

### Add to Theme

```typescript
// src/components/ui/theme/index.ts
import { darkTerminalTheme, lightTerminalTheme } from "./terminalTheme";

export const darkTheme = {
  colors: {
    // ... other colors
    terminal: darkTerminalTheme,
  },
};

export const lightTheme = {
  colors: {
    // ... other colors
    terminal: lightTerminalTheme,
  },
};
```

### Add to Application

```typescript
// src/components/app/App.tsx
import { Terminal } from "components/terminal/Terminal";

function App() {
  return (
    <div>
      {/* ... other components */}
      <Terminal />
    </div>
  );
}
```

## Commands

The terminal supports the following built-in commands:

- `clear` - Clear all messages
- `help` - Display available commands
- `stats` - Show message statistics
- `filter` - Display current filter settings

You can extend the command system by modifying the `handleCommand` function in `Terminal.tsx`.

## Filtering

### Filter by Type
Filter messages by type: info, success, warning, error, debug, system, command, output

### Filter by Severity
Filter messages by severity: low, medium, high, critical

### Filter by Source
Filter messages by source (e.g., compiler, runtime, script, assets)

### Search
Search messages by text in message, details, file, or source

## Best Practices

1. **Use Appropriate Message Types**: Choose the correct message type for better organization
2. **Provide Context**: Include source, file, line, and column information when available
3. **Use Severity Levels**: Classify errors and warnings by severity
4. **Include Details**: Add details and stack traces for debugging
5. **Use Categories**: Categorize messages for better filtering
6. **Create Child Loggers**: Use child loggers for component-specific logging
7. **Time Operations**: Use the `time` method to measure performance
8. **Group Related Messages**: Use the `group` method for related log entries

## Customization

### Custom Message Types
Extend the `TerminalMessageType` in `terminalState.ts` to add custom message types.

### Custom Themes
Modify `terminalTheme.ts` to customize colors and styling.

### Custom Commands
Extend the `handleCommand` function in `Terminal.tsx` to add custom commands.

### Custom Filters
Add custom filter logic in `terminalSelectors.ts`.

## Performance

- Messages are limited to 1000 by default (configurable via `maxMessages`)
- Old messages are automatically removed when limit is reached
- Filtering is optimized using Redux selectors with memoization
- Virtual scrolling can be added for very large message lists

## Accessibility

- Keyboard navigation for command history (arrow keys)
- Semantic HTML structure
- ARIA labels for screen readers
- High contrast color schemes
- Keyboard shortcuts for common actions

## Future Enhancements

- Export messages to file
- Message bookmarking
- Advanced filtering with regex
- Message grouping and collapsing
- Virtual scrolling for performance
- Custom message formatters
- Plugin system for custom message handlers
- Integration with external logging services
- Message persistence across sessions
- Collaborative debugging features

## Troubleshooting

### Messages not appearing
- Check if terminal is paused
- Verify Redux store is properly configured
- Check filter settings

### Performance issues
- Reduce `maxMessages` limit
- Enable message filtering
- Clear old messages regularly

### Styling issues
- Verify theme is properly configured
- Check styled-components setup
- Ensure theme provider is wrapping components

## License

Part of the RPG Workbench project.
