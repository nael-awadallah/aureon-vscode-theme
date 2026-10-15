import { readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { createHighlighter, type BundledLanguage, type ThemedToken } from "shiki";

// TextMate tokenization through Shiki, which uses VS Code's grammars and
// vscode-textmate's theme matching. Semantic tokens are not applied here.

export const root = join(import.meta.dirname, "..");

export const langByExt: Record<string, BundledLanguage> = {
  ".ts": "typescript",
  ".js": "javascript",
  ".tsx": "tsx",
  ".jsx": "jsx",
  ".json": "json",
  ".css": "css",
  ".html": "html",
  ".php": "php",
  ".py": "python",
  ".md": "markdown",
  ".yaml": "yaml",
  ".yml": "yaml",
};

export const langOf = (file: string): BundledLanguage =>
  basename(file).startsWith(".env") ? "dotenv" : langByExt[extname(file)];

export async function tokenize(file: string, themeId = "aureon-dark") {
  const theme = JSON.parse(readFileSync(join(root, "themes", `${themeId}.json`), "utf8"));
  const lang = langOf(file);
  const highlighter = await createHighlighter({ themes: [theme], langs: [lang] });
  const code = readFileSync(join(root, "samples", file), "utf8").replace(/\r\n/g, "\n");
  const lines: ThemedToken[][] = highlighter.codeToTokensBase(code, {
    lang,
    theme: theme.name,
    includeExplanation: "scopeName",
  });
  return lines;
}
