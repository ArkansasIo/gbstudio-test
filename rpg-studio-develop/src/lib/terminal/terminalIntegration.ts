/**
 * Terminal Integration Utilities
 * 
 * Helper functions for integrating the terminal system with existing code
 */

import type { Dispatch } from "@reduxjs/toolkit";
import { createTerminalLogger } from "./terminalLogger";
import { createErrorHandler } from "./errorHandler";
import terminalActions from "store/features/terminal/terminalActions";

/**
 * Initialize the terminal system
 */
export function initializeTerminal(dispatch: Dispatch) {
  const logger = createTerminalLogger(dispatch, "system");
  const errorHandler = createErrorHandler(dispatch);
  
  // Install global error handlers
  errorHandler.installGlobalHandlers();
  
  // Log initialization
  logger.system("Terminal system initialized");
  
  return {
    logger,
    errorHandler,
  };
}

/**
 * Wrap a build process with terminal logging
 */
export async function withBuildLogging<T>(
  dispatch: Dispatch,
  buildName: string,
  buildFn: () => Promise<T>
): Promise<T> {
  const logger = createTerminalLogger(dispatch, "build");
  
  logger.system(`Starting build: ${buildName}`);
  dispatch(terminalActions.clearMessages());
  
  const startTime = performance.now();
  
  try {
    const result = await buildFn();
    const duration = performance.now() - startTime;
    
    logger.success(`Build completed: ${buildName}`, `Duration: ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    
    logger.error(
      `Build failed: ${buildName}`,
      error as Error,
      "critical"
    );
    logger.debug(`Duration before failure: ${duration.toFixed(2)}ms`);
    
    throw error;
  }
}

/**
 * Wrap a compilation process with terminal logging
 */
export async function withCompilationLogging<T>(
  dispatch: Dispatch,
  fileName: string,
  compileFn: () => Promise<T>
): Promise<T> {
  const logger = createTerminalLogger(dispatch, "compiler");
  
  logger.info(`Compiling: ${fileName}`);
  
  try {
    const result = await compileFn();
    logger.success(`Compiled successfully: ${fileName}`);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      logger.compileError(
        error.message,
        fileName,
        undefined,
        undefined,
        "COMPILE_ERROR"
      );
    }
    throw error;
  }
}

/**
 * Wrap an asset loading process with terminal logging
 */
export async function withAssetLogging<T>(
  dispatch: Dispatch,
  assetPath: string,
  loadFn: () => Promise<T>
): Promise<T> {
  const logger = createTerminalLogger(dispatch, "assets");
  
  logger.debug(`Loading asset: ${assetPath}`);
  
  try {
    const result = await loadFn();
    logger.debug(`Asset loaded: ${assetPath}`);
    return result;
  } catch (error) {
    logger.assetError(
      `Failed to load asset: ${assetPath}`,
      assetPath,
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}

/**
 * Create a progress reporter for long-running operations
 */
export function createProgressReporter(dispatch: Dispatch, context: string) {
  const logger = createTerminalLogger(dispatch, context);
  let currentStep = 0;
  let totalSteps = 0;
  
  return {
    start(total: number, message?: string) {
      totalSteps = total;
      currentStep = 0;
      logger.info(message || `Starting ${context}...`);
    },
    
    step(message: string) {
      currentStep++;
      const percentage = Math.round((currentStep / totalSteps) * 100);
      logger.info(`[${percentage}%] ${message}`);
    },
    
    complete(message?: string) {
      logger.success(message || `${context} completed`);
    },
    
    error(message: string, error?: Error) {
      logger.error(message, error);
    },
  };
}

/**
 * Wrap console methods to redirect to terminal
 */
export function redirectConsoleToTerminal(dispatch: Dispatch) {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
    info: console.info,
  };
  
  console.log = (...args: any[]) => {
    originalConsole.log(...args);
    dispatch(terminalActions.log(args.map(String).join(" ")));
  };
  
  console.info = (...args: any[]) => {
    originalConsole.info(...args);
    dispatch(terminalActions.log(args.map(String).join(" ")));
  };
  
  console.warn = (...args: any[]) => {
    originalConsole.warn(...args);
    dispatch(terminalActions.warn(args.map(String).join(" ")));
  };
  
  console.error = (...args: any[]) => {
    originalConsole.error(...args);
    dispatch(terminalActions.error(args.map(String).join(" ")));
  };
  
  console.debug = (...args: any[]) => {
    originalConsole.debug(...args);
    dispatch(terminalActions.debug(args.map(String).join(" ")));
  };
  
  return () => {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
  };
}

/**
 * Monitor performance and log warnings
 */
export function createPerformanceMonitor(dispatch: Dispatch, threshold: number = 100) {
  const logger = createTerminalLogger(dispatch, "performance");
  
  return {
    measure<T>(label: string, fn: () => T): T {
      const start = performance.now();
      const result = fn();
      const duration = performance.now() - start;
      
      if (duration > threshold) {
        logger.performanceWarning(
          `Slow operation: ${label}`,
          `Duration: ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
        );
      }
      
      return result;
    },
    
    async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
      const start = performance.now();
      const result = await fn();
      const duration = performance.now() - start;
      
      if (duration > threshold) {
        logger.performanceWarning(
          `Slow async operation: ${label}`,
          `Duration: ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`
        );
      }
      
      return result;
    },
  };
}

/**
 * Create a validation reporter
 */
export function createValidationReporter(dispatch: Dispatch) {
  const errorHandler = createErrorHandler(dispatch);
  const errors: string[] = [];
  
  return {
    addError(field: string, message: string) {
      errors.push(`${field}: ${message}`);
      errorHandler.handleValidationError(message, field);
    },
    
    hasErrors(): boolean {
      return errors.length > 0;
    },
    
    getErrors(): string[] {
      return [...errors];
    },
    
    clear() {
      errors.length = 0;
    },
  };
}
