/**
 * Terminal System - Main Export
 * 
 * Centralized exports for the terminal system
 */

// State and actions
export { default as terminalReducer } from "store/features/terminal/terminalState";
export { actions as terminalStateActions } from "store/features/terminal/terminalState";
export { default as terminalActions } from "store/features/terminal/terminalActions";

// Selectors
export * from "store/features/terminal/terminalSelectors";

// Types
export type {
  TerminalMessage,
  TerminalMessageType,
  TerminalSeverity,
  TerminalFilter,
  TerminalStats,
  TerminalState,
} from "store/features/terminal/terminalState";

// Logger
export {
  TerminalLogger,
  createTerminalLogger,
  interceptConsole,
} from "./terminalLogger";

// Error Handler
export {
  ErrorHandler,
  createErrorHandler,
  ErrorCategory,
  ErrorSeverity,
} from "./errorHandler";

export type { StructuredError } from "./errorHandler";

// Components
export { Terminal } from "components/terminal/Terminal";
export { TerminalMessage as TerminalMessageComponent } from "components/terminal/TerminalMessage";
export { TerminalToolbar } from "components/terminal/TerminalToolbar";
export { TerminalInput } from "components/terminal/TerminalInput";

// Theme
export { darkTerminalTheme, lightTerminalTheme } from "components/ui/theme/terminalTheme";
export type { TerminalTheme } from "components/ui/theme/terminalTheme";
