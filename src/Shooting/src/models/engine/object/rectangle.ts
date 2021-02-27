export class Rectangle implements IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  hitTest(other: IRectangle): boolean {
    const horizontal = other.x < this.x + this.width && this.x < other.x + other.width;
    const vertical = other.y < this.y + this.height && this.y < other.y + other.height;
    return horizontal && vertical;
  }
}
