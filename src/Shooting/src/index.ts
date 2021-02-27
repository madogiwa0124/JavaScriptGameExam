import { Actor } from "@src/models/engine/object/actor";
import { AssetLoader } from "@src/models/engine/assetLoader";
import { Game } from "@src/models/engine/game";
import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Scene } from "@src/models/engine/object/scene";
import { Sprite } from "@src/models/engine/object/sprite";
import { SpriteActor } from "@src/models/engine/object/spriteActor";

class Title extends Actor {
  constructor(x: number, y: number) {
    const hitArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitArea);
  }

  render(target: HTMLCanvasElement) {
    const context = target.getContext("2d") as CanvasRenderingContext2D;
    context.font = "25px sans-serif";
    context.fillStyle = "white";
    context.fillText("弾幕STG", this.x, this.y);
  }
}

class Fighter extends SpriteActor {
  speed: number;

  constructor(x: number, y: number) {
    const assetSprite = assets.get("sprite") as HTMLImageElement;
    const sprite = new Sprite(assetSprite, new Rectangle(0, 0, 16, 16));
    const hitArea = new Rectangle(8, 8, 2, 2);
    super(x, y, sprite, hitArea);
    this.speed = 2;
  }

  update(_gameInfo: GameInfo, input: Input) {
    if (input.getKey("ArrowUp")) this.y -= this.speed;
    if (input.getKey("ArrowDown")) this.y += this.speed;
    if (input.getKey("ArrowLeft")) this.x -= this.speed;
    if (input.getKey("ArrowRight")) this.x += this.speed;
  }
}

class DanmakuStgMainScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super("メイン", "black", renderingTarget);
    const fighter = new Fighter(150, 300);
    this.add(fighter);
  }
}

class DanmakuTitleScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super("タイトル", "black", renderingTarget);
    const title = new Title(100, 200);
    this.add(title);
  }

  update(gameInfo: GameInfo, input: Input) {
    super.update(gameInfo, input);
    if (input.getKeyDown(" ")) {
      const mainScene = new DanmakuStgMainScene(this.renderingTarget);
      this.changeScene(mainScene);
    }
  }
}

class DanmakuStgGame extends Game {
  constructor() {
    super("弾幕STG", 300, 400, 60);
    const titleScene = new DanmakuTitleScene(this.screenCanvas);
    this.changeScene(titleScene);
  }
}

import "@src/assets/images/sprite.png";
const assets = new AssetLoader();
const spriteUrlPath = "./dist/src/assets/images/sprite.png";
assets.addImage("sprite", spriteUrlPath);
assets.loadAll().then((_asset) => {
  const game = new DanmakuStgGame();
  document.body.appendChild(game.screenCanvas);
  game.start();
});
