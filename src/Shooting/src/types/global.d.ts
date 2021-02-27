interface IRectangle {
  x: number;
  y: number;
  height: number;
  width: number;
  hitTest: (other: IRectangle) => boolean;
}

interface IGameEvent {
  target: any;
}

type Tags = string[];

type AssetMap = Map<string, HTMLImageElement>;

type KeyMap = Map<string, boolean>;
