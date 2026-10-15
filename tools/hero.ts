import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

// Composes images/hero.png for the README from the real screenshots
// (run `npm run screenshots` first).
const root = join(import.meta.dirname, "..");
const img = (name: string) => `data:image/png;base64,${readFileSync(join(root, "images", name)).toString("base64")}`;
const icon = readFileSync(join(root, "images", "icon.svg"), "utf8").replace(/<svg[^>]*>/, "").replace("</svg>", "");

const W = 2400;
const H = 1260;
const shotW = 1360;
const shotH = shotW * (2000 / 3200);

const shot = (file: string, x: number, y: number) => `
  <g filter="url(#shadow)">
    <clipPath id="clip-${file}"><rect x="${x}" y="${y}" width="${shotW}" height="${shotH}" rx="18"/></clipPath>
    <image href="${img(`screenshots/${file}`)}" x="${x}" y="${y}" width="${shotW}" height="${shotH}" clip-path="url(#clip-${file})"/>
    <rect x="${x + 0.75}" y="${y + 0.75}" width="${shotW - 1.5}" height="${shotH - 1.5}" rx="18" fill="none" stroke="#E5B567" stroke-opacity="0.22" stroke-width="1.5"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1D1A16"/>
      <stop offset="1" stop-color="#0E0D0B"/>
    </linearGradient>
    <radialGradient id="hero-glow" cx="0.18" cy="0.3" r="0.6">
      <stop offset="0" stop-color="#E5B567" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#E5B567" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6D696"/>
      <stop offset="1" stop-color="#C9963F"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#hero-bg)"/>
  <rect width="${W}" height="${H}" fill="url(#hero-glow)"/>

  <svg x="120" y="150" width="150" height="150" viewBox="0 0 512 512">${icon}</svg>
  <text x="120" y="440" font-family="Georgia, 'Times New Roman', serif" font-size="150" fill="url(#title)">Aureon</text>
  <text x="126" y="510" font-family="'Segoe UI', sans-serif" font-size="34" letter-spacing="14" fill="#A39B8F">VS CODE THEME</text>
  <text x="124" y="640" font-family="'Segoe UI', sans-serif" font-size="38" fill="#D9D2C7">A refined theme family for</text>
  <text x="124" y="692" font-family="'Segoe UI', sans-serif" font-size="38" fill="#D9D2C7">focused development.</text>
  <g font-family="'Segoe UI', sans-serif" font-size="30">
    <circle cx="136" cy="806" r="9" fill="#E5B567"/><text x="162" y="816" fill="#D9D2C7">Dark</text>
    <circle cx="136" cy="866" r="9" fill="#4FD1C5"/><text x="162" y="876" fill="#D9D2C7">Dusk</text>
    <circle cx="136" cy="926" r="9" fill="#F3F1ED"/><text x="162" y="936" fill="#D9D2C7">Light</text>
  </g>
  <text x="124" y="1090" font-family="'Segoe UI', sans-serif" font-size="28" fill="#6B645A">Semantic highlighting · WCAG-checked</text>

  ${shot("aureon-light.png", 980, 100)}
  ${shot("aureon-dusk.png", 900, 330)}
  ${shot("aureon-dark.png", 820, 560)}
</svg>`;

const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: "Segoe UI" } }).render().asPng();
writeFileSync(join(root, "images", "hero.png"), png);
console.log(`images/hero.png (${W}×${H}, ${Math.round(png.length / 1024)} KB)`);
