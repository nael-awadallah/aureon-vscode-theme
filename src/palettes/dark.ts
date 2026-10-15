import type { Palette } from "./types";

// Aureon Dark — warm umber-black with the Aureon gold.
export const dark: Palette = {
  type: "dark",

  bg: {
    base: "#141311",
    sidebar: "#181715",
    panel: "#181715",
    raised: "#1E1C19",
    overlay: "#24211D",
    inset: "#1A1916",
    lineHighlight: "#1C1A17",
  },

  border: {
    subtle: "#211F1B",
    default: "#2B2824",
    strong: "#3A3631",
  },

  text: {
    primary: "#D9D2C7",
    secondary: "#A39B8F",
    muted: "#6B645A",
    faint: "#36322D",
  },

  accent: {
    base: "#E5B567",
    hover: "#F0C67F",
    deep: "#B8893F",
    on: "#1A140A",
  },

  syntax: {
    variable: "#D9D2C7",
    function: "#E5B567",
    type: "#8FAFC0",
    interface: "#A9C4D3",
    parameter: "#D6C3A5",
    property: "#BCC6CC",
    constant: "#D9986A",
    keyword: "#B6A0D1",
    string: "#A8BE91",
    escape: "#86C1B0",
    decorator: "#D9A08F",
    tag: "#D98C7E",
    attribute: "#DDBB80",
    operator: "#A39B8F",
    punctuation: "#8A8277",
    comment: "#7A7268",
    docTag: "#9A8FB0",
    invalid: "#E06C6C",
  },

  status: {
    error: "#E06C6C",
    warning: "#E0A050",
    info: "#8FAFC0",
    success: "#A8BE91",
  },

  git: {
    added: "#9DB77F",
    modified: "#D6A962",
    deleted: "#D9796E",
    untracked: "#A8BE91",
    ignored: "#5C564E",
    conflict: "#D98C7E",
    renamed: "#86C1B0",
  },

  ansi: {
    black: "#1E1C19",
    red: "#D9796E",
    green: "#A8BE91",
    yellow: "#E5B567",
    blue: "#8FAFC0",
    magenta: "#B6A0D1",
    cyan: "#86C1B0",
    white: "#D9D2C7",
    brightBlack: "#6B645A",
    brightRed: "#E8988E",
    brightGreen: "#BFD2AA",
    brightYellow: "#F0C67F",
    brightBlue: "#A9C4D3",
    brightMagenta: "#C9B6E0",
    brightCyan: "#A3D3C5",
    brightWhite: "#F2ECE2",
  },

  brackets: ["#E5B567", "#B6A0D1", "#8FAFC0"],
};
