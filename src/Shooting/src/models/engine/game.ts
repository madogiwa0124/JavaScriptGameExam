import { GameInfo } from "@src/models/engine/gameInfo";
import { InputReceiver } from "@src/models/engine/input/inputReceiver";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Scene } from "@src/models/engine/object/scene";

export class Game {
  title: string;
  width: number;
  height: number;
  maxFps: number;
  currentFps: number;
  screenCanvas: HTMLCanvasElement;
  currentScene: Scene | null;
  private inputReceiver: InputReceiver;
  private prevTimestamp: number;

  constructor(title: string, width: number, height: number, maxFps: number) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.maxFps = maxFps;
    this.currentFps = 0;
    this.currentScene = null;

    this.screenCanvas = document.createElement("canvas");
    this.screenCanvas.height = height;
    this.screenCanvas.width = width;
    this.inputReceiver = new InputReceiver();
    this.prevTimestamp = 0;

    console.log(`${this.title}が初期化されました。`);
  }

  changeScene(newScene: Scene) {
    this.currentScene = newScene;
    this.currentScene.addEventLisner("changescene", (e) => this.changeScene(e.target));
    console.log(`${newScene.name}が初期化されました。`);
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timeStamp: number) {
    const elapsedSec = (timeStamp - this.prevTimestamp) / 1000;
    const accuracy = 0.9;
    const frameTime = (1 / this.maxFps) * accuracy;
    if (elapsedSec <= frameTime) {
      requestAnimationFrame(this.loop.bind(this));
      return;
    }

    this.prevTimestamp = timeStamp;
    this.currentFps = 1 / elapsedSec;
    const screenRectangle = new Rectangle(0, 0, this.width, this.height);
    const info = new GameInfo(this.title, screenRectangle, this.maxFps, this.currentFps);
    const input = this.inputReceiver.getInput();
    this.currentScene?.update(info, input);

    requestAnimationFrame(this.loop.bind(this));
  }
}
