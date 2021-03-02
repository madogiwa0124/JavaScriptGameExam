import { SpriteActor } from "@src/models/engine/object/spriteActor";
import { Sprite } from "@src/models/engine/object/sprite";
import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Bullet } from "@src/models/objects/bullet";
import { Actor } from "@src/models/engine/object/actor";

export class Fighter extends SpriteActor {
  private assetSprite: HTMLImageElement;
  private speed: number;
  private shootInterval: number;
  private shootTimeCount: number;
  private velocityX: number;
  private velocityY: number;

  constructor(x: number, y: number, assetSprite: HTMLImageElement) {
    const sprite = new Sprite(assetSprite, new Rectangle(0, 0, 16, 16));
    const hitArea = new Rectangle(8, 8, 2, 2);
    super(x, y, sprite, hitArea);
    this.assetSprite = assetSprite;
    this.speed = 3;
    this.shootInterval = 5;
    this.shootTimeCount = 0;
    this.velocityX = 0;
    this.velocityY = 0;

    this.addEventListener('hit', e => {
      const target = e.target as Actor
      if(target.hasTag("enemyBullet")) this.destory()
    })
  }

  update(gameInfo: GameInfo, input: Input) {
    this.move(input, gameInfo);
    this.shoot(input);
  }

  private move(input: Input, gameInfo: GameInfo) {
    this.velocityX = 0;
    this.velocityY = 0;

    if (input.getKey("ArrowUp")) {
      this.velocityY = -this.speed;
    }
    if (input.getKey("ArrowDown")) {
      this.velocityY = this.speed;
    }
    if (input.getKey("ArrowLeft")) {
      this.velocityX = -this.speed;
    }
    if (input.getKey("ArrowRight")) {
      this.velocityX = this.speed;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    const boundWidth = gameInfo.screenRectangle.width - this.width;
    const boundHeight = gameInfo.screenRectangle.height - this.height;
    const bound = new Rectangle(this.width, this.height, boundWidth, boundHeight);
    if (this.isOutOfBounds(bound)) {
      this.x -= this.velocityX;
      this.y -= this.velocityY;
    }
  }

  private shoot(input: Input) {
    this.shootTimeCount += 1;
    const fireReady = this.shootTimeCount > this.shootInterval;
    if (fireReady && input.getKeyDown(" ")) {
      const bullet = new Bullet(this.x, this.y, this.assetSprite);
      this.spawnActor(bullet);
      this.shootTimeCount = 0;
    }
  }
}
