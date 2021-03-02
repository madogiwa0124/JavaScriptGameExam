import { Scene } from "@src/models/engine/object/scene";
import { TextLabel } from "@src/models/objects/textLabel";

export class DanmakuStgGameOverScene extends Scene {
  constructor(renderingTarget: HTMLCanvasElement) {
    super("ゲームオーバー", "black", renderingTarget);
    const text = new TextLabel(50, 200, "ゲームオーバー...");
    this.add(text);
  }
}
