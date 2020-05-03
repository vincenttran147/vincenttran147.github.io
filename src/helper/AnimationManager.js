class AnimationManager {
  constructor() {
    this._sprites = [];
    this.update();
  }

  register(sprite) {
    this._sprites.push(sprite);
    return this;
  }

  unregister(sprites) {
    sprites = Array.isArray(sprites) ? sprites : [sprites];
    for (let i = 0; i < sprites.length; ++i) {
      const index = this._sprites.indexOf(sprites[i]);
      if (index > 0) {
        this._sprites.splice(index, 1);
      }
      delete sprites[i];
      console.log(this._sprites.length);
    }
  }

  update() {
    if (this._sprites.length > 0) {
      const canvas = this._sprites[0]._canvas;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < this._sprites.length; ++i) {
        this._sprites[i].draw();
      }
    }
    requestAnimationFrame(this.update.bind(this));
    return this;
  }
}

export default new AnimationManager();
