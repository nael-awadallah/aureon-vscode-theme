import { join } from "node:path";
import sharp from "sharp";

// Renders the Marketplace icon (256×256 PNG) from the brand logo, cropped to
// the rounded frame plus a little of its glow.
const root = join(import.meta.dirname, "..");
const info = await sharp(join(root, "images", "brand", "logo.png"))
  .extract({ left: 72, top: 72, width: 1110, height: 1110 })
  .resize(256, 256, { kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(join(root, "images", "icon.png"));
console.log(`images/icon.png (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
