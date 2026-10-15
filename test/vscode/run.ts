import { readFileSync } from "node:fs";
import { join } from "node:path";
import { runTests } from "@vscode/test-electron";
import { dark } from "../../src/palettes/dark";
import { expectations } from "../expectations";
import { root } from "../highlight";

// Launches a clean VS Code (downloaded into .vscode-test/) with only this theme
// loaded and every installed extension disabled, then checks:
//  - semantic tokens from the built-in TypeScript support (no extra extensions)
//  - that no workbench color falls back to a stock VS Code color
const themeFile = join(root, "themes", "aureon-dark.json");
const theme = JSON.parse(readFileSync(themeFile, "utf8"));
const paletteColors: string[] = [];
const collect = (o: object) => {
  for (const v of Object.values(o)) {
    if (typeof v === "string" && v.startsWith("#")) paletteColors.push(v);
    else if (v && typeof v === "object") collect(v);
  }
};
collect(dark);

const config = {
  root,
  themeFile,
  themeLabel: "Aureon Dark",
  roles: dark.syntax,
  expectations,
  allowedColors: [...paletteColors, ...Object.values<string>(theme.colors)],
};

try {
  await runTests({
    extensionDevelopmentPath: root,
    extensionTestsPath: join(root, "test", "vscode", "index.cjs"),
    launchArgs: [join(root, "samples"), "--disable-extensions", "--disable-workspace-trust", "--skip-welcome"],
    extensionTestsEnv: { AUREON_VSCODE_TEST: JSON.stringify(config) },
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
