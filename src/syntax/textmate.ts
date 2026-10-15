import type { Palette, VariantOptions } from "../palettes/types";

export interface TokenColor {
  name: string;
  scope: string[];
  settings: { foreground?: string; fontStyle?: string };
}

// TextMate scopes by role.
export function textmate(p: Palette, o: VariantOptions): TokenColor[] {
  const s = p.syntax;
  const italic = o.italics ? "italic" : "";
  const rule = (name: string, scope: string[], foreground?: string, fontStyle?: string): TokenColor => ({
    name,
    scope,
    settings: { ...(foreground && { foreground }), ...(fontStyle !== undefined && { fontStyle }) },
  });

  return [
    rule("Comments", ["comment", "punctuation.definition.comment", "string.comment"], s.comment, italic),
    rule("Doc tags", ["storage.type.class.jsdoc", "entity.name.type.instance.jsdoc", "keyword.other.phpdoc", "comment.block.documentation storage"], s.docTag, italic),

    rule("Keywords", ["keyword", "keyword.control", "storage.type", "storage.modifier", "keyword.other.using", "keyword.other.import", "variable.language.super"], s.keyword, italic),
    rule("Operators", ["keyword.operator", "keyword.operator.assignment", "keyword.operator.arithmetic", "keyword.operator.logical", "keyword.operator.comparison"], s.operator, ""),
    rule("Word operators", ["keyword.operator.new", "keyword.operator.expression", "keyword.operator.instanceof", "keyword.operator.typeof", "keyword.operator.logical.python"], s.keyword, italic),
    rule("Punctuation", ["punctuation", "meta.brace", "punctuation.separator", "punctuation.terminator", "punctuation.accessor"], s.punctuation),
    rule("Template expression", ["punctuation.definition.template-expression", "punctuation.section.embedded"], s.keyword),

    rule("Functions", ["entity.name.function", "support.function", "meta.function-call entity.name.function", "variable.function", "meta.require"], s.function),
    rule("Types", ["entity.name.type", "entity.name.class", "entity.other.inherited-class", "support.type", "support.class", "storage.type.primitive", "entity.name.namespace", "entity.name.type.module"], s.type),
    rule("Built-in types", ["support.type.primitive", "support.type.builtin", "keyword.type"], s.type),

    rule("Variables", ["variable", "variable.other.readwrite", "meta.definition.variable"], s.variable),
    rule("Constants", ["constant", "constant.numeric", "constant.language", "constant.character", "variable.other.constant", "variable.other.enummember", "support.constant"], s.number),
    rule("Parameters", ["variable.parameter", "meta.parameters variable", "entity.name.variable.parameter"], s.parameter, italic),
    rule("Properties", ["variable.other.property", "variable.other.object.property", "support.variable.property", "meta.object-literal.key", "entity.name.tag.yaml", "support.type.property-name.json"], s.property),
    rule("this / self", ["variable.language.this", "variable.language.self", "variable.language.special.self", "variable.parameter.function.language.special.self"], s.self, ""),

    rule("Strings", ["string", "string.quoted", "string.template", "punctuation.definition.string"], s.string),
    rule("Escapes & regexp", ["constant.character.escape", "string.regexp", "constant.other.character-class.regexp", "keyword.operator.quantifier.regexp"], s.escape),

    rule("Decorators", ["meta.decorator", "punctuation.decorator", "entity.name.function.decorator", "storage.type.annotation", "meta.attribute.rust"], s.decorator),

    rule("Tags", ["entity.name.tag", "punctuation.definition.tag", "support.class.component"], s.tag),
    rule("Attributes", ["entity.other.attribute-name"], s.attribute, italic),
    rule("CSS properties", ["support.type.property-name.css", "support.type.vendored.property-name"], s.property),
    rule("CSS values & units", ["support.constant.property-value", "keyword.other.unit", "constant.other.color"], s.number),
    rule("CSS selectors", ["entity.other.attribute-name.class.css", "entity.other.attribute-name.id.css", "entity.other.attribute-name.pseudo-class"], s.function, ""),

    rule("Markdown headings", ["markup.heading", "entity.name.section", "punctuation.definition.heading"], p.accent.base, "bold"),
    rule("Markdown bold", ["markup.bold"], undefined, "bold"),
    rule("Markdown italic", ["markup.italic"], undefined, "italic"),
    rule("Markdown code", ["markup.inline.raw", "markup.fenced_code.block"], s.string),
    rule("Markdown links", ["markup.underline.link", "string.other.link"], s.type),
    rule("Markdown quotes", ["markup.quote"], s.comment, italic),
    rule("Diff inserted", ["markup.inserted"], p.git.added),
    rule("Diff deleted", ["markup.deleted"], p.git.deleted),
    rule("Diff changed", ["markup.changed"], p.git.modified),

    rule("Invalid", ["invalid", "invalid.illegal"], s.invalid),
  ];
}
