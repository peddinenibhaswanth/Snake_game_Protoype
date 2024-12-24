export class Food {
  constructor(game) {
    this.game = game;
    this.gridSize = game.gridSize;
    this.position = { x: 0, y: 0 };
    this.spawn();
  }

  spawn() {
    const maxX = (this.game.canvas.width / this.gridSize) - 1;
    const maxY = (this.game.canvas.height / this.gridSize) - 1;
    
    do {
      this.position = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
      };
    } while (this.checkCollisionWithSnake());
  }

  checkCollisionWithSnake() {
    return this.game.snake.body.some(
      segment => segment.x === this.position.x && segment.y === this.position.y
    );
  }

  draw(ctx) {
    ctx.fillStyle = '#FF5252';
    ctx.fillRect(
      this.position.x * this.gridSize,
      this.position.y * this.gridSize,
      this.gridSize - 1,
      this.gridSize - 1
    );
  }
}