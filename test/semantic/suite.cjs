// Runs inside the VS Code extension host (see run.ts). Plain CommonJS on purpose:
// the extension host loads this file directly.
const fs = require("node:fs");
const path = require("node:path");
const vscode = require("vscode");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Same matching as test/locate.ts. */
function locate(text, word, occurrence) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![\\w$-])${escaped}(?!\\w|-[\\w-])`, "g");
  let match;
  let n = 0;
  while ((match = re.exec(text))) {
    if (n++ === occurrence) return match.index;
  }
  return -1;
}

/**
 * Pick the theme style for a semantic token the way VS Code scores selectors:
 * language +10, type +100, each modifier +100. Foreground and italic are
 * resolved independently.
 */
function resolveStyle(rules, type, modifiers, language) {
  const best = { foreground: { score: -1 }, italic: { score: -1 }, selector: "" };
  for (const [selector, raw] of Object.entries(rules)) {
    const [, selType, selMods, selLang] = /^(\*|\w+)((?:\.\w+)*)(?::(\w+))?$/.exec(selector);
    const mods = selMods ? selMods.slice(1).split(".") : [];
    let score = 0;
    if (selLang) {
      if (selLang !== language) continue;
      score += 10;
    }
    if (selType !== "*") {
      if (selType !== type) continue;
      score += 100;
    }
    if (mods.some((m) => !modifiers.includes(m))) continue;
    score += mods.length * 100;

    const style = typeof raw === "string" ? { foreground: raw } : raw;
    if (style.foreground && score > best.foreground.score) {
      best.foreground = { score, value: style.foreground };
      best.selector = selector;
    }
    if (style.italic !== undefined && score > best.italic.score) best.italic = { score, value: style.italic };
  }
  return { foreground: best.foreground.value, italic: best.italic.value === true, selector: best.selector };
}

/** Poll until the TypeScript server answers with a stable token set. */
async function semanticTokens(uri) {
  let previous;
  for (let i = 0; i < 120; i++) {
    const tokens = await vscode.commands.executeCommand("vscode.provideDocumentSemanticTokens", uri);
    const length = tokens?.data?.length ?? 0;
    if (length > 0 && previous === length) return tokens;
    previous = length;
    await sleep(500);
  }
  throw new Error(`No semantic tokens for ${uri.fsPath} after 60s`);
}

function decode(data, legend) {
  const out = [];
  let line = 0;
  let char = 0;
  for (let i = 0; i < data.length; i += 5) {
    line += data[i];
    char = data[i] === 0 ? char + data[i + 1] : data[i + 1];
    const modifiers = legend.tokenModifiers.filter((_, bit) => data[i + 4] & (1 << bit));
    out.push({ line, char, length: data[i + 2], type: legend.tokenTypes[data[i + 3]], modifiers });
  }
  return out;
}

exports.run = async function run() {
  const config = JSON.parse(process.env.AUREON_SEMANTIC_TEST);
  const theme = JSON.parse(fs.readFileSync(config.themeFile, "utf8"));
  const failures = [];
  let checked = 0;

  if (theme.semanticHighlighting !== true) failures.push("theme does not set semanticHighlighting: true");

  const others = vscode.extensions.all.filter((e) => !e.packageJSON.isBuiltin && e.id !== "nael-awadallah.aureon-theme");
  if (others.length) failures.push(`unexpected extensions active: ${others.map((e) => e.id).join(", ")}`);

  await vscode.workspace.getConfiguration().update("workbench.colorTheme", config.themeLabel, vscode.ConfigurationTarget.Global);
  if (vscode.workspace.getConfiguration().get("workbench.colorTheme") !== config.themeLabel) {
    failures.push(`could not activate ${config.themeLabel}`);
  }

  for (const [file, cases] of Object.entries(config.expectations)) {
    const semanticCases = cases.filter((c) => c[2]);
    if (!semanticCases.length) continue;

    const uri = vscode.Uri.file(path.join(config.root, "samples", file));
    const doc = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(doc);
    const legend = await vscode.commands.executeCommand("vscode.provideDocumentSemanticTokensLegend", uri);
    const tokens = decode((await semanticTokens(uri)).data, legend);
    const text = doc.getText();
    console.log(`\n${file} (${doc.languageId}): ${tokens.length} semantic tokens`);

    for (const [word, occurrence, role] of semanticCases) {
      checked++;
      const label = `${file} "${word}" #${occurrence}`;
      const offset = locate(text, word, occurrence);
      if (offset < 0) {
        failures.push(`${label}: not found`);
        continue;
      }
      const pos = doc.positionAt(offset);
      const token = tokens.find((t) => t.line === pos.line && t.char <= pos.character && pos.character < t.char + t.length);
      if (!token) {
        failures.push(`${label}: no semantic token (expected ${role})`);
        continue;
      }
      const kind = [token.type, ...token.modifiers].join(".");
      const style = resolveStyle(theme.semanticTokenColors, token.type, token.modifiers, doc.languageId);
      const expected = config.roles[role].toUpperCase();
      const actual = (style.foreground ?? "TextMate fallback").toUpperCase();
      const ok = actual === expected && (role !== "parameter" || style.italic);
      console.log(`  ${ok ? "ok  " : "FAIL"} ${word.padEnd(14)} ${kind.padEnd(40)} → ${style.selector || "-"} ${actual}`);
      if (actual !== expected) failures.push(`${label}: ${kind} resolved to ${actual} via "${style.selector}", expected ${role} ${expected}`);
      if (role === "parameter" && !style.italic) failures.push(`${label}: parameter should be italic`);
    }
  }

  console.log(`\nChecked ${checked} semantic tokens.`);
  if (failures.length) throw new Error(`${failures.length} semantic check(s) failed:\n  ${failures.join("\n  ")}`);
};
