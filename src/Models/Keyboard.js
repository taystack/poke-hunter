export default class Keyboard {
  static LEFT = 37;
  static RIGHT = 39;
  static UP = 38;
  static DOWN = 40;

  listenForEvents(keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach((key) => {
      this._keys[key] = false;
    });
  }

  _onKeyDown(event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = true;
    }
  }

  _onKeyUp(event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
      event.preventDefault();
      this._keys[keyCode] = false;
    }
  }

  isDown(keyCode) {
    if (!keyCode in this._keys) {
      throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return this._keys[keyCode];
  }

}
