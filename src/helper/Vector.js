export default class Vector {
  constructor(x, y, magnitude) {
    this._x = null;
    this._y = null;
    this._mag = null;
    this.setVector(x, y, magnitude);
  }

  setX(x) {
    this._x = x;
    return this;
  }

  getX() {
    return this._x;
  }

  setY(y) {
    this._y = y;
    return this;
  }

  getY() {
    return this._y;
  }

  setMagnitude(magnitude) {
    this._mag = magnitude == null ? 1 : magnitude;
    return this;
  }

  getMagnitude() {
    return this._mag;
  }

  setDirection(x, y) {
    if (typeof x === 'object') {
      this.setX(x.x);
      this.setY(x.y);
      return this;
    }

    this.setX(x);
    this.setY(y);
    return this;
  }

  getDirection() {
    return {x: this._x, y: this._y};
  }

  setVector(x, y, magnitude) {
    if (typeof x === 'object') {
      this.setX(x.x);
      this.setY(x.y);
      this.setMagnitude(x.magnitude);
      return this;
    }

    this.setX(x);
    this.setY(y);
    this.setMagnitude(magnitude);
    return this;
  }

  normalize() {
    let x = this._x;
    let y = this._y;
    const v = Math.sqrt(x * x + y * y);
    x /= v;
    y /= v;
    return new Vector(x, y, this.getMagnitude());
  }
}