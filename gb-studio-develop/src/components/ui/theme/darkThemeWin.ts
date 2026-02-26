import { ThemeInterface } from "./ThemeInterface";
import darkTheme from "./darkTheme";

const darkThemeWin: ThemeInterface = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    text: "#e0e5ec",
    toolbar: {
      ...darkTheme.colors.toolbar,
      background: "linear-gradient(to bottom, #2a3038 0%, #1f252d 100%)",
      inactiveBackground: "#242a33",
      border: "#141920",
      button: {
        ...darkTheme.colors.toolbar.button,
        border: "#434d5b",
      },
    },
    button: {
      ...darkTheme.colors.button,
      background: "linear-gradient(to bottom, #647080 0%, #495463 100%)",
      border: "#4a5667",
    },
    menu: {
      ...darkTheme.colors.menu,
      background: "#1f252d",
      hoverBackground: "#2f3945",
      boxShadow: "0 0 0 1px rgba(76, 89, 106, 0.7), 0 12px 22px rgba(0, 0, 0, 0.5)",
    },
  },
  borderRadius: 2,
};

export default darkThemeWin;
