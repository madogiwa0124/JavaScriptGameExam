import { Generation } from './models/Generation'
import * as p5 from 'p5';

const BACKGROUND_RGB = [204, 204, 255]
const CANVAS_HEIGHT = 480
const CANVAS_WIDTH = 480
let generation = new Generation(CANVAS_HEIGHT, CANVAS_WIDTH)

const sketch = (p: p5) => {
  p.mousePressed = () => {
    p.background(BACKGROUND_RGB)
    generation = generation.next()
    generation.draw(p)
  }

  p.setup = () => {
    p.createCanvas(CANVAS_HEIGHT, CANVAS_WIDTH)
    p.background(BACKGROUND_RGB)
    generation.draw(p)
  };

  p.draw = () => {
    p.frameRate(1)
    p.mousePressed()
  };
};

const sketchP = new p5(sketch);
