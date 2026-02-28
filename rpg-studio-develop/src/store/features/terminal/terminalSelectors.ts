import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "store/configureStore";
import type { TerminalMessage } from "./terminalState";

export const selectTerminalState = (state: RootState) => state.terminal;

export const selectTerminalMessages = (state: RootState) => state.terminal.messages;

export const selectTerminalFilter = (state: RootState) => state.terminal.filter;

export const selectTerminalStats = (state: RootState) => state.terminal.stats;

export const selectIsTerminalOpen = (state: RootState) => state.terminal.isOpen;

export const selectIsTerminalPaused = (state: RootState) => state.terminal.isPaused;

export const selectCommandHistory = (state: RootState) => state.terminal.commandHistory;

export const selectCurrentCommand = (state: RootState) => {
  const { commandHistory, currentCommandIndex } = state.terminal;
  if (currentCommandIndex >= 0 && currentCommandIndex < commandHistory.length) {
    return commandHistory[currentCommandIndex];
  }
  return "";
};

// Filtered messages based on current filter settings
export const selectFilteredMessages = createSelector(
  [selectTerminalMessages, selectTerminalFilter],
  (messages, filter) => {
    return messages.filter((message: TerminalMessage) => {
      // Filter by type
      if (!filter.types.includes(message.type)) {
        return false;
      }
      
      // Filter by severity
      if (message.severity && !filter.severities.includes(message.severity)) {
        return false;
      }
      
      // Filter by source
      if (filter.sources.length > 0 && message.source && !filter.sources.includes(message.source)) {
        return false;
      }
      
      // Filter by search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        const matchesMessage = message.message.toLowerCase().includes(query);
        const matchesDetails = message.details?.toLowerCase().includes(query);
        const matchesFile = message.file?.toLowerCase().includes(query);
        const matchesSource = message.source?.toLowerCase().includes(query);
        
        if (!matchesMessage && !matchesDetails && !matchesFile && !matchesSource) {
          return false;
        }
      }
      
      return true;
    });
  }
);

// Get messages by type
export const selectErrorMessages = createSelector(
  [selectTerminalMessages],
  (messages) => messages.filter((m: TerminalMessage) => m.type === "error")
);

export const selectWarningMessages = createSelector(
  [selectTerminalMessages],
  (messages) => messages.filter((m: TerminalMessage) => m.type === "warning")
);

export const selectDebugMessages = createSelector(
  [selectTerminalMessages],
  (messages) => messages.filter((m: TerminalMessage) => m.type === "debug")
);

// Get messages by severity
export const selectCriticalMessages = createSelector(
  [selectTerminalMessages],
  (messages) => messages.filter((m: TerminalMessage) => m.severity === "critical")
);

export const selectHighSeverityMessages = createSelector(
  [selectTerminalMessages],
  (messages) => messages.filter((m: TerminalMessage) => m.severity === "high")
);

// Get messages by category
export const selectMessagesByCategory = createSelector(
  [selectTerminalMessages, (_state: RootState, category: string) => category],
  (messages, category) => messages.filter((m: TerminalMessage) => m.category === category)
);

// Get messages by source
export const selectMessagesBySource = createSelector(
  [selectTerminalMessages, (_state: RootState, source: string) => source],
  (messages, source) => messages.filter((m: TerminalMessage) => m.source === source)
);

// Get unique sources
export const selectUniqueSources = createSelector(
  [selectTerminalMessages],
  (messages) => {
    const sources = new Set<string>();
    messages.forEach((m: TerminalMessage) => {
      if (m.source) {
        sources.add(m.source);
      }
    });
    return Array.from(sources).sort();
  }
);

// Get unique categories
export const selectUniqueCategories = createSelector(
  [selectTerminalMessages],
  (messages) => {
    const categories = new Set<string>();
    messages.forEach((m: TerminalMessage) => {
      if (m.category) {
        categories.add(m.category);
      }
    });
    return Array.from(categories).sort();
  }
);

// Get recent messages (last N)
export const selectRecentMessages = createSelector(
  [selectTerminalMessages, (_state: RootState, count: number) => count],
  (messages, count) => messages.slice(-count)
);

// Check if there are any critical issues
export const selectHasCriticalIssues = createSelector(
  [selectTerminalMessages],
  (messages) => messages.some((m: TerminalMessage) => m.severity === "critical")
);

// Check if there are any errors
export const selectHasErrors = createSelector(
  [selectTerminalStats],
  (stats) => stats.errorCount > 0
);

// Check if there are any warnings
export const selectHasWarnings = createSelector(
  [selectTerminalStats],
  (stats) => stats.warningCount > 0
);
