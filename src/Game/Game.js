import {
  Camera,
  Loader,
  Map,
  Player,
} from "../Models";


export default class Game {
  constructor(context, size) {
    window.game = this;
    this.size = size;

    this.context = context;
    this._previousElapsed = 0;

    this.moveX = 0;
    this.moveY = 0;

    this.tick = this.tick.bind(this);
    this.loader = new Loader();

    var p = this.load();
    Promise.all(p).then((loaded) => {
      this.init();
      requestAnimationFrame(this.tick);
    });
  }

  tick(elapsed) {
    requestAnimationFrame(this.tick);

    this.context.clearRect(0, 0, 512, 512);

    var delta = (elapsed - this._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25);
    this._previousElapsed = elapsed;

    this.update(delta);
    this.render();
  }

  load() {
    return [
      this.loader.loadImage("map"),
      this.loader.loadImage("player"),
    ];
  }

  init() {
    this.map = new Map();
    this.player = new Player(this.map, 160, 160, this.loader);
    this.camera = new Camera(this.map, this.size, this.size);
    this.camera.follow(this.player);
    this.tileAtlas = this.loader.getImage("map");
    this.hero = {
      x: this.size / 2,
      y: this.size / 2,
      image: this.loader.getImage("player"),
    };
  }

  update(delta) {
    let dirx = 0;
    let diry = 0;
    if (this.moveX) dirx = this.moveX / Math.abs(this.moveX);
    else if (this.moveY) diry = this.moveY / - Math.abs(this.moveY);
    this.player.move(delta, dirx, diry);
    this.camera.update();
  }

  _drawLayer(layer) {
    var startCol = Math.floor(this.camera.x / this.map.tSize);
    var endCol = startCol + (this.camera.width / this.map.tSize);
    var startRow = Math.floor(this.camera.y / this.map.tSize);
    var endRow = startRow + (this.camera.height / this.map.tSize);
    var offsetX = -this.camera.x + startCol * this.map.tSize;
    var offsetY = -this.camera.y + startRow * this.map.tSize;

    for (var c = startCol; c <= endCol; c++) {
      for (var r = startRow; r <= endRow; r++) {
        var tile = this.map.getTile(layer, c, r);
        var x = (c - startCol) * this.map.tSize + offsetX;
        var y = (r - startRow) * this.map.tSize + offsetY;
        if (tile !== 0) { // 0 => empty tile
          this.context.drawImage(
            this.tileAtlas, // image
            (tile - 1) * this.map.tSize, // source x
            0, // source y
            this.map.tSize, // source width
            this.map.tSize, // source height
            Math.round(x),  // target x
            Math.round(y), // target y
            this.map.tSize, // target width
            this.map.tSize // target height
          );
        }
      }
    }
  }

  _drawGrid() {
    const width = this.map.cols * this.map.tSize;
    const height = this.map.rows * this.map.tSize;
    let x, y;
    for (let r = 0; r < this.map.rows; r++) {
      x = - this.camera.x;
      y = r * this.map.tSize - this.camera.y;
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(width, y);
      this.context.stroke();
    }
    for (var c = 0; c < this.map.cols; c++) {
      x = c * this.map.tSize - this.camera.x;
      y = - this.camera.y;
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x, height);
      this.context.stroke();
    }
  }

  render() {
    // draw map background layer
    this._drawLayer(0);
    // draw game sprites
    this.context.drawImage(
      this.player.image,
      this.player.screenX - this.player.width / 2,
      this.player.screenY - this.player.height / 2
    );

    // draw map top layer
    this._drawLayer(1);

    this._drawGrid();
  }
}
