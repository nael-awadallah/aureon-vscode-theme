import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

// Composes images/hero.png for the README from the brand logo and the real
// screenshots (run `npm run screenshots` first).
const root = join(import.meta.dirname, "..");
const data = (path: string) => `data:image/png;base64,${readFileSync(join(root, "images", path)).toString("base64")}`;

const W = 2400;
const H = 1600;
const SANS = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const GOLD = "#E5B567";

let shots = 0;

/** A screenshot with rounded corners, a soft shadow and a thin accent border. */
const screenshot = (file: string, x: number, y: number, w: number, accent: string, glow = false) => {
  const h = w * (2000 / 3200);
  const id = `shot${++shots}`;
  return `
  ${glow ? `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="30" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="3" filter="url(#glow)"/>` : ""}
  <g filter="url(#shadow)">
    <clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath>
    <image href="${data(`screenshots/${file}`)}" x="${x}" y="${y}" width="${w}" height="${h}" clip-path="url(#clip-${id})" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="21" fill="none" stroke="${accent}" stroke-opacity="0.45" stroke-width="2"/>`;
};

// Feature tiles: a line icon in a framed square, a title and two lines of copy.
const icons = {
  code: `<path d="M-14 -16 L-30 0 L-14 16 M14 -16 L30 0 L14 16" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  palette: `<path d="M0 -30 C 18 -30 32 -18 32 -2 C 32 10 22 12 14 10 C 6 8 2 14 6 20 C 10 26 4 32 -4 30 C -20 28 -32 14 -32 -2 C -32 -18 -18 -30 0 -30 Z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="-14" cy="-6" r="4.5" fill="${GOLD}"/><circle cx="-2" cy="-18" r="4.5" fill="${GOLD}"/><circle cx="14" cy="-12" r="4.5" fill="${GOLD}"/>`,
  sun: `<circle r="13" fill="${GOLD}"/>${[0, 45, 90, 135, 180, 225, 270, 315]
    .map((a) => `<line x1="0" y1="-21" x2="0" y2="-31" transform="rotate(${a})" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>`)
    .join("")}`,
  eye: `<path d="M-32 0 C -20 -20 20 -20 32 0 C 20 20 -20 20 -32 0 Z" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linejoin="round"/><circle r="9" fill="${GOLD}"/>`,
};
const feature = (x: number, icon: keyof typeof icons, title: string[], copy: string[]): string => `
  <g transform="translate(${x} 724)">
    <rect width="96" height="96" rx="20" fill="#1A1714" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="2"/>
    <g transform="translate(48 48) scale(0.92)">${icons[icon]}</g>
    ${title.map((t, i) => `<text x="0" y="${142 + i * 36}" font-family="${SANS}" font-size="29" font-weight="600" fill="#F2ECE2">${t}</text>`).join("")}
    ${copy.map((t, i) => `<text x="0" y="${142 + title.length * 36 + 4 + i * 31}" font-family="${SANS}" font-size="23" fill="#958D82">${t}</text>`).join("")}
  </g>`;

// Variant cards along the bottom.
const card = (
  x: number,
  v: { file: string; name: string; copy: string; bg: string; border: string; title: string; text: string; mark: string; swatches: string[] },
) => {
  const w = 768;
  const y = 992;
  const h = 596;
  const swatches = v.swatches.map((c, i) => `<circle cx="${w - 140 + i * 46}" cy="${h - 82}" r="17" fill="${c}" stroke="#00000033" stroke-width="1.5"/>`).join("");
  return `
  <g transform="translate(${x} 0)">
    <rect x="0" y="${y}" width="${w}" height="${h}" rx="26" fill="${v.bg}" stroke="${v.border}" stroke-opacity="0.6" stroke-width="2"/>
    ${screenshot(v.file, 16, y + 16, w - 32, v.border)}
    <g transform="translate(58 ${y + h - 62})">${v.mark}</g>
    <text x="108" y="${y + h - 70}" font-family="${SANS}" font-size="36" font-weight="600" fill="${v.title}">${v.name}</text>
    <text x="108" y="${y + h - 32}" font-family="${SANS}" font-size="22" fill="${v.text}">${v.copy}</text>
    <g transform="translate(0 ${y})">${swatches}</g>
  </g>`;
};

const crescent = (fill: string, cut: string) => `<circle r="30" fill="${fill}"/><circle cx="12" cy="-8" r="26" fill="${cut}"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#1B1814"/>
      <stop offset="1" stop-color="#0B0A09"/>
    </linearGradient>
    <radialGradient id="warm" cx="0.78" cy="0.08" r="0.55">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset="0.6" stop-color="#F6D696" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="title" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F8DFA6"/>
      <stop offset="0.55" stop-color="#E5B567"/>
      <stop offset="1" stop-color="#B8893F"/>
    </linearGradient>
    <linearGradient id="divider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset="0.5" stop-color="${GOLD}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="logo-fade" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.8" stop-color="#fff"/>
      <stop offset="1" stop-color="#000"/>
    </radialGradient>
    <mask id="logo-mask"><rect x="40" y="40" width="330" height="330" fill="url(#logo-fade)"/></mask>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="135%">
      <feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#000" flood-opacity="0.6"/>
    </filter>
    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#warm)"/>
  <g opacity="0.7">
    <polygon points="1500,0 1640,0 2400,520 2400,600" fill="url(#streak)" opacity="0.35"/>
    <polygon points="1900,0 1960,0 2400,330 2400,370" fill="url(#streak)" opacity="0.5"/>
    <polygon points="900,0 940,0 1500,960 1470,960" fill="url(#streak)" opacity="0.12"/>
  </g>

  <!-- Brand -->
  <image href="${data("brand/logo.png")}" x="40" y="40" width="330" height="330" mask="url(#logo-mask)"/>
  <text x="392" y="250" font-family="${SANS}" font-size="196" font-weight="600" letter-spacing="-2" fill="url(#title)">Aureon</text>
  <text x="400" y="322" font-family="${SANS}" font-size="38" letter-spacing="19" fill="#A39B8F">VS CODE THEME</text>

  <text x="86" y="480" font-family="${SANS}" font-size="66" fill="#F2ECE2">A refined theme family</text>
  <text x="86" y="560" font-family="${SANS}" font-size="66" fill="#F2ECE2">for <tspan font-weight="700" fill="url(#title)">focused development.</tspan></text>
  <text x="86" y="636" font-family="${SANS}" font-size="33" fill="${GOLD}">Dark, Dusk and Light, <tspan fill="#B5ADA2">with semantic highlighting, a fully</tspan></text>
  <text x="86" y="680" font-family="${SANS}" font-size="33" fill="#B5ADA2">themed UI, and a clean, elegant design.</text>

  ${feature(86, "code", ["Semantic Colors"], ["Functions, types and", "params at a glance"])}
  ${feature(346, "palette", ["Fully Themed UI"], ["820+ colors, from", "editor to chat"])}
  ${feature(606, "sun", ["3 Variants"], ["Dark, Dusk, Light,", "+ Vivid, No Italics"])}
  ${feature(846, "eye", ["Built for Focus"], ["WCAG-checked,", "easy on the eyes"])}

  <!-- Main screenshot -->
  ${screenshot("aureon-dark-vivid.png", 1104, 70, 1250, GOLD, true)}

  <rect x="0" y="970" width="${W}" height="2" fill="url(#divider)"/>

  ${card(20, {
    file: "aureon-dark-vivid.png",
    name: "Aureon Dark",
    copy: "The signature look. Deep dark with warm gold accents.",
    bg: "#141311",
    border: GOLD,
    title: "#F2ECE2",
    text: "#A39B8F",
    mark: crescent(GOLD, "#141311"),
    swatches: [GOLD, "#2B2824", "#D9D2C7"],
  })}
  ${card(816, {
    file: "aureon-dusk-vivid.png",
    name: "Aureon Dusk",
    copy: "A cool alternative. Deep dark with teal and violet.",
    bg: "#0F1117",
    border: "#4FD1C5",
    title: "#E6E9EE",
    text: "#9AA3B0",
    mark: crescent("#4FD1C5", "#0F1117"),
    swatches: ["#4FD1C5", "#252C36", "#A78BFA"],
  })}
  ${card(1612, {
    file: "aureon-light-vivid.png",
    name: "Aureon Light",
    copy: "Warm paper with deep amber, made for daylight.",
    bg: "#FAF9F7",
    border: "#D9A35B",
    title: "#2D2B28",
    text: "#625D56",
    mark: `<circle r="30" fill="#E3A24A"/><path d="M0 -30 A30 30 0 0 1 0 30 Z" fill="#F3E2C6"/>`,
    swatches: ["#C9771F", "#E8DFD3", "#2F6FB0"],
  })}
</svg>`;

const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: "Segoe UI" } }).render().asPng();
writeFileSync(join(root, "images", "hero.png"), png);
console.log(`images/hero.png (${W}×${H}, ${Math.round(png.length / 1024)} KB)`);
