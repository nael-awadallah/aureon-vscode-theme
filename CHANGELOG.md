# Changelog

All notable changes to **Aureon** are documented here.

## [Unreleased]

- New syntax palette for all three themes, built on the structure of VS Code's 2026 themes: blue variables, orange parameters, violet functions, teal types and interfaces, and coral keywords. Each was measured from the rendered editor and tuned for Aureon's backgrounds (Light's teal and green are a shade darker to stay readable on warm paper)
- Control flow (`if`, `for`, `return`, `await`, `import`/`export`) has its own color, separate from declarations
- Properties stay neutral, so long member chains stay calm
- The interface keeps Aureon's gold (Dark), teal (Dusk) and amber (Light) accents
- README: link to the live preview website

## [0.2.0] — 2026-10-15

- **No Italics** versions of Aureon Dark, Dusk and Light: the same colors with upright comments, keywords and parameters
- Markdown: gold headings with softer `#` marks, gold list bullets, quieter URLs, strikethrough, colored fence languages, and calm emphasis markers
- YAML: anchors and aliases share a color, and merge keys, tags and document markers are styled
- `.env` files: keys, values, `${…}` interpolation and `export`
- New brand: a gold ribbon "A" icon and a new README banner
- README: a "Which one is for me?" guide

## [0.1.1] — 2026-10-15

- README: one-click **Install in VS Code** button that opens VS Code from the browser, plus links to the Marketplace and Open VSX pages

## [0.1.0] — 2026-10-15

First public release.

- **Aureon Dark**, **Aureon Dusk** and **Aureon Light**, each with a **Vivid** version that has a solid accent status bar
- Semantic highlighting: functions and methods, classes, interfaces, type parameters, parameters, properties, enums and namespaces each get a clear role color, while ordinary variables stay neutral. It works out of the box for TypeScript, JavaScript, TSX and JSX
- Carefully scoped grammar colors for CSS, HTML, JSON, PHP and Python, and anything else without semantic tokens
- More than 820 workbench colors: chat, debugging, testing, notebooks, the merge editor, the source control graph, symbol icons and terminal suggestions all use the Aureon palette
- Symbol icons follow the syntax roles, so an icon matches the color of the code it stands for
- Every text color is checked for WCAG contrast, and role colors are checked to stay easy to tell apart
