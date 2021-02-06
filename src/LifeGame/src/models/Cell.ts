export class Cell {
  alive: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  color: number[]
  strokeColor: number[]

  static readonly DEFAULT_STROKE_COLOR = [255, 255, 255]
  static readonly ALIVE_TO_DEAD_CELL_COUNTS = [2,3]
  static readonly DEAD_TO_ALIVE_CELL_COUNTS = [3]

  static readonly DEPOPULATION_CELL_COUNTS = [0, 1]
  static readonly DEPOPULATION_COLOR = [227, 255, 227]

  static readonly MODERATE_CELL_COUNTS = [2, 3]
  static readonly MODERATE_COLOR = [157, 237, 157]

  static readonly OVERCROWDING_COUNTS = [4, 5]
  static readonly OVERCROWDING_COLOR = [54, 179, 54]

  static readonly SUPER_OVERCROWDING_COUNTS = [6, 7, 8]
  static readonly SUPER_OVERCROWDING_COLOR = [10, 99, 10]

  constructor(alive: boolean, x: number, y: number, width: number, height: number) {
    this.alive = alive
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = Cell.DEPOPULATION_COLOR
    this.strokeColor = Cell.DEFAULT_STROKE_COLOR
  }

  nextAlive(aroundLivingCellCount: number): boolean {
    if(this.alive) {
      return Cell.ALIVE_TO_DEAD_CELL_COUNTS.includes(aroundLivingCellCount)
    } else {
      return Cell.DEAD_TO_ALIVE_CELL_COUNTS.includes(aroundLivingCellCount)
    }
  }

  setColor(aroundLivingCellCount: number): void {
    if(Cell.DEPOPULATION_CELL_COUNTS.includes(aroundLivingCellCount))  this.color = this.color = Cell.DEPOPULATION_COLOR
    if(Cell.MODERATE_CELL_COUNTS.includes(aroundLivingCellCount))      this.color = Cell.MODERATE_COLOR
    if(Cell.OVERCROWDING_COUNTS.includes(aroundLivingCellCount))       this.color = Cell.OVERCROWDING_COLOR
    if(Cell.SUPER_OVERCROWDING_COUNTS.includes(aroundLivingCellCount)) this.color = Cell.SUPER_OVERCROWDING_COLOR
  }

  draw(p: p5) {
    p.fill(this.color)
    p.stroke(this.strokeColor)
    p.rect(this.width * this.x, this.height * this.y, this.width, this.height)
  }
}
