import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Sprite } from "@src/models/engine/object/sprite";
import { SpriteActor } from "@src/models/engine/object/spriteActor";
import { Actor } from "@src/models/engine/object/actor";

export class Bullet extends SpriteActor {
  speed: number;

  constructor(x: number, y: number, sprite: HTMLImageElement) {
    const bulletSprite = new Sprite(sprite, new Rectangle(0, 16, 16, 16));
    const hitArea = new Rectangle(4, 0, 8, 16);
    super(x, y, bulletSprite, hitArea, ["playerBullet"]);
    this.speed = 6;

    this.addEventListener("hit", (e) => {
      const target = e.target as Actor;
      if (target.hasTag("enemy")) this.destory();
    });
  }

  update(gameInfo: GameInfo, input: Input) {
    this.y -= this.speed;
    if (this.isOutOfBounds(gameInfo.screenRectangle)) this.destory();
  }
}
