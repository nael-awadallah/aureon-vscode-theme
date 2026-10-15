import type { Palette } from "./types";

// Aureon Light — warm paper with deepened accents so every color is readable as text.
export const light: Palette = {
  type: "light",

  bg: {
    base: "#FAF9F7",
    sidebar: "#F3F1ED",
    panel: "#F3F1ED",
    raised: "#FFFFFF",
    overlay: "#FFFFFF",
    inset: "#FFFFFF",
    lineHighlight: "#F2EFEA",
  },

  border: {
    subtle: "#EAE6E0",
    default: "#DED8CF",
    strong: "#CBC3B7",
  },

  text: {
    primary: "#34322F",
    secondary: "#625D56",
    muted: "#8C857B",
    faint: "#D9D3CA",
  },

  accent: {
    base: "#9E4A08",
    hover: "#86400A",
    deep: "#7A3906",
    on: "#FFFFFF",
    thread: "#9E4A08",
    threadOn: "#FFFFFF",
  },

  shadow: "#3A2A1424",

  syntax: {
    variable: "#34322F",
    function: "#9A5B13",
    type: "#1D4ED8",
    interface: "#2F6FB0",
    parameter: "#8A4B2A",
    property: "#3F5A6E",
    constant: "#B4421A",
    keyword: "#6D28D9",
    string: "#2F7D32",
    escape: "#0F766E",
    decorator: "#BE185D",
    tag: "#A8324A",
    attribute: "#8A5F00",
    operator: "#625D56",
    punctuation: "#7A746B",
    comment: "#7D766C",
    docTag: "#6B5FA8",
    invalid: "#C62828",
  },

  status: {
    error: "#C62828",
    warning: "#A15C07",
    info: "#1D4ED8",
    success: "#2F7D32",
  },

  git: {
    added: "#2F7D32",
    modified: "#A15C07",
    deleted: "#C62828",
    untracked: "#3B7F3F",
    ignored: "#948D83",
    conflict: "#A8324A",
    renamed: "#0F766E",
  },

  ansi: {
    black: "#34322F",
    red: "#C62828",
    green: "#2F7D32",
    yellow: "#A15C07",
    blue: "#1D4ED8",
    magenta: "#6D28D9",
    cyan: "#0F766E",
    white: "#5F5A53",
    brightBlack: "#8C857B",
    brightRed: "#B71C1C",
    brightGreen: "#2E7031",
    brightYellow: "#8A5300",
    brightBlue: "#1E40AF",
    brightMagenta: "#5B21B6",
    brightCyan: "#115E59",
    brightWhite: "#2D2B28",
  },

  brackets: ["#9E4A08", "#6D28D9", "#1D4ED8"],
};
