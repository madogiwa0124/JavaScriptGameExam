export class AssetLoader {
  private assets: AssetMap;
  private promises: Array<Promise<HTMLImageElement>>;

  constructor() {
    this.assets = new Map();
    this.promises = [];
  }

  addImage(name: string, url: string): void {
    const img = new Image();
    img.src = url;
    const promise = this.loadedPushImageToAssetsPromise(name, img);
    this.promises.push(promise);
  }

  loadAll(): Promise<AssetMap> {
    return Promise.all(this.promises).then((_p) => this.assets);
  }

  get(name: string) {
    return this.assets.get(name);
  }

  private loadedPushImageToAssetsPromise(name: string, img: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve) =>
      img.addEventListener("load", (e) => {
        this.assets.set(name, img);
        resolve(img);
      })
    );
  }
}
