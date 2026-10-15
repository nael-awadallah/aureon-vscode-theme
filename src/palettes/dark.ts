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
    thread: "#E5B567",
    threadOn: "#1A140A",
  },

  shadow: "#00000066",

  // Syntax colors follow VS Code's Dark 2026 (measured from the rendered
  // editor), on Aureon's warm surfaces. Interfaces sit one step lighter than
  // types so the two stay distinct; operators and punctuation stay quiet.
  syntax: {
    variable: "#79C0FF",
    function: "#D2A8FF",
    type: "#4EC9B0",
    interface: "#72D6C2",
    parameter: "#FFA657",
    property: "#C9D1D9",
    constant: "#B5CEA8",
    keyword: "#FF7B72",
    string: "#A5D6FF",
    escape: "#7EE787",
    decorator: "#D2A8FF",
    tag: "#7EE787",
    attribute: "#79C0FF",
    operator: "#A39B8F",
    punctuation: "#8A8277",
    comment: "#8B949E",
    docTag: "#79C0FF",
    invalid: "#FFA198",
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
    ignored: "#655E55",
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
