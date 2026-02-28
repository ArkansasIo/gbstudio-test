/**
 * Terminal Theme Configuration
 * 
 * Defines color schemes and styling for the terminal system
 */

export interface TerminalTheme {
  background: string;
  text: string;
  muted: string;
  border: string;
  hoverBackground: string;
  scrollbarTrack: string;
  scrollbarThumb: string;
  
  // Message types
  error: string;
  warning: string;
  success: string;
  debug: string;
  system: string;
  command: string;
  info: string;
  
  // UI elements
  toolbarBackground: string;
  buttonBackground: string;
  buttonHover: string;
  buttonActive: string;
  inputBackground: string;
  prompt: string;
  link: string;
  linkHover: string;
  
  // Stack traces
  stackBackground: string;
  stackText: string;
}

export const darkTerminalTheme: TerminalTheme = {
  background: "#1e1e1e",
  text: "#d4d4d4",
  muted: "#808080",
  border: "#3e3e3e",
  hoverBackground: "#2a2a2a",
  scrollbarTrack: "#1e1e1e",
  scrollbarThumb: "#424242",
  
  error: "#f48771",
  warning: "#dcdcaa",
  success: "#4ec9b0",
  debug: "#569cd6",
  system: "#c586c0",
  command: "#9cdcfe",
  info: "#d4d4d4",
  
  toolbarBackground: "#252526",
  buttonBackground: "#3e3e3e",
  buttonHover: "#505050",
  buttonActive: "#007acc",
  inputBackground: "#3c3c3c",
  prompt: "#4ec9b0",
  link: "#3794ff",
  linkHover: "#4daaff",
  
  stackBackground: "#252526",
  stackText: "#ce9178",
};

export const lightTerminalTheme: TerminalTheme = {
  background: "#ffffff",
  text: "#000000",
  muted: "#6a6a6a",
  border: "#e5e5e5",
  hoverBackground: "#f3f3f3",
  scrollbarTrack: "#f5f5f5",
  scrollbarThumb: "#c1c1c1",
  
  error: "#cd3131",
  warning: "#bf8803",
  success: "#14ce14",
  debug: "#0451a5",
  system: "#af00db",
  command: "#001080",
  info: "#000000",
  
  toolbarBackground: "#f3f3f3",
  buttonBackground: "#e5e5e5",
  buttonHover: "#d6d6d6",
  buttonActive: "#007acc",
  inputBackground: "#ffffff",
  prompt: "#14ce14",
  link: "#0066bf",
  linkHover: "#0080ff",
  
  stackBackground: "#f8f8f8",
  stackText: "#a31515",
};
