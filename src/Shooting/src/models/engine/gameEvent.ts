export class GameEvent implements IGameEvent {
  target: any;

  constructor(target: any) {
    this.target = target;
  }
}
