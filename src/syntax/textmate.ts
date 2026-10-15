import type { Palette, VariantOptions } from "../palettes/types";

export interface TokenColor {
  name: string;
  scope: string[];
  settings: { foreground?: string; fontStyle?: string };
}

// TextMate fallback for languages (or moments) without semantic tokens.
//
// Rules use specific scopes taken from VS Code's own grammars, never bare
// `variable`, `entity`, `support` or `meta.*`, so a broad rule can't override
// a more precise classification. Each role mirrors the semantic map in semantic.ts.
const text = (p: Palette) => p.syntax.variable;

export function textmate(p: Palette, o: VariantOptions): TokenColor[] {
  const s = p.syntax;
  const italic = o.italics ? "italic" : "";
  const rule = (name: string, scope: string[], foreground?: string, fontStyle?: string): TokenColor => ({
    name,
    scope,
    settings: { ...(foreground && { foreground }), ...(fontStyle !== undefined && { fontStyle }) },
  });

  return [
    // ── Comments ───────────────────────────────────────────
    rule("Comments", ["comment", "punctuation.definition.comment", "string.quoted.docstring"], s.comment, italic),
    rule("Doc tags", ["storage.type.class.jsdoc", "punctuation.definition.block.tag.jsdoc", "keyword.other.phpdoc"], s.docTag, italic),
    rule("Doc types", ["entity.name.type.instance.jsdoc", "entity.name.type.instance.phpdoc"], s.type, italic),
    rule("Doc parameter names", ["variable.other.jsdoc"], s.parameter, italic),

    // ── Neutral: locals and plain identifiers ──────────────
    rule("Variables", [
      "variable.other.readwrite",
      "variable.other.object",
      "variable.other.constant",
      "variable.other.php",
      "punctuation.definition.variable.php",
      "support.variable.dom",
      "variable.other.normal.shell",
      "meta.template.expression",
      "meta.embedded.line.ts",
      "meta.embedded.line.tsx",
      "meta.embedded.line.js",
    ], s.variable, ""),

    // ── Keywords, operators, punctuation ───────────────────
    rule("Keywords", ["keyword", "storage.type", "storage.modifier", "keyword.other.import", "variable.language.super"], s.keyword, italic),
    rule("Operators", ["keyword.operator", "storage.type.function.arrow"], s.operator, ""),
    rule("Word operators", [
      "keyword.operator.new",
      "keyword.operator.expression",
      "keyword.operator.logical.python",
      "keyword.operator.wordlike",
    ], s.keyword, italic),
    rule("this / self", [
      "variable.language.this",
      "variable.language.self",
      "variable.language.special.self",
      "variable.parameter.function.language.special.self",
      "variable.language.special.cls",
      "variable.parameter.function.language.special.cls",
      "storage.type.php",
      "variable.language.this.php punctuation.definition.variable.php",
    ], s.keyword, ""),
    rule("Punctuation", [
      "punctuation",
      "meta.brace",
      "punctuation.separator.key-value",
    ], s.punctuation),
    rule("Embedded punctuation", [
      "punctuation.definition.template-expression",
      "punctuation.section.embedded",
      "constant.character.format.placeholder.other.python",
      "storage.type.string.python",
      "storage.type.format.python",
    ], s.keyword, ""),

    // ── Callables: functions and methods ───────────────────
    rule("Functions", [
      "entity.name.function",
      "support.function",
      "variable.function",
      "meta.function-call.generic.python",
    ], s.function, ""),
    rule("Decorators", [
      "meta.decorator.ts entity.name.function",
      "meta.decorator.ts variable.other.readwrite",
      "meta.decorator.tsx variable.other.readwrite",
      "meta.decorator.js variable.other.readwrite",
      "entity.name.function.decorator",
      "meta.function.decorator.python support.type",
    ], s.function),
    rule("Decorator marks", ["punctuation.decorator", "punctuation.definition.decorator", "meta.attribute.php", "support.attribute.php"], s.decorator),

    // ── Shapes: classes, types, enums, namespaces ──────────
    rule("Types", [
      "entity.name.type",
      "entity.name.class",
      "entity.other.inherited-class",
      "support.class",
      "support.type",
      "keyword.other.type.php",
      "support.other.namespace.php",
      "new.expr entity.name.function",
      "new.expr entity.name.type",
    ], s.type, ""),
    rule("Interfaces", ["entity.name.type.interface"], s.interface),
    rule("Console", ["support.class.console"], s.variable),

    // ── Inputs and members ─────────────────────────────────
    rule("Parameters", [
      "variable.parameter",
      "meta.function.parameter variable.other.php",
      "meta.function.parameter punctuation.definition.variable.php",
    ], s.parameter, italic),
    rule("Self parameter", ["variable.parameter.function.language.special.self", "variable.parameter.function.language.special.cls"], s.keyword, ""),
    rule("Properties", [
      "variable.other.property",
      "variable.object.property",
      "variable.other.object.property",
      "variable.other.constant.property",
      "support.variable.property",
      "meta.object-literal.key",
      "variable.other.property.php",
      "meta.attribute.python",
      "support.type.property-name",
      "punctuation.support.type.property-name",
      "entity.name.tag.yaml",
    ], s.property, ""),
    rule("Methods on objects", ["meta.object-literal.key entity.name.function", "entity.name.function.member"], s.function),

    // ── Constants ──────────────────────────────────────────
    rule("Constants", [
      "constant.numeric",
      "constant.language",
      "constant.character",
      "variable.other.enummember",
      "constant.other.caps",
      "constant.other.class.php",
      "constant.other.php",
      "support.constant",
      "support.variable.magic.python",
    ], s.constant, ""),

    // ── Strings ────────────────────────────────────────────
    rule("Strings", ["string", "punctuation.definition.string"], s.string, ""),
    rule("Escapes & regexp", [
      "constant.character.escape",
      "string.regexp",
      "constant.other.character-class.regexp",
      "constant.character.set.regexp",
      "keyword.operator.quantifier.regexp",
      "keyword.other.regexp",
      "support.other.match",
    ], s.escape),

    // ── HTML / JSX ─────────────────────────────────────────
    rule("Tags", ["entity.name.tag"], s.tag),
    rule("Components", ["support.class.component"], s.function),
    rule("Tag brackets", ["punctuation.definition.tag"], s.punctuation),
    rule("Attributes", ["entity.other.attribute-name"], s.attribute, ""),

    // ── CSS ────────────────────────────────────────────────
    rule("CSS selectors", [
      "entity.other.attribute-name.class.css",
      "entity.other.attribute-name.id.css",
      "entity.other.attribute-name.class.scss",
      "entity.other.attribute-name.id.scss",
    ], s.function, ""),
    rule("CSS tag selectors", ["entity.name.tag.css", "entity.name.tag.scss"], s.tag),
    rule("CSS pseudo", ["entity.other.attribute-name.pseudo-class", "entity.other.attribute-name.pseudo-element"], s.keyword, ""),
    rule("CSS properties", ["support.type.property-name.css", "support.type.vendored.property-name.css", "support.type.property-name.media"], s.property),
    rule("CSS custom properties", ["variable.css", "variable.argument.css", "variable.scss"], s.variable, ""),
    rule("CSS values", ["support.constant.property-value", "support.constant.font-name", "support.constant.media", "constant.other.color"], s.constant),
    rule("CSS units", ["keyword.other.unit"], s.constant),
    rule("CSS at-rules", ["keyword.control.at-rule"], s.keyword, italic),
    rule("CSS !important", ["keyword.other.important"], s.keyword, ""),

    // ── JSON ───────────────────────────────────────────────
    rule("JSON keys", ["support.type.property-name.json", "punctuation.support.type.property-name.json"], s.property),

    // ── Markdown ───────────────────────────────────────────
    rule("Markdown headings", ["markup.heading", "entity.name.section.markdown"], s.function, "bold"),
    rule("Markdown heading marks", ["punctuation.definition.heading.markdown"], p.accent.deep, "bold"),
    rule("Markdown bold", ["markup.bold"], text(p), "bold"),
    rule("Markdown italic", ["markup.italic"], text(p), "italic"),
    rule("Markdown bold italic", ["markup.bold markup.italic", "markup.italic markup.bold"], text(p), "bold italic"),
    rule("Markdown strikethrough", ["markup.strikethrough"], s.comment, "strikethrough"),
    rule("Markdown emphasis marks", ["punctuation.definition.bold.markdown", "punctuation.definition.italic.markdown", "punctuation.definition.strikethrough.markdown"], s.punctuation, ""),
    rule("Markdown inline code", ["markup.inline.raw"], s.string, ""),
    rule("Markdown code fences", ["markup.fenced_code.block", "markup.raw.block"], s.string, ""),
    rule("Markdown fence language", ["fenced_code.block.language"], s.keyword, ""),
    rule("Markdown link text", ["string.other.link.title", "string.other.link.description"], s.type, ""),
    rule("Markdown URLs", ["markup.underline.link", "markup.underline.link.image"], s.comment, "underline"),
    rule("Markdown list bullets", ["punctuation.definition.list.begin.markdown", "beginning.punctuation.definition.list.markdown"], p.accent.base, ""),
    rule("Markdown quotes", ["markup.quote"], s.comment, italic),
    rule("Markdown quote marks", ["punctuation.definition.quote.begin.markdown", "beginning.punctuation.definition.quote.markdown"], p.accent.deep, ""),
    rule("Markdown separators", ["meta.separator.markdown"], s.punctuation, ""),

    // ── YAML ───────────────────────────────────────────────
    rule("YAML anchors & aliases", ["entity.name.type.anchor.yaml", "variable.other.alias.yaml", "punctuation.definition.anchor.yaml", "punctuation.definition.alias.yaml"], s.type, ""),
    rule("YAML merge key", ["constant.language.merge.yaml"], s.keyword, ""),
    rule("YAML tags", ["storage.type.tag-handle.yaml", "entity.name.tag.local.yaml"], s.keyword, ""),
    rule("YAML document markers", ["entity.other.document.begin.yaml", "entity.other.document.end.yaml"], s.punctuation),

    // ── .env ───────────────────────────────────────────────
    rule(".env keys", ["variable.key.dotenv"], s.property, ""),
    rule(".env values", ["property.value.dotenv"], s.string, ""),
    rule(".env interpolation", ["variable.interpolation.dotenv"], s.property, ""),
    rule(".env interpolation marks", ["keyword.interpolation.begin.dotenv", "keyword.interpolation.end.dotenv"], s.keyword, ""),
    rule("Diff inserted", ["markup.inserted"], p.git.added),
    rule("Diff deleted", ["markup.deleted"], p.git.deleted),
    rule("Diff changed", ["markup.changed"], p.git.modified),

    rule("Invalid", ["invalid", "invalid.illegal"], s.invalid),
  ];
}
