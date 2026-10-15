import { tokenize } from "./highlight";

// Dev tool: print every token with its color and innermost scopes.
//   npx tsx test/scopes.ts semantic.ts
const file = process.argv[2];
const lines = await tokenize(file);
lines.forEach((tokens, i) => {
  for (const t of tokens) {
    if (!t.content.trim()) continue;
    for (const e of t.explanation ?? []) {
      if (!e.content.trim()) continue;
      const scopes = e.scopes.map((s) => s.scopeName).slice(1).join(" ");
      console.log(`${String(i + 1).padStart(3)} ${JSON.stringify(e.content).padEnd(24)} ${t.color} ${scopes}`);
    }
  }
});
