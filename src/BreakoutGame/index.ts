class Controller {
  right: boolean;
  left: boolean;

  constructor(right: boolean, left: boolean) {
    this.right = right
    this.left = left
  }

  bind(target: HTMLDocument) {
    target.addEventListener("keydown", controller.input.bind(this), false);
    target.addEventListener("keyup", controller.input.bind(this), false);
  }

  input(event: KeyboardEvent): void {
    if (this.isKeyRight(event.key)) {
      this.right = event.type == "keydown";
    }
    if (this.isKeyLeft(event.key)) {
      this.left  = event.type == "keydown";
    }
  }

  value(): "right" | "left" | "none" {
    if(this.right) {
      return "right"
    } else if(this.left)  {
      return "left"
    } else {
      return "none"
    }
  }

  isKeyRight(key: string): boolean {
    return (key == "Right" || key == "ArrowRight")
  }

  isKeyLeft(key: string): boolean {
    return (key == "Left" || key == "ArrowLeft")
  }
}

class Paddle {
  height: number
  width: number
  color: string
  positionX: number
  positionY: number
  moveX: number
  moveY: number

  constructor(positionX: number, positionY: number) {
    this.height = 10;
    this.width = 75;
    this.color = "#ffff00"
    this.positionX = positionX - (this.width / 2);
    this.positionY = positionY - this.height;
    this.moveX = 5
    this.moveY = 0
  }

  move(limitPositionX: number, direction: "right" | "left" | "none") {
    switch (direction) {
      case "right":
        this.moveRight(limitPositionX)
        break;
      case "left":
        this.moveLeft(0)
        break;
      default:
        break;
    }
  }

  moveRight(limitPosition: number) {
    const isColision = this.positionX > limitPosition - this.width
    if(!isColision) this.positionX += this.moveX;
  }

  moveLeft(limitPosition: number) {
    const isColision = this.positionX < limitPosition
    if(!isColision) this.positionX -= this.moveX;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(this.positionX, this.positionY, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

class Ball {
  radius: number;
  positionX: number;
  positionY: number;
  moveX: number;
  moveY: number;
  color: string;

  constructor(positionX: number, positionY: number) {
    this.radius = 10;
    this.color = "#0095DD"
    this.moveX = 2;
    this.moveY = -2;
    this.positionX = positionX
    this.positionY = positionY - 30
  }

  isCollisionTop() {
    const movedPositionY = this.positionY + this.moveY
    return movedPositionY < this.radius
  }

  isCollisionGround(limitPosition: number) {
    const movedPositionY = this.positionY + this.moveY
    return movedPositionY > limitPosition + this.radius
  }

  isCollisionPaddle(paddle: Paddle, limitPosition: number): boolean {
    const movedPositionY = this.positionY + this.moveY
    const inPaddleWidth = this.positionX > paddle.positionX && this.positionX < paddle.positionX + paddle.width
    const underPadlleHeight = movedPositionY > limitPosition - paddle.height - this.radius
    return inPaddleWidth && underPadlleHeight
  }

  // 左端、右端の衝突判定
  isCollisionX(limitPosition: number) {
    const movedPositionX = this.positionX + this.moveX
    return (movedPositionX < this.radius || movedPositionX > limitPosition - this.radius)
  }

  move(limitPositionX: number, limitPositionY: number, paddle: Paddle) {
    // 衝突したときには方向転換
    if(this.isCollisionX(limitPositionX)) this.moveX = this.moveX * -1;
    if(this.isCollisionTop()) this.moveY = this.moveY * -1;
    if(this.isCollisionPaddle(paddle, limitPositionY)) this.moveY = this.moveY * -1;

    this.positionX += this.moveX;
    this.positionY += this.moveY;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

console.log("start!!")

const canvas = (document.getElementById('myCanvas')) as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const ball = new Ball(canvas.width / 2, canvas.height)
const paddle = new Paddle(canvas.width / 2, canvas.height)
const controller = new Controller(false, false)
controller.bind(document)

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  paddle.render(ctx)
  ball.render(ctx)
  ball.move(canvas.width, canvas.height, paddle)
  paddle.move(canvas.width, controller.value())
  if(ball.isCollisionGround(canvas.height)) {
    alert("GAME OVER");
    clearInterval(timer);
  }
}

let timer = setInterval(draw, 10)
