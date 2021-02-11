import { Block } from './Block'

export class Tetrimino {
  static readonly O = [
    [0, 1, 1, 0],
    [0, 1, 1, 0]
  ] as const
  static readonly S = [
    [0, 1, 1, 0],
    [1, 1, 0, 0]
  ] as const
  static readonly Z = [
    [0, 1, 1, 0],
    [0, 0, 1, 1]
  ] as const
  static readonly J = [
    [1, 0, 0, 0],
    [1, 1, 1, 0]
  ] as const
  static readonly L = [
    [1, 1, 1, 0],
    [1, 0, 0, 0]
  ] as const
  static readonly T = [
    [0, 1, 0, 0],
    [1, 1, 1, 0]
  ] as const
  static readonly I = [[1, 1, 1, 1], [0, 0, 0, 0]] as const
  static readonly LIST = [Tetrimino.O, Tetrimino.S, Tetrimino.Z, Tetrimino.J, Tetrimino.L, Tetrimino.T, Tetrimino.I]

  blocks: Block[];
  readonly minoMap: ReadonlyArray<readonly number[]>;
  private readonly rows: number[]
  private readonly cols: number[]
  private readonly blockWidth: number
  private readonly blockHeight: number

  constructor(minoMap: ReadonlyArray<readonly number[]>, rows: number, cols: number, blockWidth: number, blockHeight: number) {
    this.minoMap = minoMap
    this.rows = [...Array(rows).keys()]
    this.cols = [...Array(cols).keys()]
    this.blockWidth = blockWidth
    this.blockHeight = blockHeight
    this.blocks = []
  }

  static randomMap() {
    const randIndex = Math.floor(Math.random() * Tetrimino.LIST.length);
    return Tetrimino.LIST[randIndex]
  }

  draw(p: p5, x:number, y: number) {
    this.buildBlocks(x, y)
    for (const block of this.blocks) { block.draw(p) }
  }

  private buildBlocks(x:number, y: number) {
    this.blocks = this.rows.flatMap(row => {
      return this.cols.flatMap(col => {
        if (this.blockExists(row, col)) return this.buildBlock(col, row, x, y)
      }).filter((val): val is Block => typeof(val) !== 'undefined')
    })
  }

  private buildBlock(col: number, row: number, x:number, y: number): Block {
    return new Block((x + col) * this.blockWidth, (y + row) * this.blockHeight, this.blockWidth, this.blockHeight)
  }

  private blockExists(row: number, col: number): boolean {
    return !!(this.minoMap[row] && this.minoMap[row][col])
  }
}
