export default class Bounds {
  constructor(x, y, width, height) {
    this._x = null;
    this._y = null;
    this._width = null;
    this._height = null;

    if (x instanceof Bounds) {
      this.setBounds(x);
      return this;
    }

    this.setBounds({ x, y, width, height });
    return this;
  }

  setX(x) {
    if (x == null) {
      return this;
    }

    this._x = x;
    return this;
  }

  getX() {
    return this._x;
  }

  setY(y) {
    if (y == null) {
      return this;
    }

    this._y = y;
    return this;
  }

  getY() {
    return this._y;
  }

  setWidth(width) {
    if (width == null) {
      return this;
    }

    this._width = width;
    return this;
  }

  getWidth() {
    return this._width;
  }

  setHeight(height) {
    if (height == null) {
      return this;
    }

    this._height = height;
    return this;
  }

  getHeight() {
    return this._height;
  }

  setBounds(x, y, width, height) {
    if (x == null) {
      return this;
    }

    if (typeof x === 'object') {
      this.setX(x.x);
      this.setY(x.y);
      this.setWidth(x.width);
      this.setHeight(x.height);
      return this;
    }

    if (x instanceof Bounds) {
      this.setX(x.getX());
      this.setY(x.getY());
      this.setWidth(x.getWidth());
      this.setHeight(x.getHeight());
      return this;
    }

    this.setX(x);
    this.setY(y);
    this.setWidth(width);
    this.setHeight(height);
    return this;
  }

  clone() {
    return new Bounds(this._x, this._y, this._width, this._height);
  }
}