# Aureon — VS Code Theme

A refined, modern theme family for focused development. Warm umber surfaces, gold accents, and balanced, readable syntax colors.

| Theme                                     | Status      |
| ----------------------------------------- | ----------- |
| Aureon Dark                               | in progress |
| Aureon Dark Vivid (solid gold status bar) | in progress |
| Aureon Dusk                               | planned     |
| Aureon Light                              | planned     |

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
```

Press `F5` in VS Code to open an Extension Development Host on `samples/` with Aureon Dark applied. While `npm run dev` runs, saved palette edits reload live.

## License

MIT. See the `LICENSE` file.
