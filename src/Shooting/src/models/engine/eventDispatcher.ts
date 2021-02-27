export class EventDispatcher {
  private eventLisners: { [type: string]: Array<(...args: any[]) => void> };

  constructor() {
    this.eventLisners = {};
  }

  addEventLisner(type: string, callback: (...args: any[]) => void) {
    if (this.eventLisners[type] == undefined) this.eventLisners[type] = [];
    this.eventLisners[type].push(callback);
  }

  dispatchEvent(type: string, event: IGameEvent) {
    const listeners = this.eventLisners[type];
    if (listeners != undefined) listeners.forEach((callback) => callback(event));
  }
}
