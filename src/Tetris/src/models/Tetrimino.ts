import { Block } from './Block'
import { rowColLoop } from '../common/common'
export class Tetrimino {
  static readonly O = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly S = [
    [0, 0, 0, 0],
    [0, 2, 2, 0],
    [2, 2, 0, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly Z = [
    [0, 0, 0, 0],
    [0, 3, 3, 0],
    [0, 0, 3, 3],
    [0, 0, 0, 0],
  ] as const
  static readonly J = [
    [0, 0, 0, 0],
    [4, 0, 0, 0],
    [4, 4, 4, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly L = [
    [0, 0, 0, 0],
    [5, 5, 5, 0],
    [5, 0, 0, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly T = [
    [0, 0, 0, 0],
    [0, 6, 0, 0],
    [6, 6, 6, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly I = [
    [0, 0, 0, 0],
    [7, 7, 7, 7],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ] as const
  static readonly LIST = [Tetrimino.O, Tetrimino.S, Tetrimino.Z, Tetrimino.J, Tetrimino.L, Tetrimino.T, Tetrimino.I]
  static readonly COLORS = ["cyan", "yellow", "green", "red", "blue", "orange", "magenta"];

  blocks: Block[];
  minoMap: ReadonlyArray<readonly number[]>;
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

  rotate() {
    // NOTE: minoMapと行数列数をあわせた[[], [], [], []]で初期化
    let rotated: number[][] = this.minoMap.map(() => []);
    rowColLoop(this.minoMap.length, this.minoMap[0].length, (x, y) => {
      rotated[y][x] = this.minoMap[x][-y + 3];
    })
    this.minoMap = rotated;
  }

  canMove(nextX: number, nextY: number, maxX:number, maxY: number, fields: number[][]): boolean {
    let result = true
    rowColLoop(this.minoMap.length, this.minoMap[0].length, (y: number, x: number) => {
      if (this.minoMap[y][x]) {
        const nextUnderGraund = nextY + y >= maxY
        const nextSideWall = 0 > nextX + x || nextX + x >= maxX
        const nextExitsBlock = fields[nextY + y] && fields[nextY + y][nextX + x]
        if (nextUnderGraund || nextExitsBlock || nextSideWall) result = false;
      }
    })
    return result;
  }

  private buildBlocks(x:number, y: number, rows: number, cols: number) {
    this.blocks = []
    rowColLoop(rows, cols, (rowIndex, colIndex) => {
      if (this.blockExists(rowIndex, colIndex)) {
        this.blocks.push(this.buildBlock(colIndex, rowIndex, x, y))
      }
    })
  }

  private buildBlock(colIndex: number, rowIndex: number, x:number, y: number): Block {
    const color = Tetrimino.COLORS[this.minoMap[rowIndex][colIndex] - 1]
    return new Block((x + colIndex) * this.blockWidth, (y + rowIndex) * this.blockHeight, this.blockWidth, this.blockHeight, color)
  }

  private blockExists(rowIndex: number, colIndex: number): boolean {
    return !!(this.minoMap[rowIndex] && this.minoMap[rowIndex][colIndex])
  }
}
