export class Point {
  public static fromJson(data) {
    const parts = data.split(';');
    return new Point(parts[0], parts[1]);
  }

  constructor(
    public x,
    public y
  ) { }

  public toJson() {
    return this.x + ';' + this.y;
  }
}
