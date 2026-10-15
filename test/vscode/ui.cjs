// Stock-color audit. Runs inside the VS Code extension host (see index.cjs).
//
// "Developer: Generate Color Theme From Current Settings" lists every
// workbench color VS Code knows. Keys the theme leaves unset appear as
// comments with the value VS Code falls back to. A fallback is fine when it
// is derived from Aureon (VS Code mixes it from our colors). It's a leak when
// it's a stock VS Code hue or a cool / pure grey that clashes with the warm UI.
const vscode = require("vscode");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function rgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function saturation([r, g, b]) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  return max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));
}

exports.checkUi = async function checkUi(config) {
  await vscode.commands.executeCommand("workbench.action.generateColorTheme");
  let text = "";
  for (let i = 0; i < 20 && !text.includes('"colors"'); i++) {
    await sleep(250);
    text = vscode.window.activeTextEditor?.document.getText() ?? "";
  }
  if (!text.includes('"colors"')) return ["could not generate the color theme"];

  const allowed = new Set(config.allowedColors.map((c) => c.slice(0, 7).toLowerCase()));
  const colors = text.slice(0, text.indexOf('"tokenColors"'));
  const unset = [...colors.matchAll(/^\s*\/\/\s*"([^"]+)":\s*"(#[0-9a-fA-F]{6,8})"/gm)];
  const set = [...colors.matchAll(/^\s*"([^"]+)":\s*"#/gm)];
  const leaks = [];

  for (const [, key, value] of unset) {
    const base = value.slice(0, 7).toLowerCase();
    if (allowed.has(base) || base === "#000000" || base === "#ffffff") continue;
    const c = rgb(base);
    const chromatic = saturation(c) >= 0.25;
    const warm = c[0] - c[2] >= 3;
    if (chromatic || !warm) leaks.push(`${key}: falls back to stock ${value}`);
  }

  console.log(`\nUI audit: ${set.length} colors set, ${unset.length} left to VS Code, ${leaks.length} stock leaks`);
  return leaks;
};
