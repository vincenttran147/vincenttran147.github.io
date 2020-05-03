import Sprite from '../../helper/Sprite';

export default class FadingSmokeSprite extends Sprite {
  constructor(canvas, image, bounds, vector) {
    super(canvas, image, bounds);
    this._vector = vector;
    this.draw();
  }

  draw() {
    this.getBounds().setX(this.getBounds().getX() + this._vector.getX() * this._vector.getMagnitude());
    this.getBounds().setY(this.getBounds().getY() + this._vector.getY() * this._vector.getMagnitude());
    super.draw();
  }
}