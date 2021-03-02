import { Actor } from "@src/models/engine/object/actor";
import { Rectangle } from "@src/models/engine/object/rectangle";
import { Enemy } from "@src/models/objects/enemy";

export class EnemyHpBar extends Actor {
  private width: number;
  private height: number;
  private innerWidth: number;

  constructor(x: number, y: number, enemy: Enemy) {
    const hitArea = new Rectangle(0, 0, 0, 0);
    super(x, y, hitArea);

    this.width = 200;
    this.height = 10;
    this.innerWidth = this.width;

    enemy.addEventListener("changehp", (e) => {
      const enemy = e.target as Enemy;
      this.innerWidth = this.width * (enemy.currentHp / enemy.maxHp);
    });
  }

  render(target: HTMLCanvasElement) {
    const context = target.getContext("2d") as CanvasRenderingContext2D;
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.fillRect(this.x, this.y, this.innerWidth, this.height);
  }
}
