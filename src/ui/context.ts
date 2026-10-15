import { alpha, mix } from "../color";
import type { Palette, VariantOptions } from "../palettes/types";

export type Colors = Record<string, string>;

/** Everything an area mapping needs, so each file stays declarative. */
export interface Ctx {
  p: Palette;
  o: VariantOptions;
  /** The variant's UI accent at an alpha, 0..1. */
  tint: (a: number) => string;
  /** Primary text at an alpha: the neutral wash for hovers and fills. */
  wash: (a: number) => string;
  alpha: typeof alpha;
  mix: typeof mix;
  none: string;
}

export const context = (p: Palette, o: VariantOptions): Ctx => ({
  p,
  o,
  tint: (a) => alpha(p.accent.base, a),
  wash: (a) => alpha(p.text.primary, a),
  alpha,
  mix,
  none: "#00000000",
});
