import Camera from "./Camera";


export default class Map {
  constructor() {
    this.cols = 12;
    this.rows = 12;
    this.tSize = 64;

    this.camera = new Camera(this, )
  }

  get layers() {
    return [[
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
      3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
      3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
    ], [
      4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
      4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
    ]];
  }

  getTile(layer, col, row) {
    return this.layers[layer][row * this.cols + col];
  }
}
