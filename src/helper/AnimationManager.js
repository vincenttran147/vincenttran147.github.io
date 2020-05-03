class AnimationManager {
  constructor(canvas) {
    this._canvas = canvas;
    this._sprites = [];
    this.update();
  }

  registerCanvas(canvas) {
    this._canvas = canvas;
    return this;
  }

  register(sprite) {
    this._sprites.push(sprite);
    return this;
  }

  unregister(sprites) {
    sprites = Array.isArray(sprites) ? sprites : [sprites];
    for (let i = 0; i < sprites.length; ++i) {
      const index = this._sprites.indexOf(sprites[i]);
      if (index >= 0) {
        this._sprites.splice(index, 1);
      }
      delete sprites[i];
    }
  }

  update() {
    if (this._canvas == null) {
      requestAnimationFrame(this.update.bind(this));
      return this;
    }
    
    const context = this._canvas.getContext('2d');
    context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    if (this._sprites.length === 0) {
      return this;
    }

    for (let i = 0; i < this._sprites.length; ++i) {
      this._sprites[i].draw();
    }
    requestAnimationFrame(this.update.bind(this));
    return this;
  }
}

export default new AnimationManager();
