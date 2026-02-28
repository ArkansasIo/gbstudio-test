import { actions } from "./terminalState";
import type { TerminalMessageType, TerminalSeverity } from "./terminalState";

// Helper action creators for common terminal operations
export const terminalActions = {
  ...actions,
  
  // Convenience methods for logging
  log: (message: string, details?: string) => 
    actions.addMessage({ 
      type: "info", 
      message, 
      details,
      source: "system" 
    }),
  
  success: (message: string, details?: string) => 
    actions.addMessage({ 
      type: "success", 
      message, 
      details,
      source: "system" 
    }),
  
  warn: (message: string, details?: string, severity: TerminalSeverity = "medium") => 
    actions.addMessage({ 
      type: "warning", 
      message, 
      details,
      severity,
      source: "system" 
    }),
  
  error: (message: string, details?: string, stackTrace?: string, severity: TerminalSeverity = "high") => 
    actions.addMessage({ 
      type: "error", 
      message, 
      details,
      stackTrace,
      severity,
      source: "system" 
    }),
  
  debug: (message: string, details?: string) => 
    actions.addMessage({ 
      type: "debug", 
      message, 
      details,
      source: "debugger" 
    }),
  
  system: (message: string, details?: string) => 
    actions.addMessage({ 
      type: "system", 
      message, 
      details,
      source: "system" 
    }),
  
  command: (message: string, output?: string) => 
    actions.addMessage({ 
      type: "command", 
      message, 
      details: output,
      source: "cli" 
    }),
  
  // Compiler/Build errors
  compileError: (message: string, file?: string, line?: number, column?: number, code?: string) => 
    actions.addMessage({
      type: "error",
      severity: "high",
      message,
      file,
      line,
      column,
      code,
      source: "compiler",
      category: "compilation"
    }),
  
  // Runtime errors
  runtimeError: (message: string, stackTrace?: string, file?: string, line?: number) => 
    actions.addMessage({
      type: "error",
      severity: "critical",
      message,
      stackTrace,
      file,
      line,
      source: "runtime",
      category: "runtime"
    }),
  
  // Script errors
  scriptError: (message: string, scriptName?: string, details?: string) => 
    actions.addMessage({
      type: "error",
      severity: "high",
      message,
      details,
      source: scriptName || "script",
      category: "script"
    }),
  
  // Asset errors
  assetError: (message: string, assetPath?: string, details?: string) => 
    actions.addMessage({
      type: "error",
      severity: "medium",
      message,
      details,
      file: assetPath,
      source: "assets",
      category: "assets"
    }),
  
  // Performance warnings
  performanceWarning: (message: string, details?: string) => 
    actions.addMessage({
      type: "warning",
      severity: "low",
      message,
      details,
      source: "performance",
      category: "performance"
    }),
  
  // Deprecation warnings
  deprecationWarning: (message: string, details?: string) => 
    actions.addMessage({
      type: "warning",
      severity: "low",
      message,
      details,
      source: "deprecation",
      category: "deprecation"
    }),
};

export default terminalActions;
