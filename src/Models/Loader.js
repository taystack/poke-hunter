export default class Loader {
  constructor() {
    this.images = {};
  }

  loadImage(key, src) {
    const img = new Image();

    const d = new Promise((resolve, reject) => {
      img.onload = () => {
        this.images[key] = img;
        resolve(img);
      }

      img.onerror = () => {
        reject(`Can't load img src="${src}"`);
      }
    });
  }

  getImage(key) {
    return (key in this.images) ? this.images[key] : null;
  }
}
