import type { Palette, VariantOptions } from "../palettes/types";

type Style = string | { foreground?: string; italic?: boolean; bold?: boolean };

// Semantic tokens come from language servers (built into VS Code for TS/JS/TSX/JSX;
// Intelephense for PHP and Pylance for Python add their own). They override TextMate.
//
// `*.defaultLibrary` keeps its role's color: built-in or not never changes the meaning.
export function semantic(p: Palette, o: VariantOptions): Record<string, Style> {
  const s = p.syntax;
  const italic = (foreground: string) => ({ foreground, italic: o.italics });

  return {
    // Variables stay neutral, `const` included — they appear on almost every line.
    variable: s.variable,

    // Callables: one color for functions and methods, declared or called.
    function: s.function,
    method: s.function,
    member: s.function,
    macro: s.function,

    // Shapes
    class: s.type,
    type: s.type,
    enum: s.type,
    struct: s.type,
    namespace: s.type,
    module: s.type,
    interface: s.interface,
    typeParameter: s.interface,

    // Inputs and members
    parameter: italic(s.parameter),
    property: s.property,
    event: s.property,
    enumMember: s.constant,

    // this / self / cls (Pylance)
    selfParameter: { foreground: s.keyword, italic: false },
    clsParameter: { foreground: s.keyword, italic: false },

    decorator: s.decorator,
    label: s.punctuation,
  };
}
