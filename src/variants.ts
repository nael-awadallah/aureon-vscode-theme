import { dark } from "./palettes/dark";
import type { Variant } from "./palettes/types";

// Every theme shipped in package.json.
export const variants: Variant[] = [
  { id: "aureon-dark", label: "Aureon Dark", palette: dark, options: { vivid: false, italics: true } },
  { id: "aureon-dark-vivid", label: "Aureon Dark Vivid", palette: dark, options: { vivid: true, italics: true } },
];
