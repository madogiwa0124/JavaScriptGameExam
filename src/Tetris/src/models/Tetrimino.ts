import { Block } from './Block'
import { rowColLoop } from '../common/common'
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
  private readonly blockWidth: number
  private readonly blockHeight: number

  constructor(minoMap: ReadonlyArray<readonly number[]>, blockWidth: number, blockHeight: number) {
    this.minoMap = minoMap
    this.blockWidth = blockWidth
    this.blockHeight = blockHeight
    this.blocks = []
  }

  static randomMap() {
    const randIndex = Math.floor(Math.random() * Tetrimino.LIST.length);
    return Tetrimino.LIST[randIndex]
  }

  draw(p: p5, x:number, y: number, rows: number, cols: number) {
    this.buildBlocks(x, y, rows, cols)
    for (const block of this.blocks) { block.draw(p) }
  }

  canMove(nextX: number, nextY: number, MaxY: number, fields: number[][]): boolean {
    let result = true
    rowColLoop(this.minoMap.length, this.minoMap[0].length, (y: number, x: number) => {
      if (this.minoMap[y][x]) {
        const nextUnderGraund = nextY + y >= MaxY
        const nextExitsBlock = fields[nextY + y] && fields[nextY + y][nextX + x]
        if (nextUnderGraund || nextExitsBlock) result = false;
      }
    })
    return result;
  }

  private buildBlocks(x:number, y: number, rows: number, cols: number) {
    this.blocks = []
    rowColLoop(rows, cols, (rowIndex, colIndex) => {
      if (this.blockExists(rowIndex, colIndex) && this.buildBlock(colIndex, rowIndex, x, y)) {
        this.blocks.push(this.buildBlock(colIndex, rowIndex, x, y))
      }
    })
  }

  private buildBlock(colIndex: number, rowIndex: number, x:number, y: number): Block {
    return new Block((x + colIndex) * this.blockWidth, (y + rowIndex) * this.blockHeight, this.blockWidth, this.blockHeight)
  }

  private blockExists(rowIndex: number, colIndex: number): boolean {
    return !!(this.minoMap[rowIndex] && this.minoMap[rowIndex][colIndex])
  }
}
