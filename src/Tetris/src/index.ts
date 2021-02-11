import * as p5 from 'p5';
import { Tetrimino } from './models/Tetrimino'
import { Field } from './models/Field';
import { Position } from './models/Position';

const BACKGROUND_RGB = [237, 237, 237]
const CANVAS_HEIGHT = 600
const CANVAS_WIDTH = 300
const COLS = 10
const ROWS = 20
const BLOCK_WIDTH  = CANVAS_WIDTH / COLS
const BLOCK_HEIGHT = CANVAS_HEIGHT / ROWS

let position = new Position(3, 0)
let currentMino = new Tetrimino(Tetrimino.randomMap(), BLOCK_WIDTH, BLOCK_HEIGHT)
let field = new Field(ROWS, COLS)


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
    if(currentMino.canMove(position.x, position.y + 1, ROWS, field.map)) {
      position.y += 1;
    } else {
      field.fix(currentMino, position.x, position.y);
      currentMino = new Tetrimino(Tetrimino.randomMap(), BLOCK_WIDTH, BLOCK_HEIGHT)
      position.reset()
    }
    field.draw(p, BLOCK_WIDTH, BLOCK_HEIGHT)
    currentMino.draw(p, position.x, position.y, ROWS, COLS)
  };
};

const sketchP = new p5(sketch);
