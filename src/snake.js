export class Snake {
  constructor(game) {
    this.game = game;
    this.gridSize = game.gridSize;
    this.reset();
  }

  reset() {
    this.body = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.moveDelay = 150;
    this.lastMove = 0;
  }

  handleInput(key) {
    const directions = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right'
    };

    const newDirection = directions[key];
    if (!newDirection) return;

    const opposites = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };

    if (opposites[newDirection] !== this.direction) {
      this.nextDirection = newDirection;
    }
  }

  move() {
    const now = Date.now();
    if (now - this.lastMove < this.moveDelay) return true;
    this.lastMove = now;

    this.direction = this.nextDirection;
    const head = { ...this.body[0] };

    switch (this.direction) {
      case 'up': head.y--; break;
      case 'down': head.y++; break;
      case 'left': head.x--; break;
      case 'right': head.x++; break;
    }

    // Check wall collision
    if (head.x < 0 || head.x >= this.game.canvas.width / this.gridSize ||
        head.y < 0 || head.y >= this.game.canvas.height / this.gridSize) {
      return false;
    }

    // Check self collision
    if (this.body.some(segment => segment.x === head.x && segment.y === head.y)) {
      return false;
    }

    this.body.unshift(head);
    this.body.pop();
    return true;
  }

  grow() {
    const tail = { ...this.body[this.body.length - 1] };
    this.body.push(tail);
  }

  checkFoodCollision(food) {
    const head = this.body[0];
    if (head.x === food.position.x && head.y === food.position.y) {
      this.grow();
      return true;
    }
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = '#4CAF50';
    this.body.forEach((segment, index) => {
      ctx.fillRect(
        segment.x * this.gridSize,
        segment.y * this.gridSize,
        this.gridSize - 1,
        this.gridSize - 1
      );
    });
  }
}