import { dark } from "./palettes/dark";
import { dusk } from "./palettes/dusk";
import { light } from "./palettes/light";
import type { Palette, Variant } from "./palettes/types";

const family = (id: string, label: string, palette: Palette): Variant[] => [
  { id, label, palette, options: { vivid: false, italics: true } },
  { id: `${id}-vivid`, label: `${label} Vivid`, palette, options: { vivid: true, italics: true } },
];

// Every theme shipped in package.json.
export const variants: Variant[] = [
  ...family("aureon-dark", "Aureon Dark", dark),
  ...family("aureon-dusk", "Aureon Dusk", dusk),
  ...family("aureon-light", "Aureon Light", light),
];
