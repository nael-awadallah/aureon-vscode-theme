// Semantic roles in plain JavaScript.

const DEFAULT_NAME = "aureon";

class Palette {
  constructor(name) {
    this.name = name;
    this.colors = new Map();
  }

  add(role, value) {
    this.colors.set(role, value);
    return this;
  }
}

function createPalette(name = DEFAULT_NAME) {
  const palette = new Palette(name);
  let count = 0;
  palette.add("gold", "#E5B567");
  count += palette.colors.size;
  return { palette, count };
}

const { palette } = createPalette();
console.log(palette.name, JSON.stringify([...palette.colors]));
