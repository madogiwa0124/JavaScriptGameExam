import { GameInfo } from "@src/models/engine/gameInfo";
import { Input } from "@src/models/engine/input/input";
import { Scene } from "@src/models/engine/object/scene";
import { TextLabel } from "@src/models/objects/textLabel";

export class DanmakuTitleScene extends Scene {
  nextScene: Scene;

  constructor(renderingTarget: HTMLCanvasElement, nextScene: Scene) {
    super("タイトル", "black", renderingTarget);
    const title = new TextLabel(100, 200, "弾幕STG");
    this.add(title);
    this.nextScene = nextScene;
  }

  update(gameInfo: GameInfo, input: Input) {
    super.update(gameInfo, input);
    if (input.getKeyDown(" ")) {
      this.changeScene(this.nextScene);
    }
  }
}
