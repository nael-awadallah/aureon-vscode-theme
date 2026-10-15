# Changelog

All notable changes to **Aureon** are documented here.

## [Unreleased]

- Palette-driven generator (`src/`) that writes `themes/*.json`
- Aureon Dark and Aureon Dark Vivid (solid gold status bar)
- WCAG contrast check (`npm run check`)
- Semantic highlighting: functions and methods, classes, interfaces, type parameters, parameters, properties, enums and namespaces each get a clear role color, while ordinary variables stay neutral
- TextMate fallback rules built from specific scopes for TypeScript, JavaScript, TSX, JSX, JSON, CSS, HTML, PHP and Python
- Tests for TextMate colors and for semantic tokens in a clean VS Code
- Full workbench coverage (817 colors): chat, debug, testing, notebooks, merge editor, source control graph, symbol icons and terminal suggest icons now use the Aureon palette instead of stock VS Code colors
- Symbol icons follow the syntax roles, so an icon matches the color of the code it stands for
- Contrast checks on the generated UI (selections, tabs, status bar, menus, widgets) and an automated audit that fails if any color falls back to a stock VS Code value
