// Every variant fills in the same semantic roles. Mapping code (src/ui, src/syntax)
// only ever reads these roles — never raw hex values.

export interface Palette {
  type: "dark" | "light";

  bg: {
    base: string; // editor
    sidebar: string; // side bar, activity bar, tab strip, status bar
    panel: string; // bottom panel, terminal
    raised: string; // hovers, suggest widget, notifications
    overlay: string; // menus, quick pick
    inset: string; // inputs, dropdowns
    lineHighlight: string;
  };

  border: {
    subtle: string;
    default: string;
    strong: string;
  };

  text: {
    primary: string;
    secondary: string;
    muted: string; // line numbers, placeholders
    faint: string; // whitespace, inactive indent guides
  };

  accent: {
    base: string; // the Aureon gold
    hover: string;
    deep: string;
    on: string; // text on an accent fill
    thread: string; // the gold family thread: cursor, active line number, badges, active tab
    threadOn: string; // text on a thread fill
  };

  /** Drop shadow for widgets and sticky scroll. */
  shadow: string;

  // Semantic role map: color means "what kind of symbol is this".
  // Ordinary variables stay neutral; related roles share a hue family.
  syntax: {
    variable: string; // locals — neutral foreground
    function: string; // functions and methods, declarations and calls
    type: string; // classes, types, enums, namespaces
    interface: string; // interfaces, type parameters
    parameter: string;
    property: string;
    constant: string; // numbers, booleans, enum members, module constants
    keyword: string; // declarations and modifiers; also this / self
    control: string; // control flow: if, for, return, await, import / export
    string: string;
    escape: string; // string escapes, regexp
    decorator: string;
    tag: string;
    attribute: string;
    operator: string;
    punctuation: string;
    comment: string;
    docTag: string;
    invalid: string;
  };

  status: {
    error: string;
    warning: string;
    info: string;
    success: string;
  };

  git: {
    added: string;
    modified: string;
    deleted: string;
    untracked: string;
    ignored: string;
    conflict: string;
    renamed: string;
  };

  ansi: {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightMagenta: string;
    brightCyan: string;
    brightWhite: string;
  };

  /** Bracket pair colors, outermost first. */
  brackets: [string, string, string];
}

export interface VariantOptions {
  /** Solid accent status bar instead of the quiet default. */
  vivid: boolean;
  /** Comments, keywords and parameters in italic. */
  italics: boolean;
}

export interface Variant {
  id: string; // file name: themes/<id>.json
  label: string; // name in the theme picker
  palette: Palette;
  options: VariantOptions;
}
