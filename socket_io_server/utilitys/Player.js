const { rotateArr } = require("./utilitys");
const { TETRIMINO } = require("./tetrimino");

const Player = class {
  constructor(letter) {
    // console.log(TETRIMINO[letter], letter,'--<');
    this.x = 8 / 2;
    this.y = 0;
    this.shape = TETRIMINO[letter].shape;
    this.collided = false;
  }
  checkColision = (grid, xOffset, yOffset, shape = this.shape) => {
    for (let y = 0; y < shape.length; y++) {
      const nextPosY = y + this.y + yOffset;
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const nextPosX = x + this.x + xOffset;
          if (nextPosX >= grid.width || nextPosX < 0 || nextPosY >= grid.height || grid.playground[nextPosY][nextPosX][1] === "stay") {
            return true;
          }
        }
      }
    }
    return false;
  };

  rotatePlayer = (x, y, grid) => {
    if (!grid) return;
    const arr = rotateArr(this.shape);
    if (!this.checkColision(grid, x, y, arr)) {
      this.shape = arr;
      return true;
    } else if (!this.checkColision(grid, x + 1, y, arr)) {
      this.x += 1;
      this.shape = arr;
      return true;
    } else if (!this.checkColision(grid, x - 1, y, arr)) {
      this.x -= 1;
      this.shape = arr;
      return true;
    }
    return false;
  };

  updatePlayerPos = (x, y, grid) => {
    if (!grid) return;
    if (!this.checkColision(grid, x, y)) {
      this.x += x;
      this.y += y;
      return true;
    }
    return false;
  };
};

exports.Player = Player;
