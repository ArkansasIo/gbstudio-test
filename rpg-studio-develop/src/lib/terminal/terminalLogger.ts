import type { Dispatch } from "@reduxjs/toolkit";
import terminalActions from "store/features/terminal/terminalActions";

/**
 * Terminal Logger - Centralized logging system for the RPG Workbench
 * 
 * This logger provides a unified interface for logging messages, errors,
 * warnings, and debug information to the terminal system.
 */
export class TerminalLogger {
  private dispatch: Dispatch;
  private context: string;
  
  constructor(dispatch: Dispatch, context: string = "system") {
    this.dispatch = dispatch;
    this.context = context;
  }
  
  /**
   * Log an informational message
   */
  info(message: string, details?: string) {
    this.dispatch(terminalActions.addMessage({
      type: "info",
      message,
      details,
      source: this.context,
    }));
  }
  
  /**
   * Log a success message
   */
  success(message: string, details?: string) {
    this.dispatch(terminalActions.addMessage({
      type: "success",
      message,
      details,
      source: this.context,
    }));
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, details?: string, severity: "low" | "medium" | "high" = "medium") {
    this.dispatch(terminalActions.addMessage({
      type: "warning",
      message,
      details,
      severity,
      source: this.context,
    }));
  }
  
  /**
   * Log an error message
   */
  error(message: string, error?: Error | string, severity: "medium" | "high" | "critical" = "high") {
    const details = typeof error === "string" ? error : error?.message;
    const stackTrace = error instanceof Error ? error.stack : undefined;
    
    this.dispatch(terminalActions.addMessage({
      type: "error",
      message,
      details,
      stackTrace,
      severity,
      source: this.context,
    }));
  }
  
  /**
   * Log a debug message
   */
  debug(message: string, data?: any) {
    const details = data ? JSON.stringify(data, null, 2) : undefined;
    
    this.dispatch(terminalActions.addMessage({
      type: "debug",
      message,
      details,
      source: this.context,
    }));
  }
  
  /**
   * Log a system message
   */
  system(message: string, details?: string) {
    this.dispatch(terminalActions.addMessage({
      type: "system",
      message,
      details,
      source: this.context,
    }));
  }
  
  /**
   * Log a compilation error
   */
  compileError(message: string, file?: string, line?: number, column?: number, code?: string) {
    this.dispatch(terminalActions.compileError(message, file, line, column, code));
  }
  
  /**
   * Log a runtime error
   */
  runtimeError(message: string, error?: Error, file?: string, line?: number) {
    this.dispatch(terminalActions.runtimeError(
      message,
      error?.stack,
      file,
      line
    ));
  }
  
  /**
   * Log a script error
   */
  scriptError(message: string, scriptName?: string, details?: string) {
    this.dispatch(terminalActions.scriptError(message, scriptName, details));
  }
  
  /**
   * Log an asset error
   */
  assetError(message: string, assetPath?: string, details?: string) {
    this.dispatch(terminalActions.assetError(message, assetPath, details));
  }
  
  /**
   * Log a performance warning
   */
  performanceWarning(message: string, details?: string) {
    this.dispatch(terminalActions.performanceWarning(message, details));
  }
  
  /**
   * Log a deprecation warning
   */
  deprecationWarning(message: string, details?: string) {
    this.dispatch(terminalActions.deprecationWarning(message, details));
  }
  
  /**
   * Create a child logger with a different context
   */
  createChild(childContext: string): TerminalLogger {
    return new TerminalLogger(this.dispatch, `${this.context}:${childContext}`);
  }
  
  /**
   * Group related log messages
   */
  group(title: string, callback: () => void) {
    this.info(`▼ ${title}`);
    try {
      callback();
    } finally {
      this.info(`▲ End ${title}`);
    }
  }
  
  /**
   * Time an operation
   */
  async time<T>(label: string, operation: () => Promise<T>): Promise<T> {
    const start = performance.now();
    this.debug(`⏱️ Starting: ${label}`);
    
    try {
      const result = await operation();
      const duration = performance.now() - start;
      this.debug(`✓ Completed: ${label}`, { duration: `${duration.toFixed(2)}ms` });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`✗ Failed: ${label}`, error as Error);
      this.debug(`Duration before failure: ${duration.toFixed(2)}ms`);
      throw error;
    }
  }
}

/**
 * Create a terminal logger instance
 */
export function createTerminalLogger(dispatch: Dispatch, context: string = "system"): TerminalLogger {
  return new TerminalLogger(dispatch, context);
}

/**
 * Console interceptor - Redirects console.log, console.warn, console.error to terminal
 */
export function interceptConsole(dispatch: Dispatch) {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  };
  
  console.log = (...args: any[]) => {
    originalConsole.log(...args);
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
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
  };
}
