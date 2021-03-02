import { GameEvent } from "@src/models/engine/gameEvent";
import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Actor } from "@src/models/engine/object/actor";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Sprite } from "@src/models/engine/object/sprite";
import { SpriteActor } from "@src/models/engine/object/spriteActor";
import { EnemyBullet } from "@src/models/objects/enemyBullet";

export class Enemy extends SpriteActor {
  maxHp: number;
  currentHp: number;
  private moveMinX: number;
  private moveMaxX: number;
  private shootInterval: number;
  private shootTimeCount: number;
  private velocityX: number;
  private assetSprite: HTMLImageElement;

  constructor(x: number, y: number, sprite: HTMLImageElement) {
    const enemySprite = new Sprite(sprite, new Rectangle(16, 0, 16, 16));
    const hitArea = new Rectangle(0, 0, 16, 16);
    super(x, y, enemySprite, hitArea, ["enemy"]);
    this.assetSprite = sprite;
    this.maxHp = 50;
    this.currentHp = this.maxHp;
    this.moveMinX = 100;
    this.moveMaxX = 200;

    this.shootInterval = 120;
    this.shootTimeCount = 0;
    this.velocityX = 0.3;

    this.addEventListener("hit", (e) => {
      const target = e.target as Actor;
      if (target.hasTag("playerBullet")) {
        this.currentHp -= 1;
        this.dispatchEvent("changehp", new GameEvent(this));
      }
    });
  }

  update(gameInfo: GameInfo, input: Input) {
    this.move();
    if (this.currentHp <= 0) this.destory();
    this.shootTimeCount += 1;
    if (this.shootTimeCount > this.shootInterval) this.shootCircleBullet(15, 1);
  }

  private move() {
    this.x += this.velocityX;
    const SwitchBack = this.x < this.moveMinX || this.x >= this.moveMaxX;
    if (SwitchBack) this.velocityX = this.velocityX * -1;
  }

  private shootBullet(degree: number, speed: number) {
    const rad = (degree / 180) * Math.PI;
    const velocityX = Math.cos(rad) * speed;
    const velocityY = Math.sin(rad) * speed;

    const bullet = new EnemyBullet(this.x, this.y, velocityX, velocityY, this.assetSprite);
    this.spawnActor(bullet);
  }

  private shootCircleBullet(num: number, speed: number) {
    const degree = 360 / num;
    for (let i = 0; i < num; i++) {
      this.shootBullet(degree * i, speed);
    }
    this.shootTimeCount = 0;
  }
}
