import type { Palette } from "./types";

// Aureon Dusk — blue-black with teal and violet. Gold stays as the family thread.
export const dusk: Palette = {
  type: "dark",

  bg: {
    base: "#0F1117",
    sidebar: "#12161D",
    panel: "#12161D",
    raised: "#1A1F26",
    overlay: "#20262F",
    inset: "#151A21",
    lineHighlight: "#161B22",
  },

  border: {
    subtle: "#1A2029",
    default: "#252C36",
    strong: "#343D49",
  },

  text: {
    primary: "#D2D5DB",
    secondary: "#9AA3B0",
    muted: "#616B7B",
    faint: "#2A313C",
  },

  accent: {
    base: "#4FD1C5",
    hover: "#6EDDD3",
    deep: "#2FA89D",
    on: "#0B1A19",
    thread: "#E5B567",
    threadOn: "#1A140A",
  },

  shadow: "#00000080",

  // Same role structure as Aureon Dark (from Dark 2026), tuned to Dusk:
  // periwinkle variables, violet functions, Dusk teal types, rose keywords.
  syntax: {
    variable: "#82AAFF",
    function: "#C4A7FF",
    type: "#4FD1C5",
    interface: "#86E1D7",
    parameter: "#F7A86E",
    property: "#C3CAD6",
    constant: "#B4D9A0",
    keyword: "#F7768E",
    control: "#E58FD4",
    string: "#A3CFF7",
    escape: "#9FD79F",
    decorator: "#C4A7FF",
    tag: "#9FD79F",
    attribute: "#82AAFF",
    operator: "#9AA3B0",
    punctuation: "#7A8494",
    comment: "#737D8F",
    docTag: "#82AAFF",
    invalid: "#F59AA0",
  },

  status: {
    error: "#F0727A",
    warning: "#F2B866",
    info: "#7FB3D5",
    success: "#9FD79F",
  },

  git: {
    added: "#8CCB8C",
    modified: "#E2B86C",
    deleted: "#F0727A",
    untracked: "#9FD79F",
    ignored: "#626C7C",
    conflict: "#EE8F96",
    renamed: "#4FD1C5",
  },

  ansi: {
    black: "#1A1F26",
    red: "#F0727A",
    green: "#9FD79F",
    yellow: "#E5B567",
    blue: "#7FB3D5",
    magenta: "#A78BFA",
    cyan: "#4FD1C5",
    white: "#D2D5DB",
    brightBlack: "#616B7B",
    brightRed: "#F59AA0",
    brightGreen: "#B8E4B8",
    brightYellow: "#F0C67F",
    brightBlue: "#A3C9E3",
    brightMagenta: "#C4B0FC",
    brightCyan: "#7FE0D6",
    brightWhite: "#F3F5F8",
  },

  brackets: ["#E5B567", "#A78BFA", "#7FB3D5"],
};
