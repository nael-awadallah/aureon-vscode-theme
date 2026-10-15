import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { createHighlighter, type BundledLanguage } from "shiki";
import { mix } from "../../src/color";
import type { Palette } from "../../src/palettes/types";
import { variants } from "../../src/variants";

// Builds the landing page into docs/ (served by GitHub Pages from main /docs).
//
//   npm run site
//
// Code in the live preview is highlighted with Shiki using the real theme
// files, so it matches VS Code's grammar colors. Editor chrome colors come from
// the same theme files.
const root = join(import.meta.dirname, "..", "..");
const src = join(import.meta.dirname);
const out = join(root, "docs");

const files: { name: string; lang: BundledLanguage; icon: string }[] = [
  { name: "semantic.ts", lang: "typescript", icon: "TS" },
  { name: "Component.tsx", lang: "tsx", icon: "⚛" },
  { name: "UserController.php", lang: "php", icon: "php" },
  { name: "palette.py", lang: "python", icon: "py" },
  { name: "styles.css", lang: "css", icon: "#" },
];

const base = variants.filter((v) => !v.options.vivid && v.options.italics);
const theme = (id: string) => JSON.parse(readFileSync(join(root, "themes", `${id}.json`), "utf8"));
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const highlighter = await createHighlighter({
  themes: base.map((v) => theme(v.id)),
  langs: files.map((f) => f.lang),
});

/** Highlighted lines per variant and file. Italic spans get class "i" so the No Italics switch can turn them upright. */
const code: Record<string, Record<string, string[]>> = {};
for (const v of base) {
  code[v.id] = {};
  for (const f of files) {
    const text = readFileSync(join(root, "samples", f.name), "utf8").replace(/\r\n/g, "\n").trimEnd();
    const lines = highlighter.codeToTokensBase(text, { lang: f.lang, theme: theme(v.id).name });
    code[v.id][f.name] = lines.map(
      (tokens) =>
        tokens
          .map((t) => {
            const italic = (t.fontStyle ?? 0) & 1;
            const bold = (t.fontStyle ?? 0) & 2;
            const cls = [italic ? "i" : "", bold ? "b" : ""].filter(Boolean).join(" ");
            return `<span style="color:${t.color}"${cls ? ` class="${cls}"` : ""}>${escape(t.content)}</span>`;
          })
          .join("") || " ",
    );
  }
}

/** Workbench colors the mock editor uses, as CSS custom properties. */
const chromeKeys: Record<string, string> = {
  "--ed-bg": "editor.background",
  "--ed-fg": "editor.foreground",
  "--ed-line": "editor.lineHighlightBackground",
  "--ed-ln": "editorLineNumber.foreground",
  "--ed-ln-active": "editorLineNumber.activeForeground",
  "--ed-cursor": "editorCursor.foreground",
  "--ed-guide": "editorIndentGuide.background1",
  "--side-bg": "sideBar.background",
  "--side-fg": "sideBar.foreground",
  "--side-border": "sideBar.border",
  "--sel-bg": "list.activeSelectionBackground",
  "--sel-fg": "list.activeSelectionForeground",
  "--hover-bg": "list.hoverBackground",
  "--act-bg": "activityBar.background",
  "--act-fg": "activityBar.foreground",
  "--act-muted": "activityBar.inactiveForeground",
  "--act-border": "activityBar.activeBorder",
  "--title-bg": "titleBar.activeBackground",
  "--title-fg": "titleBar.activeForeground",
  "--cc-bg": "commandCenter.background",
  "--cc-border": "commandCenter.border",
  "--tabs-bg": "editorGroupHeader.tabsBackground",
  "--tab-bg": "tab.activeBackground",
  "--tab-fg": "tab.activeForeground",
  "--tab-muted": "tab.inactiveForeground",
  "--tab-top": "tab.activeBorderTop",
  "--crumb": "breadcrumb.foreground",
  "--status-bg": "statusBar.background",
  "--status-fg": "statusBar.foreground",
  "--status-border": "statusBar.border",
  "--border": "editorGroup.border",
};
const chrome: Record<string, Record<string, string>> = {};
for (const v of variants.filter((v) => v.options.italics)) {
  const colors = theme(v.id).colors;
  chrome[v.id] = Object.fromEntries(Object.entries(chromeKeys).map(([cssVar, key]) => [cssVar, colors[key]]));
}

/** Page colors derived from each palette, so the whole page wears the selected theme. */
const page = (p: Palette) => {
  const isLight = p.type === "light";
  return {
    "--page": isLight ? p.bg.sidebar : mix(p.bg.base, "#000000", 0.35),
    "--surface": isLight ? p.bg.base : p.bg.sidebar,
    "--raised": isLight ? "#FFFFFF" : p.bg.raised,
    "--line": p.border.default,
    "--text": p.text.primary,
    "--muted": p.text.secondary,
    "--faint": p.text.muted,
    "--accent": p.accent.base,
    "--accent-strong": p.accent.hover,
    "--on-accent": p.accent.on,
    "--thread": p.accent.thread,
    "--glow": p.accent.base + (isLight ? "22" : "33"),
  };
};
const pages = Object.fromEntries(base.map((v) => [v.id, page(v.palette)]));

const roles: { role: keyof Palette["syntax"]; name: string; sample: string; note: string }[] = [
  { role: "function", name: "Functions and methods", sample: "getIconSets()", note: "Declared or called, one color" },
  { role: "type", name: "Classes, types and enums", sample: "class Circle", note: "The shape of your data" },
  { role: "interface", name: "Interfaces and type parameters", sample: "Shape<T>", note: "A lighter step of the type color" },
  { role: "parameter", name: "Parameters", sample: "radius", note: "Italic, so inputs stand out" },
  { role: "property", name: "Properties", sample: "this.colors", note: "Members, keys and fields" },
  { role: "constant", name: "Enum members and literals", sample: "Level.High", note: "Numbers, booleans, constants" },
  { role: "keyword", name: "Keywords", sample: "export async", note: "Structure, italic" },
  { role: "string", name: "Strings", sample: '"Choose a set"', note: "Text and data" },
  { role: "variable", name: "Variables", sample: "const items", note: "Neutral on purpose" },
  { role: "comment", name: "Comments", sample: "// why, not what", note: "Quiet, italic" },
];
const swatches = Object.fromEntries(base.map((v) => [v.id, Object.fromEntries(roles.map((r) => [r.role, v.palette.syntax[r.role]]))]));

const data = {
  files: files.map(({ name, icon }) => ({ name, icon })),
  variants: base.map((v) => ({ id: v.id, label: v.label.replace("Aureon ", "") })),
  code,
  chrome,
  pages,
  swatches,
};

// Output
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "assets"), { recursive: true });

const template = readFileSync(join(src, "index.html"), "utf8");
const rolesHtml = roles
  .map(
    (r) => `
        <li class="role">
          <span class="role-swatch" data-role="${r.role}"></span>
          <span class="role-name">${r.name}</span>
          <code class="role-sample" data-role="${r.role}">${escape(r.sample)}</code>
          <span class="role-note">${r.note}</span>
          <span class="role-hex" data-hex="${r.role}"></span>
        </li>`,
  )
  .join("");

writeFileSync(
  join(out, "index.html"),
  template
    .replace("<!--ROLES-->", rolesHtml)
    .replace("/*DATA*/", `window.AUREON = ${JSON.stringify(data)};`)
    .replace(/\{\{VERSION\}\}/g, JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version),
);
copyFileSync(join(src, "style.css"), join(out, "style.css"));
copyFileSync(join(src, "app.js"), join(out, "app.js"));
copyFileSync(join(root, "images", "brand", "mark.svg"), join(out, "favicon.svg"));
copyFileSync(join(root, "images", "brand", "logo.svg"), join(out, "assets", "logo.svg"));
copyFileSync(join(root, "images", "brand", "mark.svg"), join(out, "assets", "mark.svg"));
await sharp(join(root, "images", "brand", "mark.svg")).resize(180, 180).png().toFile(join(out, "assets", "apple-touch-icon.png"));
await sharp(join(root, "images", "hero.png")).resize(1200, 800).png({ compressionLevel: 9 }).toFile(join(out, "assets", "social.png"));
for (const id of ["aureon-dark", "aureon-dusk", "aureon-light"]) {
  await sharp(join(root, "images", "screenshots", `${id}.png`)).resize(1600).webp({ quality: 86 }).toFile(join(out, "assets", `${id}.webp`));
}
writeFileSync(join(out, ".nojekyll"), "");
console.log(`docs/ built: ${base.length} variants × ${files.length} files`);
