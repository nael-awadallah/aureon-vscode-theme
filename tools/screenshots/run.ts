import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { runTests } from "@vscode/test-electron";
import { variants } from "../../src/variants";

// Real VS Code screenshots for the README, at retina resolution.
//
// A clean VS Code (no extensions) opens a copy of samples/. For each variant
// the suite sets up the window, then this script drives the workbench over the
// Chrome DevTools Protocol: it renders the page at WIDTH×HEIGHT CSS pixels with
// a device scale factor of SCALE and captures it. The output size doesn't
// depend on the screen it runs on.
//
//   npm run screenshots
const WIDTH = 1600;
const HEIGHT = 1000;
const SCALE = 2;
const PORT = 9333;

const root = join(import.meta.dirname, "..", "..");
const work = join(root, ".vscode-test", "screenshots");
const workspace = join(work, "aureon");
const signals = join(work, "signals");
// `--compare` captures identical editors in VS Code's Dark 2026 and in Aureon,
// for side-by-side readability reviews. Output stays out of git.
const compare = process.argv.includes("--compare");
const outDir = compare ? join(root, ".vscode-test", "compare") : join(root, "images", "screenshots");

rmSync(work, { recursive: true, force: true });
mkdirSync(signals, { recursive: true });
mkdirSync(outDir, { recursive: true });
cpSync(join(root, "samples"), workspace, { recursive: true, filter: (src) => !src.includes(".vscode") });
if (compare) cpSync(join(import.meta.dirname, "suite.cjs"), join(workspace, "suite.cjs"));
mkdirSync(join(workspace, ".vscode"));
writeFileSync(
  join(workspace, ".vscode", "settings.json"),
  JSON.stringify(
    {
      "workbench.colorTheme": "Aureon Dark",
      "editor.fontFamily": "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
      "editor.fontSize": 14,
      "editor.lineHeight": 1.7,
      "editor.fontLigatures": true,
      "editor.cursorBlinking": "solid",
      "editor.minimap.renderCharacters": false,
      "editor.stickyScroll.enabled": false,
      "editor.inlayHints.enabled": "off",
      "editor.guides.bracketPairs": "active",
      "editor.lightbulb.enabled": "off",
      "workbench.startupEditor": "none",
      "workbench.tips.enabled": false,
      "workbench.layoutControl.enabled": false,
      "workbench.secondarySideBar.defaultVisibility": "hidden",
      "window.commandCenter": true,
      "chat.disableAIFeatures": true,
      "chat.commandCenter.enabled": false,
      "explorer.compactFolders": false,
      "files.exclude": { "**/.vscode": true, "tsconfig.json": true, "jsx.d.ts": true },
      "git.enabled": false,
    },
    null,
    2,
  ),
);

interface Shot {
  label: string; // theme
  out: string;
  tabs: string[]; // opened in order; the last one is shown
  width: number; // CSS pixels; the PNG is SCALE× larger
  height: number;
  fontSize: number;
  sidebar: boolean;
  minimap: boolean;
  /** 0-based line shown at the top of the editor. */
  top: number;
  /** Selects a word: the `length` characters `offset` after the first `near`. */
  select?: { near: string; offset: number; length: number };
  /** Cursor (no selection) at the start of the first line containing `near`. */
  cursor?: { near: string };
  /** Words whose on-screen boxes are saved next to the PNG, for hero callouts. */
  callouts?: { word: string; nth: number; label: string; role: string }[];
}

const base = { width: WIDTH, height: HEIGHT, fontSize: 14, sidebar: true, minimap: true, top: 0 };

// Words measured in --compare mode: [word, occurrence on screen, role].
const compareWords: Record<string, [string, number, string][]> = {
  "suite.cjs": [
    ["config", 0, "variable"], ["shot", 0, "variable"], ["target", 0, "variable"], ["doc", 0, "variable"],
    ["label", 0, "property"], ["fontSize", 0, "property"], ["workspace", 1, "property"], ["sidebar", 0, "property"],
    ["command", 0, "parameter"], ["args", 0, "parameter"],
    ["update", 0, "method"], ["getConfiguration", 0, "method"], ["parse", 0, "method"], ["run", 1, "function"],
    ["const", 0, "keyword"], ["await", 0, "keyword"], ["for", 0, "keyword"],
    ["ConfigurationTarget", 0, "property"], ["Workspace", 0, "property"], ["JSON", 0, "variable"], ["false", 0, "constant"],
  ],
  "semantic.ts": [
    ["Level", 0, "enum"], ["Low", 0, "enumMember"], ["Shape", 0, "interface"], ["Circle", 0, "class"], ["ShapeList", 0, "type"],
    ["area", 0, "method"], ["logged", 0, "function"], ["target", 0, "parameter"], ["id", 0, "property"], ["radius", 0, "property"],
    ["MAX_RETRIES", 0, "variable"], ["readonly", 0, "keyword"], ["3", 0, "constant"],
  ],
  "UserController.php": [
    ["User", 0, "class"], ["Request", 1, "class"], ["$request", 0, "parameter"], ["$query", 0, "variable"], ["where", 0, "method"],
  ],
};
const compareFiles =["suite.cjs", "semantic.ts", "Component.tsx", "UserController.php", "palette.py", "styles.css"];
const compareThemes = [process.env.AUREON_COMPARE_BASE ?? "Dark 2026", ...(process.env.AUREON_COMPARE_THEMES ?? "Aureon Dark").split(",")];
const shots: Shot[] = compare
  ? compareFiles.flatMap((file) =>
      compareThemes.map((label) => ({
        ...base,
        label,
        out: join(outDir, `${file.replace(/\W/g, "-")}--${label.replace(/\W/g, "-").toLowerCase()}.png`),
        tabs: [file],
        width: 1200,
        height: 860,
        fontSize: 15,
        sidebar: false,
        minimap: false,
        top: file === "suite.cjs" ? 26 : 0,
        cursor: { near: "\n\n" },
        callouts: (compareWords[file] ?? []).map(([word, nth, role]) => ({ word, nth, label: role, role })),
      })),
    )
  : // README screenshots: one per theme, same file, so they compare at a glance.
    variants
  .filter((v) => v.options.italics)
  .map((v) => ({
    ...base,
    label: v.label,
    out: join(outDir, `${v.id}.png`),
    tabs: ["Component.tsx", "semantic.ts"],
    select: { near: "this.radius = radius", offset: 5, length: 6 }, // "radius"
  }));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Minimal Chrome DevTools Protocol client over the built-in WebSocket. */
async function connect() {
  for (let i = 0; i < 120; i++) {
    try {
      const targets: { type: string; url: string; webSocketDebuggerUrl: string }[] = await (
        await fetch(`http://127.0.0.1:${PORT}/json`)
      ).json();
      const page = targets.find((t) => t.type === "page" && t.url.includes("workbench"));
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((resolve, reject) => {
          ws.onopen = resolve;
          ws.onerror = reject;
        });
        let id = 0;
        const pending = new Map<number, (r: any) => void>();
        ws.onmessage = (e) => {
          const msg = JSON.parse(String(e.data));
          pending.get(msg.id)?.(msg);
          pending.delete(msg.id);
        };
        return (method: string, params: object = {}) =>
          new Promise<any>((resolve, reject) => {
            const msgId = ++id;
            pending.set(msgId, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)));
            ws.send(JSON.stringify({ id: msgId, method, params }));
          });
      }
    } catch {
      // VS Code not up yet
    }
    await sleep(500);
  }
  throw new Error("could not reach the VS Code workbench over DevTools");
}

/** Page script: on-screen boxes of the callout words, plus where each word's line ends. */
const findWords = (shot: Shot) => `(() => {
  const lines = [...document.querySelectorAll(".editor-instance .view-lines .view-line")]
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  return ${JSON.stringify(shot.callouts)}.map((c) => {
    let n = 0;
    for (const line of lines) {
      const spans = [...line.querySelectorAll("span > span")];
      for (const span of spans) {
        // Neighbouring tokens with the same color share a span, so find the
        // word inside the span and measure just its characters.
        const text = span.textContent;
        const re = new RegExp("(?<![\\\\w$])" + c.word.replace(/[$.*+?^{}()|[\\]\\\\]/g, "\\\\$&") + "(?![\\\\w$])");
        const m = re.exec(text);
        if (!m || n++ !== c.nth) continue;
        const node = span.firstChild;
        const range = document.createRange();
        range.setStart(node, m.index);
        range.setEnd(node, m.index + c.word.length);
        const r = range.getBoundingClientRect();
        const end = Math.max(...spans.filter((s) => s.textContent.trim()).map((s) => s.getBoundingClientRect().right));
        return { ...c, x: r.left, y: r.top, w: r.width, h: r.height, lineEnd: end };
      }
    }
    return { ...c, missing: true };
  });
})()`;

/** Saves the callout boxes, in PNG pixels, next to the screenshot. */
function writeCallouts(shot: Shot, { result }: { result: { value: any[] } }) {
  const missing = result.value.filter((b) => b.missing).map((b) => b.word);
  if (missing.length) throw new Error(`callout words not on screen: ${missing.join(", ")}`);
  const callouts = result.value.map((b) => ({ ...b, x: b.x * SCALE, y: b.y * SCALE, w: b.w * SCALE, h: b.h * SCALE, lineEnd: b.lineEnd * SCALE }));
  writeFileSync(shot.out.replace(/\.png$/, ".json"), JSON.stringify({ width: shot.width * SCALE, height: shot.height * SCALE, callouts }, null, 2) + "\n");
}

async function capture() {
  const send = await connect();
  for (const [i, shot] of shots.entries()) {
    const ready = join(signals, `ready-${i}`);
    while (!existsSync(ready)) await sleep(200);
    await send("Emulation.setDeviceMetricsOverride", { width: shot.width, height: shot.height, deviceScaleFactor: SCALE, mobile: false });
    await sleep(1500); // let the workbench re-layout at the new size
    // The test window titles itself "[Extension Development Host] …"; users never see that.
    await send("Runtime.evaluate", {
      expression: `(() => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.nodeValue.includes("[Extension Development Host] ")) node.nodeValue = node.nodeValue.replace("[Extension Development Host] ", "");
        }
      })()`,
    });
    await sleep(200);
    if (shot.callouts) writeCallouts(shot, await send("Runtime.evaluate", { returnByValue: true, expression: findWords(shot) }));
    const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    writeFileSync(shot.out, Buffer.from(data, "base64"));
    console.log(`${shot.label} → ${relative(root, shot.out)} (${shot.width * SCALE}×${shot.height * SCALE})`);
    writeFileSync(join(signals, `done-${i}`), "");
  }
  await send("Emulation.clearDeviceMetricsOverride");
}

try {
  await Promise.all([
    runTests({
      extensionDevelopmentPath: root,
      extensionTestsPath: join(import.meta.dirname, "suite.cjs"),
      launchArgs: [workspace, "--disable-extensions", `--remote-debugging-port=${PORT}`],
      extensionTestsEnv: { AUREON_SCREENSHOTS: JSON.stringify({ workspace, signals, shots }) },
    }),
    capture(),
  ]);
} catch (err) {
  console.error(err);
  process.exit(1);
}
