import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

// Renders images/icon.svg to the Marketplace icon (256×256 PNG).
const root = join(import.meta.dirname, "..");
const svg = readFileSync(join(root, "images", "icon.svg"));
const png = new Resvg(svg, { fitTo: { mode: "width", value: 256 } }).render().asPng();
writeFileSync(join(root, "images", "icon.png"), png);
console.log(`images/icon.png (${png.length} bytes)`);
