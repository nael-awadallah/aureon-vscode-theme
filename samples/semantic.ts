// Semantic roles: declarations and references should match.

const MAX_RETRIES = 3;

enum Level {
  Low = "low",
  High = "high",
}

interface Shape {
  readonly id: string;
  area(): number;
}

type ShapeList<T extends Shape> = Array<T>;

function logged(target: unknown, context: ClassMethodDecoratorContext) {
  return target;
}

class Circle implements Shape {
  readonly id: string;
  radius: number;

  constructor(id: string, radius: number) {
    this.id = id;
    this.radius = radius;
  }

  @logged
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

function totalArea<T extends Shape>(shapes: ShapeList<T>, level: Level): number {
  let total = 0;
  const factor = level === Level.High ? 2 : 1;
  for (const shape of shapes) {
    total += shape.area() * factor;
  }
  return total;
}

const circle = new Circle("c1", 4);
circle.radius = 5;
const result = totalArea([circle], Level.Low);
console.log(`Area: ${result} after ${MAX_RETRIES} tries`, /\d+/g.test("42"));
Promise.resolve(result).then((value) => value * 2);
