import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TerminalMessageType = 
  | "info" 
  | "success" 
  | "warning" 
  | "error" 
  | "debug" 
  | "system"
  | "command"
  | "output";

export type TerminalSeverity = "low" | "medium" | "high" | "critical";

export interface TerminalMessage {
  id: string;
  type: TerminalMessageType;
  severity?: TerminalSeverity;
  timestamp: number;
  message: string;
  details?: string;
  stackTrace?: string;
  source?: string;
  line?: number;
  column?: number;
  file?: string;
  category?: string;
  code?: string;
  tags?: string[];
}

export interface TerminalFilter {
  types: TerminalMessageType[];
  severities: TerminalSeverity[];
  sources: string[];
  searchQuery: string;
  showTimestamps: boolean;
  autoScroll: boolean;
}

export interface TerminalStats {
  totalMessages: number;
  errorCount: number;
  warningCount: number;
  debugCount: number;
  infoCount: number;
}

export interface TerminalState {
  messages: TerminalMessage[];
  filter: TerminalFilter;
  stats: TerminalStats;
  isOpen: boolean;
  isPaused: boolean;
  maxMessages: number;
  commandHistory: string[];
  currentCommandIndex: number;
}

export const initialState: TerminalState = {
  messages: [],
  filter: {
    types: ["info", "success", "warning", "error", "debug", "system", "command", "output"],
    severities: ["low", "medium", "high", "critical"],
    sources: [],
    searchQuery: "",
    showTimestamps: true,
    autoScroll: true,
  },
  stats: {
    totalMessages: 0,
    errorCount: 0,
    warningCount: 0,
    debugCount: 0,
    infoCount: 0,
  },
  isOpen: false,
  isPaused: false,
  maxMessages: 1000,
  commandHistory: [],
  currentCommandIndex: -1,
};

const terminalSlice = createSlice({
  name: "terminal",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<TerminalMessage, "id" | "timestamp">>) => {
      if (!state.isPaused) {
        const message: TerminalMessage = {
          ...action.payload,
          id: `${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
        };
        
        state.messages.push(message);
        state.stats.totalMessages++;
        
        // Update stats
        switch (message.type) {
          case "error":
            state.stats.errorCount++;
            break;
          case "warning":
            state.stats.warningCount++;
            break;
          case "debug":
            state.stats.debugCount++;
            break;
          case "info":
          case "success":
            state.stats.infoCount++;
            break;
        }
        
        // Trim messages if exceeding max
        if (state.messages.length > state.maxMessages) {
          const removed = state.messages.shift();
          if (removed) {
            switch (removed.type) {
              case "error":
                state.stats.errorCount--;
                break;
              case "warning":
                state.stats.warningCount--;
                break;
              case "debug":
                state.stats.debugCount--;
                break;
              case "info":
              case "success":
                state.stats.infoCount--;
                break;
            }
          }
        }
      }
    },
    
    clearMessages: (state) => {
      state.messages = [];
      state.stats = {
        totalMessages: 0,
        errorCount: 0,
        warningCount: 0,
        debugCount: 0,
        infoCount: 0,
      };
    },
    
    setFilter: (state, action: PayloadAction<Partial<TerminalFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    
    toggleTerminal: (state) => {
      state.isOpen = !state.isOpen;
    },
    
    setTerminalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    
    setMaxMessages: (state, action: PayloadAction<number>) => {
      state.maxMessages = action.payload;
    },
    
    addCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload);
      state.currentCommandIndex = state.commandHistory.length;
    },
    
    navigateCommandHistory: (state, action: PayloadAction<"up" | "down">) => {
      if (action.payload === "up" && state.currentCommandIndex > 0) {
        state.currentCommandIndex--;
      } else if (action.payload === "down" && state.currentCommandIndex < state.commandHistory.length) {
        state.currentCommandIndex++;
      }
    },
    
    removeMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex(m => m.id === action.payload);
      if (index !== -1) {
        const removed = state.messages[index];
        state.messages.splice(index, 1);
        
        switch (removed.type) {
          case "error":
            state.stats.errorCount--;
            break;
          case "warning":
            state.stats.warningCount--;
            break;
          case "debug":
            state.stats.debugCount--;
            break;
          case "info":
          case "success":
            state.stats.infoCount--;
            break;
        }
        state.stats.totalMessages--;
      }
    },
  },
});

export const { actions } = terminalSlice;

export default terminalSlice.reducer;
