import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runTests } from "@vscode/test-electron";
import { variants } from "../../src/variants";
import { expectations } from "../expectations";
import { root } from "../highlight";

// Launches a clean VS Code (downloaded into .vscode-test/) with only this theme
// loaded and every installed extension disabled, then for every variant checks:
//  - semantic tokens from the built-in TypeScript support (no extra extensions)
//  - that no workbench color falls back to a stock VS Code color
const hexes = (o: object, out: string[] = []) => {
  for (const v of Object.values(o)) {
    if (typeof v === "string" && v.startsWith("#")) out.push(v);
    else if (v && typeof v === "object") hexes(v, out);
  }
  return out;
};

const themes = variants.map((v) => {
  const themeFile = join(root, "themes", `${v.id}.json`);
  const theme = JSON.parse(readFileSync(themeFile, "utf8"));
  return {
    label: v.label,
    themeFile,
    roles: v.palette.syntax,
    italics: v.options.italics,
    // Vivid variants share their base palette's syntax colors.
    semantic: !v.options.vivid,
    allowedColors: [...hexes(v.palette), ...Object.values<string>(theme.colors)],
  };
});

try {
  await runTests({
    extensionDevelopmentPath: root,
    extensionTestsPath: join(root, "test", "vscode", "index.cjs"),
    // No folder is opened: samples/.vscode/settings.json would pin the theme.
    launchArgs: ["--disable-extensions", "--disable-workspace-trust", "--skip-welcome"],
    extensionTestsEnv: { AUREON_VSCODE_TEST: JSON.stringify({ root, expectations, themes }) },
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
