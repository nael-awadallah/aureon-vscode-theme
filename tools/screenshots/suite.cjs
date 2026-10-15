// Runs inside the VS Code extension host (see run.ts). For each shot it sets up
// the window, signals the runner, and waits until the runner has captured it.
const fs = require("node:fs");
const path = require("node:path");
const vscode = require("vscode");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(file, timeout = 120_000) {
  for (let t = 0; t < timeout; t += 200) {
    if (fs.existsSync(file)) return;
    await sleep(200);
  }
  throw new Error(`timed out waiting for ${file}`);
}

async function semanticTokensReady(uri) {
  let previous;
  for (let i = 0; i < 120; i++) {
    const tokens = await vscode.commands.executeCommand("vscode.provideDocumentSemanticTokens", uri);
    const length = tokens?.data?.length ?? 0;
    if (length > 0 && previous === length) return;
    previous = length;
    await sleep(500);
  }
}

exports.run = async function run() {
  const { workspace, signals, shots } = JSON.parse(process.env.AUREON_SCREENSHOTS);
  const run = (command, ...args) => vscode.commands.executeCommand(command, ...args).then(undefined, () => undefined);

  const config = vscode.workspace.getConfiguration();
  const target = vscode.ConfigurationTarget.Workspace;

  for (const [i, shot] of shots.entries()) {
    await config.update("workbench.colorTheme", shot.label, target);
    await config.update("editor.fontSize", shot.fontSize, target);
    await config.update("editor.minimap.enabled", shot.minimap, target);

    await run("workbench.action.closeAllEditors");
    await run("workbench.action.closeAuxiliaryBar");
    await run("workbench.action.closePanel");
    await run(shot.sidebar ? "workbench.view.explorer" : "workbench.action.closeSidebar");

    for (const file of shot.tabs) {
      const doc = await vscode.workspace.openTextDocument(path.join(workspace, file));
      await vscode.window.showTextDocument(doc, { preview: false });
    }
    const editor = vscode.window.activeTextEditor;
    await semanticTokensReady(editor.document.uri);

    // A selected word shows selection and occurrence highlights; a bare cursor
    // shows the line highlight. Both show the gold cursor.
    const text = editor.document.getText();
    if (shot.select) {
      const start = editor.document.positionAt(text.indexOf(shot.select.near) + shot.select.offset);
      editor.selection = new vscode.Selection(start, start.translate(0, shot.select.length));
    } else if (shot.cursor) {
      const pos = editor.document.positionAt(text.indexOf(shot.cursor.near));
      editor.selection = new vscode.Selection(pos, pos);
    }
    editor.revealRange(new vscode.Range(shot.top, 0, shot.top, 0), vscode.TextEditorRevealType.AtTop);
    if (shot.sidebar) await run("revealInExplorer", editor.document.uri);
    await run("workbench.action.focusActiveEditorGroup");
    await run("notifications.clearAll");
    await sleep(1500);

    fs.writeFileSync(path.join(signals, `ready-${i}`), "");
    await waitFor(path.join(signals, `done-${i}`));
  }
};
