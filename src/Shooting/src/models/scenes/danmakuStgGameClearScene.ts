import { Scene } from "@src/models/engine/object/scene";
import { TextLabel } from "@src/models/objects/textLabel";

export class DanmakuStgGameClearScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super("ゲームクリア", "black", renderingTarget);
    const text = new TextLabel(60, 200, "ゲームクリア");
    this.add(text);
  }
}
