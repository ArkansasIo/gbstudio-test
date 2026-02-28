/**
 * Terminal System Examples
 * 
 * Comprehensive examples of using the terminal system
 */

import type { Dispatch } from "@reduxjs/toolkit";
import { createTerminalLogger } from "./terminalLogger";
import { createErrorHandler, ErrorCategory, ErrorSeverity } from "./errorHandler";
import {
  withBuildLogging,
  withCompilationLogging,
  withAssetLogging,
  createProgressReporter,
  createPerformanceMonitor,
  createValidationReporter,
} from "./terminalIntegration";

/**
 * Example 1: Basic Logging
 */
export function exampleBasicLogging(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "example");
  
  logger.info("Application started");
  logger.success("Configuration loaded successfully");
  logger.warn("Using default settings");
  logger.error("Failed to connect to server", new Error("Connection timeout"));
  logger.debug("Debug mode enabled", { port: 3000, host: "localhost" });
}

/**
 * Example 2: Build Process Logging
 */
export async function exampleBuildProcess(dispatch: Dispatch) {
  await withBuildLogging(dispatch, "Game Build", async () => {
    const logger = createTerminalLogger(dispatch, "build");
    
    logger.info("Compiling scripts...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logger.info("Processing assets...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    logger.info("Generating ROM...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  });
}

/**
 * Example 3: Compilation with Error Handling
 */
export async function exampleCompilation(dispatch: Dispatch) {
  const errorHandler = createErrorHandler(dispatch);
  
  try {
    await withCompilationLogging(dispatch, "script.js", async () => {
      // Simulate compilation
      const hasError = Math.random() > 0.5;
      
      if (hasError) {
        errorHandler.handleCompilationError(
          "Unexpected token ';'",
          "script.js",
          42,
          15,
          "E001"
        );
        throw new Error("Compilation failed");
      }
      
      return { compiled: true };
    });
  } catch (error) {
    console.error("Compilation failed:", error);
  }
}

/**
 * Example 4: Asset Loading with Progress
 */
export async function exampleAssetLoading(dispatch: Dispatch) {
  const progress = createProgressReporter(dispatch, "asset-loader");
  const assets = [
    "sprites/player.png",
    "sprites/enemy.png",
    "backgrounds/level1.png",
    "music/theme.mp3",
    "sounds/jump.wav",
  ];
  
  progress.start(assets.length, "Loading game assets...");
  
  for (const asset of assets) {
    try {
      await withAssetLogging(dispatch, asset, async () => {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        return { loaded: true };
      });
      
      progress.step(`Loaded ${asset}`);
    } catch (error) {
      progress.error(`Failed to load ${asset}`, error as Error);
    }
  }
  
  progress.complete("All assets loaded successfully");
}

/**
 * Example 5: Performance Monitoring
 */
export async function examplePerformanceMonitoring(dispatch: Dispatch) {
  const monitor = createPerformanceMonitor(dispatch, 50); // 50ms threshold
  
  // Synchronous operation
  monitor.measure("Data processing", () => {
    // Simulate slow operation
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait
    }
  });
  
  // Asynchronous operation
  await monitor.measureAsync("API call", async () => {
    await new Promise(resolve => setTimeout(resolve, 150));
  });
}

/**
 * Example 6: Validation with Error Reporting
 */
export function exampleValidation(dispatch: Dispatch) {
  const validator = createValidationReporter(dispatch);
  
  const formData = {
    name: "",
    email: "invalid-email",
    age: -5,
  };
  
  if (!formData.name) {
    validator.addError("name", "Name is required");
  }
  
  if (!formData.email.includes("@")) {
    validator.addError("email", "Invalid email format");
  }
  
  if (formData.age < 0) {
    validator.addError("age", "Age must be positive");
  }
  
  if (validator.hasErrors()) {
    console.error("Validation failed:", validator.getErrors());
    return false;
  }
  
  return true;
}

/**
 * Example 7: Grouped Logging
 */
export function exampleGroupedLogging(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "game");
  
  logger.group("Initializing game systems", () => {
    logger.info("Loading graphics engine");
    logger.info("Initializing audio system");
    logger.info("Setting up input handlers");
    logger.success("All systems initialized");
  });
  
  logger.group("Loading game data", () => {
    logger.info("Loading level data");
    logger.info("Loading character data");
    logger.warn("Some optional data missing");
    logger.success("Core data loaded");
  });
}

/**
 * Example 8: Timed Operations
 */
export async function exampleTimedOperations(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "operations");
  
  await logger.time("Database query", async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { rows: 100 };
  });
  
  await logger.time("Image processing", async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { processed: true };
  });
}

/**
 * Example 9: Child Loggers
 */
export function exampleChildLoggers(dispatch: Dispatch) {
  const mainLogger = createTerminalLogger(dispatch, "app");
  const dbLogger = mainLogger.createChild("database");
  const apiLogger = mainLogger.createChild("api");
  
  mainLogger.info("Application starting");
  
  dbLogger.info("Connecting to database");
  dbLogger.success("Database connected");
  
  apiLogger.info("Starting API server");
  apiLogger.success("API server listening on port 3000");
  
  mainLogger.success("Application ready");
}

/**
 * Example 10: Error Categories
 */
export function exampleErrorCategories(dispatch: Dispatch) {
  const errorHandler = createErrorHandler(dispatch);
  
  // Compilation error
  errorHandler.handleCompilationError(
    "Syntax error in script",
    "game.js",
    10,
    5,
    "SYNTAX_ERROR"
  );
  
  // Runtime error
  errorHandler.handleRuntimeError(
    "Null reference exception",
    new Error("Cannot read property 'x' of null"),
    "player.js",
    42
  );
  
  // Script error
  errorHandler.handleScriptError(
    "Invalid event handler",
    "onPlayerMove",
    "Handler must return a boolean value"
  );
  
  // Asset error
  errorHandler.handleAssetError(
    "Failed to load texture",
    "assets/textures/wall.png",
    "File not found"
  );
  
  // Network error
  errorHandler.handleNetworkError(
    "Failed to fetch data",
    "https://api.example.com/data",
    404
  );
  
  // File system error
  errorHandler.handleFileSystemError(
    "Failed to write file",
    "/path/to/file.txt",
    "write"
  );
  
  // Plugin error
  errorHandler.handlePluginError(
    "Plugin initialization failed",
    "my-plugin",
    "Missing required configuration"
  );
  
  // Validation error
  errorHandler.handleValidationError(
    "Invalid input",
    "username",
    "Username must be at least 3 characters"
  );
}

/**
 * Example 11: Custom Error Listener
 */
export function exampleErrorListener(dispatch: Dispatch) {
  const errorHandler = createErrorHandler(dispatch);
  
  // Add a custom error listener
  const removeListener = errorHandler.addListener((error) => {
    console.log("Custom error handler:", error);
    
    // Send to analytics
    if (error.severity === ErrorSeverity.CRITICAL) {
      // sendToAnalytics(error);
    }
    
    // Show notification
    if (error.category === ErrorCategory.COMPILATION) {
      // showNotification(error.message);
    }
  });
  
  // Trigger some errors
  errorHandler.handleError(
    new Error("Test error"),
    ErrorCategory.RUNTIME,
    ErrorSeverity.HIGH
  );
  
  // Remove listener when done
  removeListener();
}

/**
 * Example 12: Complete Build Pipeline
 */
export async function exampleBuildPipeline(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "build-pipeline");
  const errorHandler = createErrorHandler(dispatch);
  const progress = createProgressReporter(dispatch, "build");
  
  try {
    progress.start(5, "Starting build pipeline...");
    
    // Step 1: Validate project
    progress.step("Validating project structure");
    await logger.time("Validation", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });
    
    // Step 2: Compile scripts
    progress.step("Compiling scripts");
    await withCompilationLogging(dispatch, "main.js", async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { compiled: true };
    });
    
    // Step 3: Process assets
    progress.step("Processing assets");
    const assets = ["sprite1.png", "sprite2.png", "background.png"];
    for (const asset of assets) {
      await withAssetLogging(dispatch, asset, async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { processed: true };
      });
    }
    
    // Step 4: Generate ROM
    progress.step("Generating ROM");
    await logger.time("ROM generation", async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
    });
    
    // Step 5: Finalize
    progress.step("Finalizing build");
    await new Promise(resolve => setTimeout(resolve, 500));
    
    progress.complete("Build completed successfully!");
    logger.success("ROM generated: game.gb");
    
  } catch (error) {
    progress.error("Build failed", error as Error);
    errorHandler.handleError(
      error as Error,
      ErrorCategory.COMPILATION,
      ErrorSeverity.CRITICAL
    );
  }
}

/**
 * Run all examples
 */
export async function runAllExamples(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "examples");
  
  logger.system("Running terminal system examples...");
  
  exampleBasicLogging(dispatch);
  await exampleBuildProcess(dispatch);
  await exampleCompilation(dispatch);
  await exampleAssetLoading(dispatch);
  await examplePerformanceMonitoring(dispatch);
  exampleValidation(dispatch);
  exampleGroupedLogging(dispatch);
  await exampleTimedOperations(dispatch);
  exampleChildLoggers(dispatch);
  exampleErrorCategories(dispatch);
  exampleErrorListener(dispatch);
  await exampleBuildPipeline(dispatch);
  
  logger.system("All examples completed!");
}
