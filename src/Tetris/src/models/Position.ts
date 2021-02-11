export class Position {
  x: number
  y: number
  initX: number
  initY: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.initX = x
    this.initY = y
  }

  reset() {
    this.x = this.initX
    this.y = this.initY
  }
}
