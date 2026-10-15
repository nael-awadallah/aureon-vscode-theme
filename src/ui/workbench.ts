import type { Palette, VariantOptions } from "../palettes/types";
import { base } from "./base";
import { chrome } from "./chrome";
import { context, type Colors } from "./context";
import { editor } from "./editor";
import { lists } from "./lists";
import { scm } from "./scm";
import { symbols } from "./symbols";
import { terminal } from "./terminal";
import { tools } from "./tools";

const areas = [base, chrome, lists, editor, scm, terminal, symbols, tools];

// Workbench colors, one file per area. A key defined twice is a mistake.
export function workbench(p: Palette, o: VariantOptions): Colors {
  const ctx = context(p, o);
  const colors: Colors = {};
  for (const area of areas) {
    for (const [key, value] of Object.entries(area(ctx))) {
      if (key in colors) throw new Error(`Workbench color "${key}" is defined twice (${area.name})`);
      colors[key] = value;
    }
  }
  return colors;
}
