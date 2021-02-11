import * as p5 from 'p5';
import { Tetrimino } from './models/Tetrimino'

const BACKGROUND_RGB = [237, 237, 237]
const CANVAS_HEIGHT = 600
const CANVAS_WIDTH = 300
const COLS = 10
const ROWS = 20
const BLOCK_WIDTH  = CANVAS_WIDTH / COLS
const BLOCK_HEIGHT = CANVAS_HEIGHT / ROWS

let current_x = 3
let current_y = 0
let current_mino = new Tetrimino(Tetrimino.randomMap(), ROWS, COLS, BLOCK_WIDTH, BLOCK_HEIGHT)

const sketch = (p: p5) => {
  p.mousePressed = () => {
  }

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    p.background(BACKGROUND_RGB)
  };

  p.draw = () => {
    p.frameRate(5)
    current_y += 1;
    p.background(BACKGROUND_RGB)
    current_mino.draw(p, current_x, current_y)
  };
};

const sketchP = new p5(sketch);
