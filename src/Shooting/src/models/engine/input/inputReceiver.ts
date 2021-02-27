import { Input } from "@src/models/engine/input/input";

export class InputReceiver {
  private keyMap: KeyMap;
  private prevKeyMap: KeyMap;

  constructor() {
    this.keyMap = new Map();
    this.prevKeyMap = new Map();
    addEventListener("keydown", (key) => this.keyMap.set(key.key, true));
    addEventListener("keyup", (key) => this.keyMap.set(key.key, false));
  }

  getInput() {
    const keyMap = new Map(this.keyMap);
    const prevKeyMap = new Map(this.prevKeyMap);
    this.prevKeyMap = new Map(this.keyMap);
    return new Input(keyMap, prevKeyMap);
  }
}
