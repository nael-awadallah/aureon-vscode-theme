# Aureon — VS Code Theme

A refined, modern theme family for focused development: calm surfaces, a gold family thread, and syntax colors that tell you what each symbol is.

| Theme | Look |
| --- | --- |
| Aureon Dark | Warm umber-black with gold accents. The signature look |
| Aureon Dusk | Cool blue-black with teal and violet, gold cursor and badges |
| Aureon Light | Warm paper with deep amber accents, for daylight |

Each theme also comes in a **Vivid** version with a solid accent status bar.

## Install

Search for **Aureon** in the Extensions panel, or:

```
ext install nael-awadallah.aureon-theme
```

Then `Ctrl+K Ctrl+T` (`Cmd+K Cmd+T` on macOS) and pick **Aureon Dark**.

## Development

The theme JSON files in `themes/` are generated, so don't edit them by hand.

- `src/palettes/` — the colors, as semantic roles
- `src/ui/` — workbench colors, mapped from roles
- `src/syntax/` — TextMate and semantic token colors
- `src/variants.ts` — the list of shipped themes

```
npm install
npm run dev      # rebuild themes/ on every save
npm run check    # WCAG contrast check
npm test         # TextMate colors for every file in samples/
npm run test:vscode     # semantic tokens + stock-color audit in a clean VS Code
npm run scopes -- semantic.ts   # print each token's scopes and color
```

Press `F5` in VS Code to open an Extension Development Host on `samples/` with Aureon Dark applied. While `npm run dev` runs, saved palette edits reload live.

## License

MIT. See the `LICENSE` file.
