/* Classes */
class Controller {
  right: boolean;
  left: boolean;

  constructor(right: boolean, left: boolean) {
    this.right = right
    this.left = left
  }

  bind(target: HTMLDocument): Controller {
    target.addEventListener("keydown", controller.input.bind(this), false);
    target.addEventListener("keyup", controller.input.bind(this), false);
    return this
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

  private input(event: KeyboardEvent): void {
    if (this.isKeyRight(event.key)) {
      this.right = event.type == "keydown";
    }
    if (this.isKeyLeft(event.key)) {
      this.left  = event.type == "keydown";
    }
  }

  private isKeyRight(key: string): boolean {
    return (key == "Right" || key == "ArrowRight")
  }

  private isKeyLeft(key: string): boolean {
    return (key == "Left" || key == "ArrowLeft")
  }
}

class Paddle {
  positionX: number
  positionY: number
  readonly moveX: number
  readonly moveY: number
  readonly height: number
  readonly width: number
  private readonly color: string

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

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(this.positionX, this.positionY, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  private moveRight(limitPosition: number) {
    const isColision = this.positionX > limitPosition - this.width
    if(!isColision) this.positionX += this.moveX;
  }

  private moveLeft(limitPosition: number) {
    const isColision = this.positionX < limitPosition
    if(!isColision) this.positionX -= this.moveX;
  }
}

class Ball {
  positionX: number;
  positionY: number;
  readonly radius: number;
  private moveX: number;
  private moveY: number;
  private readonly color: string;

  constructor(positionX: number, positionY: number) {
    this.radius = 10;
    this.color = "#DD5555"
    this.moveX = 2;
    this.moveY = -2;
    this.positionX = positionX
    this.positionY = positionY - 30
  }

  isCollisionGround(limitPosition: number) {
    const movedPositionY = this.positionY + this.moveY
    return movedPositionY > limitPosition - this.radius
  }

  move(limitPositionX: number, limitPositionY: number, paddle: Paddle, blocks: Block[]) {
    // 衝突したときには方向転換
    if(this.isCollisionX(limitPositionX)) this.moveX = this.moveX * -1;
    if(this.isCollisionTop()) this.moveY = this.moveY * -1;
    if(this.isCollisionPaddle(paddle, limitPositionY)) this.moveY = this.moveY * -1;
    if(this.isCollisionBlocks(blocks)) this.moveY = this.moveY * -1;
    if(this.isCollisionGround(limitPositionY)) this.moveY = this.moveY * -1;

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

  private isCollisionPaddle(paddle: Paddle, limitPosition: number): boolean {
    const movedPositionY = this.positionY + this.moveY
    const inPaddleWidth = this.positionX > paddle.positionX && this.positionX < paddle.positionX + paddle.width
    const underPadlleHeight = movedPositionY > limitPosition - paddle.height - this.radius
    return inPaddleWidth && underPadlleHeight
  }

  // 左端、右端の衝突判定
  private isCollisionX(limitPosition: number) {
    const movedPositionX = this.positionX + this.moveX
    return (movedPositionX < this.radius || movedPositionX > limitPosition - this.radius)
  }

  // Blockの衝突判定
  private isCollisionBlocks(blocks: Block[]): boolean {
    return blocks.map(block => block.isCollision(this.positionX, this.positionY)).includes(true)
  }

  private isCollisionTop() {
    const movedPositionY = this.positionY + this.moveY
    return movedPositionY < this.radius
  }
}

class Block {
  isHit: boolean;
  readonly height: number;
  readonly width: number;
  readonly positionX: number;
  readonly positionY: number;
  private readonly color: string;

  static readonly WIDTH = 75;
  static readonly HEIGHT = 20;
  static readonly COLOR = "#0095DD";

  constructor(positionX: number, positionY: number) {
    this.height = Block.HEIGHT;
    this.width = Block.WIDTH;
    this.positionX = positionX;
    this.positionY = positionY;
    this.color = Block.COLOR;
    this.isHit = false
  }

  isCollision(x: number, y: number) {
    const isCollisionX = x > this.positionX && x < this.positionX + this.width;
    const isCollisionY = y > this.positionY && y < this.positionY + this.height;
    if(isCollisionX && isCollisionY) this.isHit = true
    return isCollisionX && isCollisionY
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(this.positionX, this.positionY, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
}

class BlockCollection {
  readonly rows: number;
  readonly clumns: number;
  readonly defaultBlockCount: number;
  readonly blocks: Block[][]
  private readonly offsetTop: number;
  private readonly offsetLeft: number;
  private readonly padding: number;
  private readonly blockWidth: number;
  private readonly blockHeight: number;

  constructor(clumns: number, rows: number) {
    this.rows = rows;
    this.clumns = clumns;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.padding = 10;
    this.blockWidth = Block.WIDTH;
    this.blockHeight = Block.HEIGHT;
    this.defaultBlockCount = clumns * rows;
    this.blocks = this.initializeBlocks()
  }

  remainingBlocks(): Block[] {
    return this.blocks.flat().filter(block => !block.isHit)
  }

  render(ctx: CanvasRenderingContext2D) {
    [...Array(this.clumns).keys()].forEach(clumn => {
      [...Array(this.rows).keys()].forEach(row => {
        if (!this.blocks[clumn][row].isHit) {
          this.blocks[clumn][row] = this.buildBlock(clumn, row)
          this.blocks[clumn][row].render(ctx)
        }
      });
    });
  }

  private buildBlock(clumn: number, row: number) {
    const x = (clumn * (this.blockWidth  + this.padding)) + this.offsetLeft;
    const y = (row   * (this.blockHeight + this.padding)) + this.offsetTop;
    return new Block(x, y);
  }

  private initializeBlocks(): Block[][] {
    let blocks: Block[][] = [];
    [...Array(this.clumns).keys()].forEach(clumn => {
      blocks[clumn] = [];
      [...Array(this.rows).keys()].forEach(row => {
        blocks[clumn][row] = this.buildBlock(clumn, row)
      });
    });
    return blocks
  }
}

class Score {
  value: number;
  private positionX: number;
  private positionY: number;
  private readonly font: string;
  private readonly  fontSize: number;
  private readonly  color: string;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.fontSize = 16;
    this.font = `${this.fontSize}px Arial`;
    this.color = "#0095DD";
    this.value = 0
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.value}`, this.positionX, this.positionY);
  }

  calc(initialBlockCount: number, remainingBlockCount: number) {
    this.value = initialBlockCount - remainingBlockCount
  }
}

class Life {
  value: number;
  readonly positionX: number;
  readonly positionY: number;
  private readonly font: string;
  private readonly fontSize: number;
  private readonly color: string;

  constructor(positionX: number, positionY: number, value: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.fontSize = 16;
    this.font = `${this.fontSize}px Arial`;
    this.color = "#0095DD";
    this.value = value
  }

  subtract() {
    this.value -= 1;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Life: ${this.value}`, this.positionX, this.positionY);
  }
}

class GameManager {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly score: Score
  readonly life: Life
  readonly ball: Ball
  readonly paddle: Paddle
  readonly blockCollection: BlockCollection
  readonly controller: Controller
  timer: number

  static readonly CLEAR_MESSAGE = "Congratulations!"
  static readonly GAME_OVER_MESSAGE = "Game Over!"
  static readonly INTERVAL_M_SEC = 10

  constructor(canvas: HTMLCanvasElement, score: Score, life: Life, ball: Ball, paddle: Paddle, blockCollection: BlockCollection, controller: Controller) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    this.score = score
    this.life = life
    this.ball = ball
    this.paddle = paddle
    this.blockCollection = blockCollection
    this.controller = controller
    this.timer = 0
  }

  start() {
    this.timer = setInterval(this.draw.bind(this), GameManager.INTERVAL_M_SEC)
  }

  draw() {
    this.score.calc(this.blockCollection.defaultBlockCount, this.blockCollection.remainingBlocks().length)
    this.resetObjects()
    this.ball.move(this.canvas.width, this.canvas.height, this.paddle, this.blockCollection.remainingBlocks())
    this.paddle.move(this.canvas.width, this.controller.value())

    if(this.isGameClear()) this.gameEnd(GameManager.CLEAR_MESSAGE)
    if(this.ball.isCollisionGround(this.canvas.height)) this.life.subtract()
    if(this.isGameOver()) this.gameEnd(GameManager.GAME_OVER_MESSAGE)
  }

  private resetObjects() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.score.render(ctx)
    this.life.render(ctx)
    this.paddle.render(ctx)
    this.ball.render(ctx);
    this.blockCollection.render(ctx);
  }

  private gameEnd(message: string) {
    alert(message);
    clearInterval(this.timer);
    document.location.reload();
  }

  private isGameClear() {
    return this.score.value >= blockCollection.defaultBlockCount
  }

  private isGameOver() {
    return this.life.value < 1
  }
}

/* Game Control */
const canvas = (document.getElementById('myCanvas')) as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const DEFAULT_CANVAS_HEIGHT = 640
const DEFAULT_CANVAS_WIDTH = 480
canvas.height = DEFAULT_CANVAS_HEIGHT
canvas.width = DEFAULT_CANVAS_WIDTH

const DEFAULT_BALL_POSITION_X = canvas.width / 2
const DEFAULT_BALL_POSITION_Y = canvas.height

const DEFAULT_PADDLE_POSITION_X = canvas.width / 2
const DEFAULT_PADDLE_POSITION_Y = canvas.height

const DEFAULT_SCORE_POSITION_X = 8;
const DEFAULT_SCORE_POSITION_Y = 20;

const DEFAULT_LIFE_POSITION_X = canvas.width - 65;
const DEFAULT_LIFE_POSITION_Y = 20;
const DEFAULT_LIFE_VALUE = 3;

const DEFAULT_BLOCK_COLS = 5
const DEFAULT_BLOCK_ROWS = 5

const score = new Score(DEFAULT_SCORE_POSITION_X, DEFAULT_SCORE_POSITION_Y)
const life = new Life(DEFAULT_LIFE_POSITION_X, DEFAULT_LIFE_POSITION_Y, DEFAULT_LIFE_VALUE)
const ball = new Ball(DEFAULT_BALL_POSITION_X, DEFAULT_BALL_POSITION_Y)
const paddle = new Paddle(DEFAULT_PADDLE_POSITION_X, DEFAULT_PADDLE_POSITION_Y)
const blockCollection = new BlockCollection(DEFAULT_BLOCK_COLS, DEFAULT_BLOCK_ROWS)
const controller = new Controller(false, false)

const manager = new GameManager(
  canvas,
  score,
  life,
  ball,
  paddle,
  blockCollection,
  controller.bind(document)
)
manager.start()
