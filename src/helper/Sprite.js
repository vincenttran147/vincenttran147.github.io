import Bounds from './Bounds';
import AnimationManager from './AnimationManager';

export default class Sprite {
  constructor(canvas, image, bounds) {
    this._canvas = canvas;
    this._image = new Image();
    this._image.src = image;
    this._context = canvas.getContext('2d');
    this._bounds = bounds == null ? new Bounds(0, 0, 100, 100) : bounds.clone();

    this._image.onload = () => {
      AnimationManager.register(this);
      this.draw();
    }
  }

  setBounds(bounds) {
    this._bounds.setBounds(bounds);
    return this;
  }

  getBounds() {
    return this._bounds;
  }

  draw() {
    const x = this._bounds.getX();
    const y = this._bounds.getY();
    const width = this._bounds.getWidth();
    const height = this._bounds.getHeight();
    this._context.drawImage(this._image, 0, 0, this._image.width, this._image.height, x, y, width, height);
    return this;
  }

  dispose() {
    AnimationManager.unregister(this);
  }
}
