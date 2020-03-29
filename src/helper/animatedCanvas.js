class AnimatedCanvas {
  constructor(canvasName) {
    this.canvas = document.getElementById(canvasName);
    this.context = this.canvas.getContext('2d');
    this.elements = [];
  }

  draw(drawFunction, index) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const bounds = this.elements[index];
    bounds.x += 10;
    bounds.y += 10;
    drawFunction(bounds.x, bounds.y, bounds.width, bounds.height);
  }
}

export default AnimatedCanvas;
