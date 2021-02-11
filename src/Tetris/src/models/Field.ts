import { rowColLoop } from "../common/common"
import { Block } from "./Block"
import { Tetrimino } from "./Tetrimino"

export class Field {
  map: number[][]

  constructor(rows: number, cols: number) {
    this.map = Array.from(new Array(rows), () => new Array(cols).fill(0))
  }

  fix(currentMino: Tetrimino, currentX: number, currentY: number) {
    rowColLoop(currentMino.minoMap.length, currentMino.minoMap[0].length, (y: number, x: number) => {
      if (currentMino.minoMap[y][x]) this.map[currentY + y][currentX  + x] = currentMino.minoMap[y][x]
    })
  }

  draw( p: p5, blockWidth: number, blockHeight: number) {
    this.fixedBlocks(blockWidth, blockHeight).forEach(block => block.draw(p))
  }

  private fixedBlocks(blockWidth: number, blockHeight: number): Block[] {
    let blocks: Block[] = []
    rowColLoop(this.map.length, this.map[0].length, (y: number, x: number) => {
      if(this.map[y][x]) {
        blocks.push(new Block(x * blockWidth, y * blockHeight, blockWidth, blockHeight))
      };
    })
    return blocks
  }
}
