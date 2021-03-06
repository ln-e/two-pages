import { Brush } from './brush';
import { Point } from './point';

export class Curve {
  public brush: Brush;
  public points: Point[];

  public static fromJson(data: string): Curve {
    const object = JSON.parse(data);
    const curve = new Curve(new Brush(object.brush.width, object.brush.color, object.brush.opacity));
    curve.points = object.points.map((pointData: string) => Point.fromJson(pointData));

    return curve;
  }

  constructor(brush: Brush) {
    this.brush = brush;
    this.points = [];
  }

  public push(point: Point) {
    this.points.push(point);
  }

  public optimize() {
    for (let i = 0; i < this.points.length - 2; i++) {
      const point1 = this.points[i];
      const point2 = this.points[i + 1];
      const point3 = this.points[i + 2];

      // если две соседние точки одинаковые, удаляем одну из них
      if (point1.x === point2.x && point1.y === point2.y) {
        this.points.splice(i + 1, 1);
        i--;
        continue;
      }

      // если точки лежат на одной прямой, удаляем центральную точку
      if ((point3.x - point1.x) / (point2.x - point1.x) === (point3.y - point1.y) / (point2.y - point1.y)) {
        this.points.splice(i + 1, 1);
        i--; // еще раз проверяем начиная с этой же точки
      }
    }
  }

  public toJson() {
    return JSON.stringify({
      brush: this.brush,
      points: this.points.map((point: Point) => point.toJson()),
    });
  }
}
