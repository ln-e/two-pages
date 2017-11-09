export class Brush {
  constructor(
    public width: number,
    public color: string,
    public opacity: number,
  ) { }

  public getRGBA(): string {
    let c = this.color.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const number: number = parseInt('0x' + c.join(''), 16);

    return 'rgba(' + [(number >> 16) & 255, (number >> 8) & 255, number & 255].join(',') + ',' +  this.opacity + ')';
  }
}
