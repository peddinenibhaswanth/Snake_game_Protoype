import { Snake } from './snake.js';
import { Food } from './food.js';

export class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    if (!this.canvas) {
      throw new Error('Canvas element not found');
    }
    
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.gridSize = 20;
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.score = 0;
    this.scoreElement = document.getElementById('scoreValue');
    this.boundGameLoop = this.gameLoop.bind(this);
    this.setupControls();
  }

  start() {
    if (this.ctx) {
      requestAnimationFrame(this.boundGameLoop);
    }
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {
      this.snake.handleInput(e.key);
    });
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.boundGameLoop);
  }

  update() {
    if (this.snake.move()) {
      if (this.snake.checkFoodCollision(this.food)) {
        this.score += 10;
        this.scoreElement.textContent = this.score;
        this.food.spawn();
      }
    } else {
      this.reset();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw grid lines
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= this.canvas.width; i += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let i = 0; i <= this.canvas.height; i += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvas.width, i);
      this.ctx.stroke();
    }
    
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  reset() {
    this.snake = new Snake(this);
    this.food = new Food(this);
    this.score = 0;
    this.scoreElement.textContent = this.score;
  }
}