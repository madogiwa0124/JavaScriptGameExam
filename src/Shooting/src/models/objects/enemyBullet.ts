import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Sprite } from "@src/models/engine/object/sprite";
import { SpriteActor } from "@src/models/engine/object/spriteActor";

export class EnemyBullet extends SpriteActor {
  velocityX: number;
  velocityY: number;

  constructor(x: number, y: number, velocityX: number, velocityY: number, sprite: HTMLImageElement) {
    const enemyBulletSprite = new Sprite(sprite, new Rectangle(16, 16, 16, 16));
    const hitArea = new Rectangle(4, 4, 8, 8);
    super(x, y, enemyBulletSprite, hitArea, ["enemyBullet"]);

    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update(gameInfo: GameInfo, _input: Input) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.isOutOfBounds(gameInfo.screenRectangle)) this.destory();
  }
}
