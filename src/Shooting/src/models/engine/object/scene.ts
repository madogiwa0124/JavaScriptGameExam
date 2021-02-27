import { Actor } from "@src/models/engine/object/actor";
import { EventDispatcher } from "@src/models/engine/eventDispatcher";
import { GameEvent } from "@src/models/engine/gameEvent";
import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";

export class Scene extends EventDispatcher {
  name: string;
  backgroundColor: string;
  actors: Actor[];
  renderingTarget: HTMLCanvasElement;
  destroyedActors: Actor[];

  constructor(name: string, backgroundColor: string, renderingTarget: HTMLCanvasElement) {
    super();
    this.name = name;
    this.backgroundColor = backgroundColor;
    this.renderingTarget = renderingTarget;
    this.actors = [];
    this.destroyedActors = [];
  }

  add(actor: Actor) {
    this.actors.push(actor);
    actor.addEventLisner("spawnactor", (e) => this.add(e.target));
    actor.addEventLisner("destroy", (e) => this.addDestroyedActor(e.target));
  }

  remove(actor: Actor) {
    const index = this.actors.indexOf(actor);
    this.actors.splice(index, 1);
  }

  changeScene(newScene: Scene) {
    const event = new GameEvent(newScene);
    this.dispatchEvent("changescene", event);
  }

  update(gameInfo: GameInfo, input: Input) {
    this.updateAll(gameInfo, input);
    this.hitTest();
    this.disaposeDestoryedActors();
    this.clearScene(gameInfo);
    this.renderAll();
  }

  private updateAll(gameInfo: GameInfo, input: Input) {
    this.actors.forEach((actor) => actor.update(gameInfo, input));
  }

  private hitTest() {
    const length = this.actors.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length - 1; j++) {
        const [actor1, actor2] = [this.actors[i], this.actors[j]];
        const hit = actor1.hitArea.hitTest(actor2.hitArea);
        if (hit) {
          actor1.dispatchEvent("hit", new GameEvent(actor2));
          actor2.dispatchEvent("hit", new GameEvent(actor1));
        }
      }
    }
  }

  private clearScene(gameInfo: GameInfo) {
    const context = this.renderingTarget.getContext("2d") as CanvasRenderingContext2D;
    const width = gameInfo.screenRectangle.width;
    const height = gameInfo.screenRectangle.height;
    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, width, height);
  }

  private renderAll() {
    this.actors.forEach((actor) => actor.render(this.renderingTarget));
  }

  private addDestroyedActor(actor: Actor) {
    this.destroyedActors.push(actor);
  }

  private disaposeDestoryedActors() {
    this.destroyedActors.forEach((actor) => this.remove(actor));
    this.destroyedActors = [];
  }
}
