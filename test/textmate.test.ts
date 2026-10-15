import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { dark } from "../src/palettes/dark";
import { expectations } from "./expectations";
import { root, tokenize } from "./highlight";
import { locate } from "./locate";

// TextMate fallback colors for every sample, resolved the way VS Code does
// (via Shiki + vscode-textmate). Catches broad rules overriding specific ones.

const ITALIC = 1;

for (const [file, cases] of Object.entries(expectations)) {
  test(`TextMate: ${file}`, async () => {
    const text = readFileSync(join(root, "samples", file), "utf8").replace(/\r\n/g, "\n");
    const tokens = (await tokenize(file)).flat();
    const failures: string[] = [];

    for (const [word, occurrence, , role] of cases) {
      if (!role) continue;
      const offset = locate(text, word, occurrence);
      assert.notEqual(offset, -1, `"${word}" #${occurrence} not found in ${file}`);
      const token = tokens.find((t) => t.offset <= offset && offset < t.offset + t.content.length);
      assert.ok(token, `no token at "${word}" #${occurrence}`);

      const expected = dark.syntax[role].toUpperCase();
      const actual = (token.color ?? "").slice(0, 7).toUpperCase();
      const scopes = token.explanation?.[0]?.scopes.map((s) => s.scopeName).join(" ") ?? "";
      if (actual !== expected) {
        failures.push(`  "${word}" #${occurrence}: expected ${role} ${expected}, got ${actual}\n      ${scopes}`);
      }
      if (role === "parameter" && !((token.fontStyle ?? 0) & ITALIC)) {
        failures.push(`  "${word}" #${occurrence}: parameter should be italic`);
      }
    }

    assert.equal(failures.length, 0, `\n${failures.join("\n")}`);
  });
}
