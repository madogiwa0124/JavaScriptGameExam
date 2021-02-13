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

  clear(){
    // 上から順番に列を検証
    rowColLoop(this.map.length, this.map[0].length, (y: number, x: number) => {
      const fill = !this.map[y].includes(0)
      if(fill) {
        // 揃っていたら消した列より上の列を順番に参照して下に動かす
        for(let v = y - 1; v >= 0; v--) {
          this.map[v + 1] = this.map[v]
        }
      }
    })
  }

  private fixedBlocks(blockWidth: number, blockHeight: number): Block[] {
    let blocks: Block[] = []
    rowColLoop(this.map.length, this.map[0].length, (y: number, x: number) => {
      if(this.map[y][x]) {
        const color = Tetrimino.COLORS[this.map[y][x] - 1]
        blocks.push(new Block(x * blockWidth, y * blockHeight, blockWidth, blockHeight, color))
      };
    })
    return blocks
  }
}
