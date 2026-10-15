import { join } from "node:path";
import { runTests } from "@vscode/test-electron";
import { dark } from "../../src/palettes/dark";
import { expectations } from "../expectations";
import { root } from "../highlight";

// Launches a clean VS Code (downloaded into .vscode-test/) with only this theme
// loaded and every installed extension disabled. The built-in TypeScript
// support is the only semantic token provider, so this proves TS/JS/TSX/JSX
// highlighting needs no extra extensions.
const config = {
  root,
  themeFile: join(root, "themes", "aureon-dark.json"),
  themeLabel: "Aureon Dark",
  roles: dark.syntax,
  expectations,
};

try {
  await runTests({
    extensionDevelopmentPath: root,
    extensionTestsPath: join(root, "test", "semantic", "suite.cjs"),
    launchArgs: [join(root, "samples"), "--disable-extensions", "--disable-workspace-trust", "--skip-welcome"],
    extensionTestsEnv: { AUREON_SEMANTIC_TEST: JSON.stringify(config) },
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
