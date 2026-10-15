import type { Palette } from "../src/palettes/types";

export type Role = keyof Palette["syntax"];

/**
 * [word, occurrence, semantic role, TextMate role]
 *
 * `occurrence` counts whole-word matches from the top of the file (0-based).
 * The semantic role is what the language server should produce. Use `null` for
 * files or tokens without semantic support. The TextMate role is the fallback
 * color before the language server answers (or for languages without one).
 * `null` skips that check.
 */
export type Expectation = [word: string, occurrence: number, semantic: Role | null, textmate: Role | null];

export const expectations: Record<string, Expectation[]> = {
  "semantic.ts": [
    ["MAX_RETRIES", 0, "variable", "variable"], // module const stays neutral
    ["Level", 0, "type", "type"], // enum declaration
    ["Low", 0, "constant", "constant"], // enum member declaration
    ["Shape", 0, "interface", "interface"], // interface declaration
    ["id", 0, "property", "property"], // interface property
    ["area", 0, "function", "function"], // interface method
    ["ShapeList", 0, "type", "type"], // type alias
    ["T", 0, "interface", "type"], // type parameter (TextMate can't tell it from a type)
    ["Shape", 1, "interface", "type"], // constraint: T extends Shape
    ["logged", 0, "function", "function"], // function declaration
    ["target", 0, "parameter", "parameter"], // parameter declaration
    ["target", 1, "parameter", "variable"], // parameter reference
    ["Circle", 0, "type", "type"], // class declaration
    ["Shape", 2, "interface", "type"], // implements clause
    ["radius", 0, "property", "property"], // class field
    ["radius", 1, "parameter", "parameter"], // constructor parameter
    ["radius", 2, "property", "property"], // this.radius = …
    ["radius", 3, "parameter", "variable"], // … = radius
    ["logged", 1, "function", "function"], // decorator use
    ["area", 1, "function", "function"], // method declaration
    ["Math", 0, "variable", "variable"], // built-in object
    ["PI", 0, "property", "property"], // built-in readonly property
    ["totalArea", 0, "function", "function"],
    ["shapes", 0, "parameter", "parameter"],
    ["total", 0, "variable", "variable"], // let
    ["factor", 0, "variable", "variable"], // local const
    ["Level", 2, "type", "variable"], // Level.High
    ["High", 1, "constant", "property"], // enum member reference
    ["shape", 1, "variable", "variable"],
    ["area", 2, "function", "function"], // method call
    ["circle", 0, "variable", "variable"],
    ["Circle", 1, "type", "type"], // new Circle(…)
    ["totalArea", 1, "function", "function"], // function call
    ["console", 0, "variable", "variable"],
    ["log", 0, "function", "function"],
    ["resolve", 0, "function", "function"],
    ["value", 0, "parameter", "parameter"],
    ["value", 1, "parameter", "variable"],
  ],

  "semantic.js": [
    ["DEFAULT_NAME", 0, "variable", "variable"],
    ["Palette", 0, "type", "type"],
    ["name", 0, "parameter", "parameter"],
    ["name", 1, null, "property"], // this.name — untyped JS: no semantic token
    ["name", 2, "parameter", "variable"],
    ["colors", 0, null, "property"],
    ["Map", 0, "type", "type"], // new Map()
    ["add", 0, "function", "function"], // method declaration
    ["set", 0, "function", "function"], // method call
    ["createPalette", 0, "function", "function"],
    ["palette", 0, "variable", "variable"],
    ["count", 0, "variable", "variable"],
    ["add", 1, "function", "function"],
    ["size", 0, "property", "property"],
    ["JSON", 0, "variable", null],
    ["stringify", 0, "function", "function"],
  ],

  "Component.tsx": [
    ["ButtonProps", 0, "interface", "interface"],
    ["label", 0, "property", "property"],
    ["onPress", 0, "function", "function"],
    ["Button", 0, "function", "function"],
    ["props", 0, "parameter", "parameter"],
    ["label", 1, "variable", null], // destructured local
    ["button", 0, null, "tag"],
    ["className", 0, null, "attribute"],
    ["onPress", 1, "function", "property"], // props.onPress
    ["Toolbar", 0, "function", "function"],
    ["handlePress", 0, "function", "function"],
    ["div", 0, null, "tag"],
    ["Button", 1, null, "function"], // <Button /> — JSX tag names get no semantic token
  ],

  "component.jsx": [
    ["Badge", 0, "function", "function"],
    ["props", 0, "parameter", "parameter"],
    ["text", 0, "variable", "variable"],
    ["count", 0, null, "property"], // props.count on an untyped prop
    ["String", 0, "type", null], // built-in class
    ["span", 0, null, "tag"],
    ["Header", 0, "function", "function"],
    ["Badge", 1, null, "function"],
  ],

  "palette.json": [
    ["name", 0, null, "property"],
    ["version", 0, null, "property"],
    ["true", 0, null, "constant"],
    ["null", 0, null, "constant"],
  ],

  "styles.css": [
    ["--gold", 0, null, "variable"],
    ["card", 0, null, "function"],
    ["h1", 0, null, "tag"],
    ["hover", 0, null, "keyword"],
    ["color", 0, null, "property"],
    ["var", 0, null, "function"],
    ["monospace", 0, null, "constant"],
    ["auto", 0, null, "constant"],
    ["media", 0, null, "keyword"],
  ],

  "index.html": [
    ["section", 1, null, "tag"],
    ["class", 0, null, "attribute"],
    ["hero", 1, null, "string"],
    ["querySelector", 0, null, "function"],
  ],

  "UserController.php": [
    ["UserController", 0, null, "type"],
    ["Controller", 0, null, "type"], // extends Controller
    ["PER_PAGE", 0, null, "constant"],
    ["$users", 0, null, "parameter"], // promoted property parameter
    ["index", 0, null, "function"],
    ["Request", 1, null, "type"], // type hint
    ["$request", 0, null, "parameter"],
    ["$query", 0, null, "variable"],
    ["where", 0, null, "function"], // method call
    ["response", 0, null, "function"], // function call
    ["$this", 0, null, "keyword"],
    ["users", 1, null, "property"], // $this->users
    ["int", 0, null, "type"],
    ["Route", 0, null, "decorator"],
  ],

  "README.md": [
    ["samples", 0, null, "function"], // heading
    ["link", 0, null, "type"], // link text
    ["struck", 0, null, "comment"], // strikethrough
    ["ts", 0, null, "keyword"], // fence language
  ],

  "config.yaml": [
    ["name", 0, null, "property"], // key
    ["2", 0, null, "constant"],
    ["true", 0, null, "constant"],
    ["dark", 0, null, "string"], // unquoted value
    ["defaults", 1, null, "type"], // &anchor
    ["defaults", 2, null, "type"], // *alias
  ],

  ".env": [
    ["APP_NAME", 0, null, "property"], // key
    ["Aureon", 0, null, "string"], // value
    ["APP_PORT", 1, null, "property"], // ${APP_PORT}
    ["export", 0, null, "keyword"],
  ],

  "palette.py": [
    ["HEX", 0, null, "constant"],
    ["Palette", 0, null, "type"], // class declaration
    ["add", 0, null, "function"], // method declaration
    ["self", 0, null, "keyword"],
    ["role", 0, null, "parameter"],
    ["str", 0, null, "type"],
    ["match", 0, null, "function"],
    ["ValueError", 0, null, "type"],
    ["property", 0, null, "function"], // @property
    ["len", 0, null, "function"],
    ["colors", 3, null, "property"], // len(self.colors)
    ["build", 0, null, "function"],
    ["True", 0, null, "constant"],
  ],
};
