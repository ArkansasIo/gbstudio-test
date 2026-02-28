import type { Dispatch } from "@reduxjs/toolkit";
import terminalActions from "store/features/terminal/terminalActions";

/**
 * Error categories for better organization
 */
export enum ErrorCategory {
  COMPILATION = "compilation",
  RUNTIME = "runtime",
  SCRIPT = "script",
  ASSET = "asset",
  NETWORK = "network",
  FILE_SYSTEM = "file_system",
  VALIDATION = "validation",
  PLUGIN = "plugin",
  UNKNOWN = "unknown",
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

/**
 * Structured error interface
 */
export interface StructuredError {
  message: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  code?: string;
  file?: string;
  line?: number;
  column?: number;
  stackTrace?: string;
  details?: string;
  timestamp?: number;
  context?: Record<string, any>;
}

/**
 * Error Handler - Centralized error handling for the RPG Workbench
 */
export class ErrorHandler {
  private dispatch: Dispatch;
  private errorListeners: Array<(error: StructuredError) => void> = [];
  
  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }
  
  /**
   * Handle a structured error
   */
  handle(error: StructuredError) {
    // Log to terminal
    this.dispatch(terminalActions.addMessage({
      type: "error",
      message: error.message,
      details: error.details,
      stackTrace: error.stackTrace,
      severity: error.severity,
      source: error.category,
      category: error.category,
      file: error.file,
      line: error.line,
      column: error.column,
      code: error.code,
    }));
    
    // Notify listeners
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (e) {
        console.error("Error in error listener:", e);
      }
    });
  }
  
  /**
   * Handle a JavaScript Error object
   */
  handleError(error: Error, category: ErrorCategory = ErrorCategory.UNKNOWN, severity: ErrorSeverity = ErrorSeverity.HIGH) {
    this.handle({
      message: error.message,
      category,
      severity,
      stackTrace: error.stack,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle compilation errors
   */
  handleCompilationError(message: string, file?: string, line?: number, column?: number, code?: string) {
    this.handle({
      message,
      category: ErrorCategory.COMPILATION,
      severity: ErrorSeverity.HIGH,
      file,
      line,
      column,
      code,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle runtime errors
   */
  handleRuntimeError(message: string, error?: Error, file?: string, line?: number) {
    this.handle({
      message,
      category: ErrorCategory.RUNTIME,
      severity: ErrorSeverity.CRITICAL,
      stackTrace: error?.stack,
      file,
      line,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle script errors
   */
  handleScriptError(message: string, scriptName?: string, details?: string) {
    this.handle({
      message,
      category: ErrorCategory.SCRIPT,
      severity: ErrorSeverity.HIGH,
      details,
      file: scriptName,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle asset errors
   */
  handleAssetError(message: string, assetPath?: string, details?: string) {
    this.handle({
      message,
      category: ErrorCategory.ASSET,
      severity: ErrorSeverity.MEDIUM,
      details,
      file: assetPath,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle validation errors
   */
  handleValidationError(message: string, field?: string, details?: string) {
    this.handle({
      message,
      category: ErrorCategory.VALIDATION,
      severity: ErrorSeverity.MEDIUM,
      details: details || `Validation failed for field: ${field}`,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle network errors
   */
  handleNetworkError(message: string, url?: string, statusCode?: number) {
    this.handle({
      message,
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.MEDIUM,
      details: `URL: ${url}, Status: ${statusCode}`,
      code: statusCode?.toString(),
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle file system errors
   */
  handleFileSystemError(message: string, path?: string, operation?: string) {
    this.handle({
      message,
      category: ErrorCategory.FILE_SYSTEM,
      severity: ErrorSeverity.HIGH,
      details: `Operation: ${operation}, Path: ${path}`,
      file: path,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Handle plugin errors
   */
  handlePluginError(message: string, pluginName?: string, details?: string) {
    this.handle({
      message,
      category: ErrorCategory.PLUGIN,
      severity: ErrorSeverity.MEDIUM,
      details: `Plugin: ${pluginName}\n${details || ""}`,
      timestamp: Date.now(),
    });
  }
  
  /**
   * Add an error listener
   */
  addListener(listener: (error: StructuredError) => void) {
    this.errorListeners.push(listener);
    return () => {
      const index = this.errorListeners.indexOf(listener);
      if (index > -1) {
        this.errorListeners.splice(index, 1);
      }
    };
  }
  
  /**
   * Create a global error handler
   */
  installGlobalHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.handleError(
        new Error(event.reason?.message || String(event.reason)),
        ErrorCategory.RUNTIME,
        ErrorSeverity.CRITICAL
      );
    });
    
    // Handle uncaught errors
    window.addEventListener("error", (event) => {
      this.handleRuntimeError(
        event.message,
        event.error,
        event.filename,
        event.lineno
      );
    });
  }
}

/**
 * Create an error handler instance
 */
export function createErrorHandler(dispatch: Dispatch): ErrorHandler {
  return new ErrorHandler(dispatch);
}
