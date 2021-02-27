export class Sprite {
  image: HTMLImageElement;
  rectangle: IRectangle;

  constructor(image: HTMLImageElement, rectangle: IRectangle) {
    this.image = image;
    this.rectangle = rectangle;
  }
}
