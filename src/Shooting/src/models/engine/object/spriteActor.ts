import { Actor } from "@src/models/engine/object/actor";
import { Sprite } from "@src/models/engine/object/sprite";

export class SpriteActor extends Actor {
  sprite: Sprite;
  width: number;
  height: number;

  constructor(x: number, y: number, sprite: Sprite, hitArea: IRectangle, tags: Tags = []) {
    super(x, y, hitArea, tags);
    this.sprite = sprite;
    this.width = sprite.rectangle.width;
    this.height = sprite.rectangle.height;
  }

  render(taget: HTMLCanvasElement) {
    const context = taget.getContext("2d") as CanvasRenderingContext2D;
    const rect = this.sprite.rectangle;
    context.drawImage(
      this.sprite.image,
      rect.x,
      rect.y,
      rect.width,
      rect.height,
      this.x,
      this.y,
      rect.width,
      rect.height
    );
  }

  isOutOfBounds(boundRect: IRectangle) {
    const actorLeft = this.x;
    const actorRight = this.x + this.width;
    const actorTop = this.y;
    const actorBottom = this.y + this.height;

    const horizontal = actorRight < boundRect.x || actorLeft > boundRect.width;
    const vertical = actorTop < boundRect.y || actorBottom > boundRect.height;

    return horizontal || vertical;
  }
}
