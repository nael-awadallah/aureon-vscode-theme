// Entry point inside the VS Code extension host (see run.ts). Plain CommonJS on
// purpose: the extension host loads this file directly.
const vscode = require("vscode");
const { checkSemantic } = require("./semantic.cjs");
const { checkUi } = require("./ui.cjs");

exports.run = async function run() {
  const config = JSON.parse(process.env.AUREON_VSCODE_TEST);

  await vscode.workspace.getConfiguration().update("workbench.colorTheme", config.themeLabel, vscode.ConfigurationTarget.Global);
  const active = vscode.workspace.getConfiguration().get("workbench.colorTheme");
  const failures = active === config.themeLabel ? [] : [`could not activate ${config.themeLabel} (got ${active})`];

  failures.push(...(await checkSemantic(config)));
  failures.push(...(await checkUi(config)));

  if (failures.length) throw new Error(`${failures.length} check(s) failed:\n  ${failures.join("\n  ")}`);
};
