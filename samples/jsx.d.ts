// Minimal JSX typings so the samples type-check without React installed.
declare namespace JSX {
  interface IntrinsicElements {
    [tag: string]: Record<string, unknown>;
  }
}
