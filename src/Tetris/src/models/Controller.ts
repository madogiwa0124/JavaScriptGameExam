export class Controller {
  keymap: { [key: string]: () => void }
  target: HTMLElement
  eventName: string

  constructor(target: HTMLElement) {
    this.target = target
    this.eventName = 'controller-input'
    this.keymap = {
      'ArrowLeft': this.left,
      'ArrowUp': this.rotate,
      'ArrowRight': this.right,
      'ArrowDown': this.down,
    }
    this.bind()
  }

  bind() {
    this.target.onkeydown = (e: KeyboardEvent) => {
      if (Object.keys(this.keymap).includes(e.code)) return this.keymap[e.code].bind(this)()
    }
  }

  left(): void {
    console.log('left')
    this.target.dispatchEvent(this.buildControllerEvent('left'))
  }
  right(): void {
    console.log('right')
    this.target.dispatchEvent(this.buildControllerEvent('right'))
  }
  down(): void {
    console.log('down')
    this.target.dispatchEvent(this.buildControllerEvent('down'))
  }
  rotate(): void {
    console.log('rotate')
    this.target.dispatchEvent(this.buildControllerEvent('rotate'))
  }

  private buildControllerEvent(key: string) {
    return new CustomEvent(this.eventName, {
      detail: { key: key }
    });
  }
}
