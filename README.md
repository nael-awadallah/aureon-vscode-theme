<p align="center">
  <img src="https://raw.githubusercontent.com/nael-awadallah/aureon-vscode-theme/main/images/hero.png" alt="Aureon — VS Code theme family: Dark, Dusk and Light" width="100%">
</p>

<p align="center">
  <a href="https://vscode.dev/redirect?url=vscode:extension/nael-awadallah.aureon-theme"><img src="https://img.shields.io/badge/Install%20in-VS%20Code-E5B567?style=for-the-badge&labelColor=141311" alt="Install in VS Code"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=nael-awadallah.aureon-theme"><img src="https://img.shields.io/badge/View%20on-Marketplace-8FAFC0?style=for-the-badge&labelColor=141311" alt="View on the VS Code Marketplace"></a>
  <a href="https://open-vsx.org/extension/nael-awadallah/aureon-theme"><img src="https://img.shields.io/badge/Get%20it%20on-Open%20VSX-4FD1C5?style=for-the-badge&labelColor=141311" alt="Get it on Open VSX"></a>
  <a href="https://nael-awadallah.github.io/aureon-vscode-theme/"><img src="https://img.shields.io/badge/Try%20it-Live%20preview-D9986A?style=for-the-badge&labelColor=141311" alt="Try the live preview on the Aureon website"></a>
</p>

# Aureon

A refined, modern theme family for focused development. Calm surfaces, a gold thread that runs through every variant, and syntax colors that tell you **what each symbol is** — not just that it's code.

- **Three moods, one design:** Aureon Dark, Aureon Dusk and Aureon Light, each with a **Vivid** version (solid accent status bar) and a **No Italics** version.
- **Semantic highlighting built in:** functions, methods, classes, interfaces, parameters and properties each have their own color, and ordinary variables stay calm. It works out of the box for TypeScript and JavaScript, with no extra extensions.
- **The whole UI, not just the editor:** more than 820 workbench colors, so chat, debugging, testing, notebooks, the merge editor and the source control graph all match. No stock VS Code blue left anywhere.
- **Easy on the eyes:** every text color is checked against WCAG contrast, with a ceiling too, so nothing glares.

**[Try every theme live on the website](https://nael-awadallah.github.io/aureon-vscode-theme/)** Switch between Dark, Dusk and Light and browse real code before you install.

## The themes

### Aureon Dark

The signature look: deep umber-black with warm gold accents.

![Aureon Dark](https://raw.githubusercontent.com/nael-awadallah/aureon-vscode-theme/main/images/screenshots/aureon-dark.png)

### Aureon Dusk

A cool alternative: blue-black with teal and violet. Gold stays on the cursor, the active line number and badges.

![Aureon Dusk](https://raw.githubusercontent.com/nael-awadallah/aureon-vscode-theme/main/images/screenshots/aureon-dusk.png)

### Aureon Light

Warm paper with deep amber accents, for daylight. Every accent is dark enough to read as text.

![Aureon Light](https://raw.githubusercontent.com/nael-awadallah/aureon-vscode-theme/main/images/screenshots/aureon-light.png)

### Vivid versions

**Aureon Dark Vivid**, **Aureon Dusk Vivid** and **Aureon Light Vivid** swap the quiet status bar for a solid accent bar.

![Aureon Dark Vivid](https://raw.githubusercontent.com/nael-awadallah/aureon-vscode-theme/main/images/screenshots/aureon-dark-vivid.png)

### No Italics versions

**Aureon Dark No Italics**, **Aureon Dusk No Italics** and **Aureon Light No Italics** keep every color but set comments, keywords and parameters upright. Pick these if your font has no italic, or a weak one.

### Which one is for me?

| You want… | Pick |
| --- | --- |
| The signature warm, dark look | **Aureon Dark** |
| Something cooler for night sessions | **Aureon Dusk** |
| Daylight, bright rooms, or a projector | **Aureon Light** |
| A status bar you can spot from across the room | any **Vivid** version |
| Upright code with a font that has no good italic | any **No Italics** version |

## Semantic colors

Color means something. Related roles share a hue family, and anything that appears on most lines stays neutral.

| Role | Dark | Dusk | Light | Style |
| --- | --- | --- | --- | --- |
| Functions & methods | `#E5B567` | `#4FD1C5` | `#9A5B13` | |
| Classes, types, enums, namespaces | `#8FAFC0` | `#7FB3D5` | `#1D4ED8` | |
| Interfaces & type parameters | `#A9C4D3` | `#9CC8E6` | `#2F6FB0` | |
| Parameters | `#D6C3A5` | `#E0C7A3` | `#8A4B2A` | italic |
| Properties | `#CDC6D9` | `#AEBBD0` | `#3F5A6E` | |
| Enum members & literals | `#D9986A` | `#E9A27C` | `#B4421A` | |
| Keywords | `#B6A0D1` | `#A78BFA` | `#6D28D9` | italic |
| Strings | `#A8BE91` | `#9FD79F` | `#2F7D32` | |
| Variables | `#D9D2C7` | `#D2D5DB` | `#34322F` | |
| Comments | `#7A7268` | `#6E7686` | `#7D766C` | italic |

A declaration and its uses always share a color. Symbol icons in suggestions and the outline follow the same roles.

**Language support.** TypeScript, JavaScript, TSX and JSX get full semantic colors from VS Code's built-in TypeScript support. CSS, HTML, JSON, YAML, Markdown, `.env`, PHP, Python and others use carefully scoped grammar colors. If you use [Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) (PHP) or [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) (Python), their semantic tokens pick up the same colors automatically.

## Install

**VS Code, from the browser:** click **[Install in VS Code](https://vscode.dev/redirect?url=vscode:extension/nael-awadallah.aureon-theme)**. Your browser asks to open VS Code, which then shows Aureon with an **Install** button. You can also use the **Install** button on the [Marketplace page](https://marketplace.visualstudio.com/items?itemName=nael-awadallah.aureon-theme).

**VS Code, from the editor:** open the Extensions view (`Ctrl+Shift+X`), search for **Aureon**, and install. Or open Quick Open (`Ctrl+P`) and run:

```
ext install nael-awadallah.aureon-theme
```

**Cursor, Windsurf, VSCodium and other editors that use Open VSX:** search for **Aureon** in the extensions view, or get it from [open-vsx.org](https://open-vsx.org/extension/nael-awadallah/aureon-theme).

Then press `Ctrl+K Ctrl+T` (`Cmd+K Cmd+T` on macOS) and choose an Aureon theme.

## Recommended settings

Aureon looks its best with a modern coding font and a little breathing room:

```jsonc
{
  "editor.fontFamily": "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.7,
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.guides.bracketPairs": "active",
  "workbench.tree.indent": 14
}
```

Comments, keywords and parameters are italic. Fonts with a well-drawn italic, such as JetBrains Mono, Cascadia Code or Monaspace, make that shine. If yours doesn't have one, use a **No Italics** version.

## Feedback

Found a color that's hard to read or a spot that still looks stock? [Open an issue](https://github.com/nael-awadallah/aureon-vscode-theme/issues) with a screenshot and the output of **Developer: Inspect Editor Tokens and Scopes**.

## License

[MIT](https://github.com/nael-awadallah/aureon-vscode-theme/blob/main/LICENSE)
