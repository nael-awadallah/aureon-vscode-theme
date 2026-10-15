/** Offset of the nth whole-word match of `word` in `text`, or -1. */
export function locate(text: string, word: string, occurrence: number): number {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![\\w$-])${escaped}(?!\\w|-[\\w-])`, "g");
  let match: RegExpExecArray | null;
  let n = 0;
  while ((match = re.exec(text))) {
    if (n++ === occurrence) return match.index;
  }
  return -1;
}
