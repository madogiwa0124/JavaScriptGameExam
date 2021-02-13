export class Block {
  readonly width: number;
  readonly height: number;
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly strokeColor: string;

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.strokeColor = "black";
  }

  draw(p: p5) {
    p.fill(this.color)
    p.stroke(this.strokeColor)
    p.rect(this.x, this.y, this.width, this.height)
  }
}
