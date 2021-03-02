import { EventDispatcher } from "@src/models/engine/eventDispatcher";
import { GameEvent } from "@src/models/engine/gameEvent";
import { Input } from "@src/models/engine/input/input";

export class Actor extends EventDispatcher {
  _x: number;
  _y: number;
  hitArea: IRectangle;
  private hitAreaOffsetX: number;
  private hitAreaOffsetY: number;
  tags: Tags;

  constructor(x: number, y: number, hitArea: IRectangle, tags: Tags = []) {
    super();
    this._x = x;
    this._y = y;
    this.hitArea = hitArea;
    this.hitAreaOffsetX = hitArea.x;
    this.hitAreaOffsetY = hitArea.y;
    // NOTE: typescriptだとsetのoverrideはconstructorで
    // 上手く動かないので明示的にhitAreaを更新
    this.hitArea.x = this._x + this.hitAreaOffsetX;
    this.hitArea.y = this._y + this.hitAreaOffsetY;
    this.tags = tags;
  }

  update(gameInfo: any, input: Input) {}

  render(targat: HTMLCanvasElement) {}

  hasTag(tagName: string): boolean {
    return this.tags.includes(tagName);
  }

  spawnActor(actor: Actor) {
    this.dispatchEvent("spawnactor", new GameEvent(actor));
  }

  destory() {
    this.dispatchEvent("destroy", new GameEvent(this));
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this.hitArea.x = value + this.hitAreaOffsetX;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this.hitArea.y = value + this.hitAreaOffsetY;
  }
}
