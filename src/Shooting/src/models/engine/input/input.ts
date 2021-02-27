export class Input {
  keyMap: KeyMap;
  prevKeyMap: KeyMap;

  constructor(keyMap: KeyMap, prevKeyMap: KeyMap) {
    this.keyMap = keyMap;
    this.prevKeyMap = prevKeyMap;
  }

  private getKeyFromMap(keyName: string, map: KeyMap) {
    if (map.has(keyName)) {
      return map.get(keyName) as boolean;
    } else {
      return false;
    }
  }

  private getPrevKey(keyName: string) {
    return this.getKeyFromMap(keyName, this.prevKeyMap);
  }

  getKey(keyName: string) {
    return this.getKeyFromMap(keyName, this.keyMap);
  }

  getKeyDown(keyName: string) {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return !prevDown && currentDown;
  }

  getKeyUp(keyName: string) {
    const prevDown = this.getPrevKey(keyName);
    const currentDown = this.getKey(keyName);
    return prevDown && !currentDown;
  }
}
