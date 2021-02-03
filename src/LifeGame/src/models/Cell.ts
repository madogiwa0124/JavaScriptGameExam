export class Cell {
  alive: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  color: number[]
  strokeColor: number[]

  static readonly DEFAULT_COLOR = [0, 51, 153]
  static readonly DEFAULT_STROKE_COLOR = [255, 255, 255]
  static readonly ALIVE_TO_DEAD_CELL_COUNTS = [2,3]
  static readonly DEAD_TO_ALIVE_CELL_COUNTS = [3]

  constructor(alive: boolean, x: number, y: number, width: number, height: number) {
    this.alive = alive
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = Cell.DEFAULT_COLOR
    this.strokeColor = Cell.DEFAULT_STROKE_COLOR
  }

  nextAlive(aroundLivingCellCount: number): boolean {
    if(this.alive) {
      return Cell.ALIVE_TO_DEAD_CELL_COUNTS.includes(aroundLivingCellCount)
    } else {
      return Cell.DEAD_TO_ALIVE_CELL_COUNTS.includes(aroundLivingCellCount)
    }
  }

  draw(p: p5) {
    p.fill(this.color)
    p.stroke(this.strokeColor)
    p.rect(this.width * this.x, this.height * this.y, this.width, this.height)
  }
}
