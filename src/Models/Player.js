class Player {
  static SPEED = 128;

  constructor(map, x, y, loader) {
    this.map = map;
    this.x = x;
    this.y = y;

    this.width = map.tSize;
    this.height = map.tSize;

    this.image = loader.getImage("player");
  }

  move(delta, dirx, diry) {
    // move hero
    const oldX = this.x;
    const oldY = this.y;
    this.x += dirx * Player.SPEED * delta;
    this.y += diry * Player.SPEED * delta;

    // check if we walked into a non-walkable tile
    this._collide(dirx, diry, oldX, oldY);

    // clamp values
    var maxX = this.map.cols * this.map.tSize;
    var maxY = this.map.rows * this.map.tSize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }

  _collide(dirx, diry, oldX, oldY) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;

    // check for collisions on sprite sides
    const lt = this.map.isSolidTileAtXY(left, top);
    const rt = this.map.isSolidTileAtXY(right, top);
    const rb = this.map.isSolidTileAtXY(right, bottom);
    const lb = this.map.isSolidTileAtXY(left, bottom);
    var collision = lt || rt || rb || lb;
    if (!collision) { return; }

    // logTrue({ lt, rt, rb, lb });
    if ((rb || lb) && (diry > 0 || diry < 0)) {
      this.y = oldY;
      console.log("bottom");
      // if ((rt || rb) && (dirx > 0 || dirx < 0)) {
      //   this.x = oldX;
      //   console.log("right");
      // }
    }
    else if ((rt || lt) && (diry > 0 || diry < 0)) {
      this.y = oldY;
      // if (dirx !== 0) this.x = oldX;
      console.log("top");
    } else if ((rt || rb) && (dirx > 0 || dirx < 0)) {
      this.x = oldX;
      // if (diry !== 0) this.y = oldY;
      console.log("right");
    } else if ((lt || lb) && dirx < 0) {
      this.x = oldX;
      if (diry !== 0) this.y = oldY;
      console.log("left");
    }
  }
}

export default Player;

function logTrue(obj) {
  const str = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) str.push(key);
  });
  console.log(str.join());
}
