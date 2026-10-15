import { contrast } from "./color";
import type { Palette } from "./palettes/types";
import { variants } from "./variants";

// WCAG contrast rules for every palette. Exits non-zero on any failure.
const TEXT = 4.5;
const SUBTLE = 3; // comments, punctuation, line numbers
const MAX_BODY = 13; // calm, not glaring

const subtleRoles = new Set(["comment", "punctuation"]);

function checkPalette(p: Palette): string[] {
  const fails: string[] = [];
  const need = (label: string, fg: string, bg: string, min: number, max = Infinity) => {
    const r = contrast(fg, bg);
    const ok = r >= min && r <= max;
    console.log(`  ${ok ? "ok  " : "FAIL"} ${label.padEnd(26)} ${fg} on ${bg}  ${r.toFixed(2)}:1`);
    if (!ok) fails.push(label);
  };

  need("text.primary", p.text.primary, p.bg.base, TEXT, MAX_BODY);
  need("text.secondary", p.text.secondary, p.bg.base, TEXT);
  need("text.secondary on sidebar", p.text.secondary, p.bg.sidebar, TEXT);
  need("text.muted", p.text.muted, p.bg.base, SUBTLE);
  need("accent on base", p.accent.base, p.bg.base, TEXT);
  need("accent.on on accent", p.accent.on, p.accent.base, TEXT);
  for (const [role, fg] of Object.entries(p.syntax)) {
    need(`syntax.${role}`, fg, p.bg.base, subtleRoles.has(role) ? SUBTLE : TEXT);
  }
  return fails;
}

const seen = new Set<Palette>();
let failed = 0;
for (const v of variants) {
  if (seen.has(v.palette)) continue;
  seen.add(v.palette);
  console.log(v.label);
  failed += checkPalette(v.palette).length;
}

if (failed) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log("\nAll contrast checks passed.");
