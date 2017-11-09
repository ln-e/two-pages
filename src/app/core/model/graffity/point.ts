export class Point {
  constructor(
    public x,
    public y
  ) { }

  public asString() {
    return this.x + ';' + this.y;
  }
}
