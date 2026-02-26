import { ThemeInterface } from "./ThemeInterface";

const darkTheme: ThemeInterface = {
  name: "Dark",
  type: "dark",
  typography: {
    fontSize: "11px",
    menuFontSize: "12px",
    toolbarFontSize: "13px",
  },
  colors: {
    highlight: "#f39b2f",
    highlightText: "#ffffff",
    text: "#d2d8e0",
    background: "#161a1f",
    secondaryText: "#8994a3",
    token: {
      variable: "#9ccc65",
      character: "#90caf9",
      operator: "#90caf9",
      code: "#ffffff",
      function: "#ffffff",
      constant: "#90caf9",
    },
    toolbar: {
      background: "linear-gradient(to bottom, #2a3038 0%, #1e242c 100%)",
      border: "#101318",
      inactiveBackground: "#232932",
      inactiveBorder: "#101318",
      textShadow: "none",
      button: {
        border: "#3b4350",
      },
    },
    button: {
      background:
        "linear-gradient(to bottom, #5f6977 0%, #4a5360 6%, #3e4652 100%) no-repeat",
      border: "#49515e",
      activeBackground: "#39414d",
      text: "#e8edf4",
      nestedBackground: "#2a313a",
      nestedActiveBackground: "#353e49",
    },
    menu: {
      background: "#1f252d",
      hoverBackground: "#2e3742",
      activeBackground: "#394553",
      divider: "#3e4754",
      boxShadow:
        "0 0 0 1px rgba(73, 84, 99, 0.65), 0 14px 24px rgba(0, 0, 0, 0.45)",
    },
    input: {
      background: "#131820",
      hoverBackground: "#1a2029",
      activeBackground: "#0f141b",
      text: "#dbe2ea",
      border: "#3d4655",
    },
    brackets: {
      color: "#131820",
      hoverBackground: "#252d37",
    },
    card: {
      background: "#20262e",
      text: "#d2d8e0",
      border: "#3e4754",
      divider: "#333d4b",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4)",
    },
    sidebar: {
      background: "#171d24",
      border: "#2f3742",
      well: {
        background: "#11161d",
        boxShadow: "-1px 0px 12px 1px rgba(0, 0, 0, 0.6) inset",
        hoverBackground: "#2f3946",
      },
      header: {
        background: "#252d37",
        activeBackground: "#303946",
        border: "#3e4855",
        text: "#d6dde7",
      },
    },
    panel: {
      background: "#171d24",
      border: "#2f3742",
      divider: "#323b48",
      text: "#ccd4de",
      icon: "#aeb9c8",
      selectedIcon: "#ffffff",
      selectedBackground: "#2c3744",
      activeBackground: "#364252",
      hoverBackground: "#283240",
    },
    document: {
      background: "#141a20",
    },
    list: {
      text: "#d1d8e2",
      icon: "#7f8a98",
      selectedBackground: "#2a3440",
      activeBackground: "#33414f",
    },
    tabs: {
      background: "linear-gradient(0deg, #202731 0%, #191f27 100%)",
      selectedBackground: "#2a3340",
      secondaryBackground: "#171d24",
      border: "#3b4552",
    },
    scripting: {
      tabs: {
        background: "#1b222a",
      },
      header: {
        text: "#ffffff",
        background: "linear-gradient(0deg, #3b4552, #465161)",
        nest1Background: "linear-gradient(0deg, #3f5567, #4e667b)",
        nest2Background: "linear-gradient(0deg, #36455f, #435676)",
        nest3Background: "linear-gradient(0deg, #3d5f48, #507a5f)",
        nest4Background: "linear-gradient(0deg, #4f406a, #624e82)",
        commentBackground: "linear-gradient(0deg, #5e7840, #6f9250)",
        disabledBackground: "linear-gradient(0deg, #6b3f3f, #7f4a4a)",
      },
      branch: {
        nest1Background: "#31404e",
        nest2Background: "#2f3f57",
        nest3Background: "#33503b",
        nest4Background: "#46375e",
      },
      form: {
        background: "#1f262e",
      },
      children: {
        nest1Border: "#7094ad",
        nest1Text: "#9fbad0",
        nest2Border: "#5a89d8",
        nest2Text: "#89b1f0",
        nest3Border: "#68af73",
        nest3Text: "#99d0a0",
        nest4Border: "#997acb",
        nest4Text: "#c0a7e8",
      },
      placeholder: {
        background: "#10151b",
      },
    },
    tracker: {
      background: "#1a2028",
      activeBackground: "#27303c",
      border: "#323b48",
      text: "#d2d8e0",
      note: "#008894",
      instrument: "#738bd7",
      effectCode: "#f45d22",
      effectParam: "#ffad1f",
      rollCell: {
        border: "#d2d8e044",
      },
    },
    prefab: {
      background: "#a76521",
      text: "#ffffff",
      button: {
        background: "#c4792d",
        hoverBackground: "#d88938",
        text: "#ffffff",
      },
    },
  },
  borderRadius: 2,
};

export default darkTheme;
