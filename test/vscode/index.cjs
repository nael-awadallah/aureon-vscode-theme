// Entry point inside the VS Code extension host (see run.ts). Plain CommonJS on
// purpose: the extension host loads this file directly.
const vscode = require("vscode");
const { checkSemantic } = require("./semantic.cjs");
const { checkUi } = require("./ui.cjs");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.run = async function run() {
  const { root, expectations, themes } = JSON.parse(process.env.AUREON_VSCODE_TEST);
  const failures = [];

  for (const theme of themes) {
    console.log(`\n━━ ${theme.label}`);
    await vscode.workspace.getConfiguration().update("workbench.colorTheme", theme.label, vscode.ConfigurationTarget.Global);
    await sleep(500);
    const active = vscode.workspace.getConfiguration().get("workbench.colorTheme");
    const found = [];
    if (active !== theme.label) found.push(`could not activate (got ${active})`);

    if (theme.semantic) found.push(...(await checkSemantic({ root, expectations, ...theme })));
    found.push(...(await checkUi(theme)));
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");

    failures.push(...found.map((f) => `${theme.label}: ${f}`));
  }

  if (failures.length) throw new Error(`${failures.length} check(s) failed:\n  ${failures.join("\n  ")}`);
};
