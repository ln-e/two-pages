export class Canvas {

  public root: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.root = canvas;
    this.context = canvas.getContext('2d');

    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';

    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  data() {
    return this.context.canvas.toDataURL('image/png');
  }

  draw(curve) {
    const brush = curve.brush;
    const points = curve.points;

    this.context.beginPath();

    this.context.lineWidth = brush.width;
    this.context.strokeStyle = brush.getRGBA();

    this.context.moveTo(points[0].x, points[0].y);
    this.context.lineTo(points[0].x - 0.5, points[0].y - 0.5);

    for (let i in points) {
      this.context.lineTo(points[i].x, points[i].y);
    }

    this.context.stroke();

    this.context.closePath();
  }
}
