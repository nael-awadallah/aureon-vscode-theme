import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { semantic } from "./syntax/semantic";
import { textmate } from "./syntax/textmate";
import { workbench } from "./ui/workbench";
import { variants } from "./variants";

const root = join(import.meta.dirname, "..");
const json = (data: unknown) => JSON.stringify(data, null, 2) + "\n";

mkdirSync(join(root, "themes"), { recursive: true });

for (const v of variants) {
  const theme = {
    $schema: "vscode://schemas/color-theme",
    name: v.label,
    type: v.palette.type,
    semanticHighlighting: true,
    colors: workbench(v.palette, v.options),
    tokenColors: textmate(v.palette, v.options),
    semanticTokenColors: semantic(v.palette, v.options),
  };
  writeFileSync(join(root, "themes", `${v.id}.json`), json(theme));
}

// Keep package.json's theme list in sync with src/variants.ts.
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.contributes.themes = variants.map((v) => ({
  label: v.label,
  uiTheme: v.palette.type === "dark" ? "vs-dark" : "vs",
  path: `./themes/${v.id}.json`,
}));
writeFileSync(pkgPath, json(pkg));

console.log(`Built ${variants.length} themes: ${variants.map((v) => v.id).join(", ")}`);
