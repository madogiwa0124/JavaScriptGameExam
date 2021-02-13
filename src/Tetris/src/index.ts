import * as p5 from 'p5';
import { Tetrimino } from './models/Tetrimino'
import { Field } from './models/Field';
import { Position } from './models/Position';
import { Controller } from './models/Controller';

const BACKGROUND_RGB = [237, 237, 237]
const CANVAS_HEIGHT = 600
const CANVAS_WIDTH = 300
const COLS = 10
const ROWS = 20
const BLOCK_WIDTH  = CANVAS_WIDTH / COLS
const BLOCK_HEIGHT = CANVAS_HEIGHT / ROWS

let position = new Position(3, -1)
let currentMino = new Tetrimino(Tetrimino.randomMap(), BLOCK_WIDTH, BLOCK_HEIGHT)
let field = new Field(ROWS, COLS)
let controller = new Controller(document.body)

document.body.addEventListener(controller.eventName, ((event: CustomEvent<{key: string}>) => {
  const inputKey: string = event.detail.key
  switch(inputKey) {
    case 'left':   if(currentMinoCanMove(-1,  0)) position.x -= 1; break
    case 'right':  if(currentMinoCanMove(+1,  0)) position.x += 1; break
    case 'down':   if(currentMinoCanMove( 0, +1)) position.y += 1; break
    case 'rotate':
      const beforeMino = currentMino
      currentMino.rotate()
      if(!currentMinoCanMove( 0,  0)) currentMino = beforeMino
      break;
  }
})  as EventListener)

function currentMinoCanMove(moveX: number, moveY: number) {
  return currentMino.canMove(position.x + moveX, position.y + moveY, COLS, ROWS, field.map)
}

const sketch = (p: p5) => {
  p.mousePressed = () => {
  }

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    p.background(BACKGROUND_RGB)
  };

  p.draw = () => {
    p.frameRate(5)
    p.background(BACKGROUND_RGB)
    if(currentMinoCanMove(0, 1)) {
      position.y += 1;
    } else {
      field.fix(currentMino, position.x, position.y);
      field.clear()
      currentMino = new Tetrimino(Tetrimino.randomMap(), BLOCK_WIDTH, BLOCK_HEIGHT)
      position.reset()
    }
    field.draw(p, BLOCK_WIDTH, BLOCK_HEIGHT)
    currentMino.draw(p, position.x, position.y, ROWS, COLS)
  };
};

const sketchP = new p5(sketch);
