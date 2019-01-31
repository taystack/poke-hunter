import {
  MapTiles,
  Character,
} from "../Assets";


const imgMap = {
  "map": MapTiles,
  "player": Character,
};

export default class Loader {
  constructor() {
    this.images = {};
  }

  loadImage(key) {
    const img = new Image();

    const d = new Promise((resolve, reject) => {
      img.onload = () => {
        this.images[key] = img;
        resolve(img);
      }

      img.onerror = () => {
        reject(`Can't load img src="${imgMap[key]}"`);
      }
    });

    img.src = imgMap[key];
    return d;
  }

  getImage(key) {
    return (key in this.images) ? this.images[key] : null;
  }
}
