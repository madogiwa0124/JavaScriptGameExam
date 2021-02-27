export class GameInfo {
  title: string;
  screenRectangle: IRectangle;
  maxFps: number;
  currentFps: number;

  constructor(title: string, screenRectangle: IRectangle, maxFps: number, currentFps: number) {
    this.title = title;
    this.screenRectangle = screenRectangle;
    this.maxFps = maxFps;
    this.currentFps = currentFps;
  }
}
