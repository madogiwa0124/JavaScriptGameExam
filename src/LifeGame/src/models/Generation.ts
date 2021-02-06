import { Cell } from "./Cell"
import { MapCollection } from "./MapCollection"
import { outOfDrawableRange, AroundPositions } from "../common/common"

export class Generation {
  height: number
  width: number
  cells: Cell[]
  static readonly INITIAL_CELL_MAP = MapCollection.random(30, 30)
  static readonly COLS = Generation.INITIAL_CELL_MAP.COLS
  static readonly ROWS = Generation.INITIAL_CELL_MAP.ROWS
  static readonly LENGTH = Generation.COLS * Generation.ROWS

  constructor(height: number, width: number, cellMap=Generation.INITIAL_CELL_MAP.MAP) {
    this.width = width
    this.height = height
    this.cells = this.buildCells(cellMap)
  }

  draw(p: p5) {
    const alivingCells = this.cells.filter(cell => cell.alive)
    for(let cell of alivingCells) { cell.draw(p) }
  }

  next(): Generation {
    const nextCellMap: number[] = this.cells.map((cell, index) => {
      return Number(cell.nextAlive(this.livesAroundCellsCount(...this.indexToPosition(index))))
    })
    return new Generation(this.height, this.width, nextCellMap)
  }

  private livesAroundCellsCount(x: number, y: number): number {
    return AroundPositions(x,y).map(AroundPosition => {
      const index = this.positionToIndex(...AroundPosition)
      return (index === -1) ? 0 : Number(this.cells[index].alive)
    }).reduce((sum, num) => sum + num)
  }

  private positionToIndex(x: number, y: number): number {
    if(outOfDrawableRange(x, y, Generation.COLS,  Generation.ROWS)) return -1
    return y * Generation.COLS + x
  }

  private indexToPosition(i: number): [number, number] {
    const x = i % Generation.COLS;
    const y = Math.floor(i / Generation.COLS);
    return [x, y]
  }

  private buildCells(cellMap: number[]): Cell[] {
    return cellMap.map((value, index) => this.buildCell(index, value))
  }

  private buildCell(index: number, value: number): Cell {
    const [x, y] = this.indexToPosition(index)
    const w = Math.floor(this.width / Generation.COLS);
    const h = Math.floor(this.height / Generation.ROWS);
    return new Cell(!!value, x, y, w, h)
  }
}
