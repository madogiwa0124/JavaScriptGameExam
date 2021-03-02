import { Scene } from "@src/models/engine/object/scene";
import { Fighter } from "@src/models/objects/fighter";
import { Enemy } from "@src/models/objects/enemy";
import { EnemyHpBar } from "@src/models/objects/enemyHpBar";

export class DanmakuStgMainScene extends Scene {
  gameClearScene: Scene;
  gameOverScene: Scene;

  constructor(
    renderingTarget: HTMLCanvasElement,
    sprite: HTMLImageElement,
    gameClearScene: Scene,
    gameOverScene: Scene
  ) {
    super("メイン", "black", renderingTarget);
    this.gameClearScene = gameClearScene;
    this.gameOverScene = gameOverScene;

    const fighter = new Fighter(150, 300, sprite);
    const enemy = new Enemy(150, 100, sprite);
    const enemyHpBar = new EnemyHpBar(50, 20, enemy);

    this.add(fighter);
    this.add(enemy);
    this.add(enemyHpBar);

    fighter.addEventListener("destroy", (e) => {
      this.changeScene(this.gameOverScene);
    });

    enemy.addEventListener("destroy", (e) => {
      this.changeScene(this.gameClearScene);
    });
  }
}
