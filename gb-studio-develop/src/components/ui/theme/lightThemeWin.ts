import { ThemeInterface } from "./ThemeInterface";
import lightTheme from "./lightTheme";

const lightThemeWin: ThemeInterface = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    toolbar: {
      ...lightTheme.colors.toolbar,
      background: "linear-gradient(to bottom, #f3f6fb 0%, #dfe6ef 100%)",
      inactiveBackground: "#edf2f8",
      border: "#aeb9c9",
      button: {
        ...lightTheme.colors.toolbar.button,
        border: "#9aa8bc",
      },
    },
    button: {
      ...lightTheme.colors.button,
      background: "linear-gradient(to bottom, #ffffff 0%, #e5ebf3 100%)",
      border: "#9dadc3",
    },
    menu: {
      ...lightTheme.colors.menu,
      boxShadow: "0 0 0 1px rgba(158, 173, 193, 0.8), 0 10px 20px rgba(47, 63, 84, 0.2)",
    },
  },
  borderRadius: 2,
};

export default lightThemeWin;
