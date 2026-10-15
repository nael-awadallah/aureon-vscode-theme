import { contrast, deltaE, over } from "./color";
import type { Palette } from "./palettes/types";
import { workbench } from "./ui/workbench";
import { variants } from "./variants";

// WCAG contrast rules for every palette and every generated workbench.
// Exits non-zero on any failure.
const TEXT = 4.5;
const SUBTLE = 3; // comments, punctuation, line numbers, inactive labels
const MAX_BODY = 13; // calm, not glaring

const subtleRoles = new Set(["comment", "punctuation"]);

// Role colors must be told apart at a glance (CIE76 ΔE). Roles in the same
// hue family (classes and interfaces) only need one clear lightness step.
const DISTINCT = 10;
const FAMILY = 6;
const semanticRoles = ["variable", "function", "type", "interface", "parameter", "property", "constant", "keyword", "string"] as const;
const families = new Set(["type/interface"]);

let failed = 0;
const need = (label: string, fg: string, bg: string, min: number, max = Infinity) => {
  const r = contrast(fg, bg);
  const ok = r >= min && r <= max;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label.padEnd(44)} ${fg} on ${bg}  ${r.toFixed(2)}:1`);
  if (!ok) failed++;
};

function checkPalette(p: Palette) {
  need("text.primary", p.text.primary, p.bg.base, TEXT, MAX_BODY);
  need("text.secondary", p.text.secondary, p.bg.base, TEXT);
  need("text.muted", p.text.muted, p.bg.base, SUBTLE);
  for (const [role, fg] of Object.entries(p.syntax)) {
    need(`syntax.${role}`, fg, p.bg.base, subtleRoles.has(role) ? SUBTLE : TEXT);
  }
  for (let i = 0; i < semanticRoles.length; i++) {
    for (let j = i + 1; j < semanticRoles.length; j++) {
      const pair = `${semanticRoles[i]}/${semanticRoles[j]}`;
      const d = deltaE(p.syntax[semanticRoles[i]], p.syntax[semanticRoles[j]]);
      const min = families.has(pair) ? FAMILY : DISTINCT;
      if (d < min) {
        console.log(`  FAIL ${("distinct " + pair).padEnd(44)} ΔE ${d.toFixed(1)} < ${min}`);
        failed++;
      }
    }
  }
  for (const [name, fg] of Object.entries(p.ansi)) {
    if (name === "black") continue;
    need(`ansi.${name}`, fg, p.bg.panel, name === "brightBlack" ? SUBTLE : TEXT);
  }
}

/**
 * [foreground key, background key, surface key (for translucent backgrounds), minimum]
 * Read from the generated theme, so these check what users actually see.
 */
const pairs: [string, string, string | null, number][] = [
  ["editor.foreground", "editor.background", null, TEXT],
  ["editor.foreground", "editor.selectionBackground", "editor.background", TEXT],
  ["editor.foreground", "editor.findMatchBackground", "editor.background", TEXT],
  ["editor.foreground", "editor.lineHighlightBackground", null, TEXT],
  ["editorLineNumber.foreground", "editor.background", null, SUBTLE],
  ["editorLineNumber.activeForeground", "editor.background", null, TEXT],
  ["editorInlayHint.foreground", "editorInlayHint.background", "editor.background", SUBTLE],
  ["editorCodeLens.foreground", "editor.background", null, SUBTLE],
  ["sideBar.foreground", "sideBar.background", null, TEXT],
  ["list.activeSelectionForeground", "list.activeSelectionBackground", "sideBar.background", TEXT],
  ["list.inactiveSelectionForeground", "list.inactiveSelectionBackground", "sideBar.background", TEXT],
  ["list.hoverForeground", "list.hoverBackground", "sideBar.background", TEXT],
  ["list.highlightForeground", "sideBar.background", null, TEXT],
  ["activityBar.foreground", "activityBar.background", null, TEXT],
  ["activityBar.inactiveForeground", "activityBar.background", null, SUBTLE],
  ["activityBarBadge.foreground", "activityBarBadge.background", null, TEXT],
  ["tab.activeForeground", "tab.activeBackground", null, TEXT],
  ["tab.inactiveForeground", "tab.inactiveBackground", null, SUBTLE],
  ["breadcrumb.foreground", "breadcrumb.background", null, SUBTLE],
  ["titleBar.activeForeground", "titleBar.activeBackground", null, TEXT],
  ["commandCenter.foreground", "commandCenter.background", null, TEXT],
  ["statusBar.foreground", "statusBar.background", null, TEXT],
  ["statusBarItem.remoteForeground", "statusBarItem.remoteBackground", "statusBar.background", TEXT],
  ["statusBarItem.prominentForeground", "statusBarItem.prominentBackground", "statusBar.background", TEXT],
  ["statusBarItem.errorForeground", "statusBarItem.errorBackground", null, TEXT],
  ["statusBarItem.warningForeground", "statusBarItem.warningBackground", null, TEXT],
  ["statusBar.debuggingForeground", "statusBar.debuggingBackground", null, TEXT],
  ["button.foreground", "button.background", null, TEXT],
  ["button.foreground", "button.hoverBackground", null, TEXT],
  ["button.secondaryForeground", "button.secondaryBackground", null, TEXT],
  ["badge.foreground", "badge.background", null, TEXT],
  ["input.foreground", "input.background", null, TEXT],
  ["input.placeholderForeground", "input.background", null, SUBTLE],
  ["dropdown.foreground", "dropdown.background", null, TEXT],
  ["quickInput.foreground", "quickInput.background", null, TEXT],
  ["quickInputList.focusForeground", "quickInputList.focusBackground", "quickInput.background", TEXT],
  ["pickerGroup.foreground", "quickInput.background", null, TEXT],
  ["menu.foreground", "menu.background", null, TEXT],
  ["menu.selectionForeground", "menu.selectionBackground", "menu.background", TEXT],
  ["editorSuggestWidget.foreground", "editorSuggestWidget.background", null, TEXT],
  ["editorSuggestWidget.selectedForeground", "editorSuggestWidget.selectedBackground", "editorSuggestWidget.background", TEXT],
  ["editorSuggestWidget.highlightForeground", "editorSuggestWidget.background", null, TEXT],
  ["editorHoverWidget.foreground", "editorHoverWidget.background", null, TEXT],
  ["notifications.foreground", "notifications.background", null, TEXT],
  ["panelTitle.activeForeground", "panel.background", null, TEXT],
  ["panelTitle.inactiveForeground", "panel.background", null, SUBTLE],
  ["terminal.foreground", "terminal.background", null, TEXT],
  ["terminal.foreground", "terminal.selectionBackground", "terminal.background", TEXT],
  ["peekViewResult.fileForeground", "peekViewResult.background", null, TEXT],
  ["peekViewResult.selectionForeground", "peekViewResult.selectionBackground", "peekViewResult.background", TEXT],
  ["keybindingLabel.foreground", "keybindingLabel.background", null, TEXT],
  ["banner.foreground", "banner.background", null, TEXT],
  ["textLink.foreground", "editor.background", null, TEXT],
  ["gitDecoration.modifiedResourceForeground", "sideBar.background", null, TEXT],
  ["gitDecoration.addedResourceForeground", "sideBar.background", null, TEXT],
  ["gitDecoration.deletedResourceForeground", "sideBar.background", null, TEXT],
  ["gitDecoration.ignoredResourceForeground", "sideBar.background", null, 2.5],
  ["chat.slashCommandForeground", "chat.slashCommandBackground", "editor.background", TEXT],
];

function checkWorkbench(colors: Record<string, string>) {
  for (const [fgKey, bgKey, surfaceKey, min] of pairs) {
    const fg = colors[fgKey];
    const surface = surfaceKey ? colors[surfaceKey] : undefined;
    const bg = surface ? over(colors[bgKey], surface) : colors[bgKey];
    if (!fg || !bg) {
      console.log(`  FAIL ${fgKey} / ${bgKey}: not defined`);
      failed++;
      continue;
    }
    need(`${fgKey}`, over(fg, bg), bg.slice(0, 7), min);
  }
}

const seen = new Set<Palette>();
for (const v of variants) {
  console.log(v.label);
  if (!seen.has(v.palette)) {
    seen.add(v.palette);
    checkPalette(v.palette);
  }
  checkWorkbench(workbench(v.palette, v.options));
}

if (failed) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log("\nAll contrast checks passed.");
