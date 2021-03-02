import { AssetLoader } from "@src/models/engine/assetLoader";
import { Game } from "@src/models/engine/game";
import { DanmakuTitleScene } from "@src/models/scenes/danmakuTitleScene";
import { DanmakuStgMainScene } from "@src/models/scenes/danmakuStgMainScene";
import { DanmakuStgGameClearScene } from "@src/models/scenes/danmakuStgGameClearScene";
import { DanmakuStgGameOverScene } from "@src/models/scenes/danmakuStgGameOverScene";
import "@src/assets/images/sprite.png";

class DanmakuStgGame extends Game {
  constructor() {
    super("弾幕STG", 300, 400, 60);
    const sprite = assets.get("sprite") as HTMLImageElement;
    const gameClearScene = new DanmakuStgGameClearScene(this.screenCanvas);
    const gameOverScene = new DanmakuStgGameOverScene(this.screenCanvas);
    const mainScene = new DanmakuStgMainScene(this.screenCanvas, sprite, gameClearScene, gameOverScene);
    const titleScene = new DanmakuTitleScene(this.screenCanvas, mainScene);
    this.changeScene(titleScene);
  }
}

const assets = new AssetLoader();
const spriteUrlPath = "./dist/src/assets/images/sprite.png";
assets.addImage("sprite", spriteUrlPath);
assets.loadAll().then((_asset) => {
  const game = new DanmakuStgGame();
  document.body.appendChild(game.screenCanvas);
  game.start();
});
