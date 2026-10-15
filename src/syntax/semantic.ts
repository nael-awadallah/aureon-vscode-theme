import type { Palette, VariantOptions } from "../palettes/types";

type Style = string | { foreground?: string; italic?: boolean; bold?: boolean };

// Semantic tokens refine TextMate colors where a language server knows more.
// `variable.readonly` is left alone on purpose: every `const` would turn copper.
export function semantic(p: Palette, o: VariantOptions): Record<string, Style> {
  const s = p.syntax;
  return {
    parameter: { foreground: s.parameter, italic: o.italics },
    typeParameter: s.type,
    enumMember: s.number,
    namespace: s.type,
    decorator: s.decorator,
    property: s.property,
    "property.readonly": s.property,
    "variable.defaultLibrary": s.type,
    "function.defaultLibrary": s.function,
    "method.defaultLibrary": s.function,
    selfKeyword: s.self,
  };
}
