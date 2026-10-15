# Contributing to Aureon

The theme JSON files in `themes/` are generated, so don't edit them by hand.

- `src/palettes/` — the colors of each variant, as semantic roles
- `src/ui/` — workbench colors, one file per area, mapped from roles
- `src/syntax/` — TextMate and semantic token colors
- `src/variants.ts` — the list of shipped themes

## Working on the theme

```
npm install
npm run dev            # rebuild themes/ on every save
```

Press `F5` in VS Code to open an Extension Development Host on `samples/` with Aureon Dark applied. While `npm run dev` runs, saved palette edits reload live.

## Checks

```
npm run check          # WCAG contrast + role distinctness for every variant
npm test               # TextMate colors for every file in samples/, every variant
npm run test:vscode    # semantic tokens + stock-color audit in a clean VS Code
npm run scopes -- semantic.ts   # print each token's scopes and color
```

`npm run test:vscode` downloads a copy of VS Code into `.vscode-test/` the first time.

## Images

```
npm run icon           # images/brand/logo.png → images/icon.png (256×256)
npm run screenshots    # real VS Code screenshots, 3200×2000, for every variant
npm run hero           # images/hero.png from the screenshots
```

## Releasing

See [PUBLISHING.md](PUBLISHING.md).
