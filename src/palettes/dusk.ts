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

  syntax: {
    variable: "#D2D5DB",
    function: "#4FD1C5",
    type: "#7FB3D5",
    interface: "#9CC8E6",
    parameter: "#E0C7A3",
    property: "#AEBBD0",
    constant: "#E9A27C",
    keyword: "#A78BFA",
    string: "#9FD79F",
    escape: "#E6A6D0",
    decorator: "#E79AB0",
    tag: "#EE8F96",
    attribute: "#E5C38A",
    operator: "#9AA3B0",
    punctuation: "#7A8494",
    comment: "#6E7686",
    docTag: "#8E86C0",
    invalid: "#F0727A",
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
