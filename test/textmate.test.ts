import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { variants } from "../src/variants";
import { expectations } from "./expectations";
import { root, tokenize } from "./highlight";
import { locate } from "./locate";

// TextMate fallback colors for every sample in every variant, resolved the way
// VS Code does (via Shiki + vscode-textmate). Catches broad rules overriding
// specific ones. Vivid variants share their base palette's syntax, so they're
// skipped; No Italics variants are checked for upright text.

const ITALIC = 1;

for (const variant of variants.filter((v) => !v.options.vivid)) {
  const italics = variant.options.italics;
  const syntax = variant.palette.syntax;
  for (const [file, cases] of Object.entries(expectations)) {
    test(`TextMate: ${variant.label}: ${file}`, async () => {
      const text = readFileSync(join(root, "samples", file), "utf8").replace(
        /\r\n/g,
        "\n",
      );
      const tokens = (await tokenize(file, variant.id)).flat();
      const failures: string[] = [];

      for (const [word, occurrence, , role] of cases) {
        if (!role) continue;
        const offset = locate(text, word, occurrence);
        assert.notEqual(
          offset,
          -1,
          `"${word}" #${occurrence} not found in ${file}`,
        );
        const token = tokens.find(
          (t) => t.offset <= offset && offset < t.offset + t.content.length,
        );
        assert.ok(token, `no token at "${word}" #${occurrence}`);

        const expected = syntax[role].toUpperCase();
        const actual = (token.color ?? "").slice(0, 7).toUpperCase();
        const scopes =
          token.explanation?.[0]?.scopes.map((s) => s.scopeName).join(" ") ??
          "";
        if (actual !== expected) {
          failures.push(
            `  "${word}" #${occurrence}: expected ${role} ${expected}, got ${actual}\n      ${scopes}`,
          );
        }
        const italic = Boolean((token.fontStyle ?? 0) & ITALIC);
        if (role === "parameter" && italic !== italics) {
          failures.push(
            `  "${word}" #${occurrence}: parameter should ${italics ? "" : "not "}be italic`,
          );
        }
        if (!italics && italic) {
          failures.push(`  "${word}" #${occurrence}: No Italics variant renders italic`);
        }
      }

      assert.equal(failures.length, 0, `\n${failures.join("\n")}`);
    });
  }
}
