const Player = class {
    constructor(x, y, shape)
    {
        this.x = x;
        this.y = y;
        this.shape = shape
    }
    checkColision = (grid, xOffset, yOffset, shape = this.shape) => {
        for (let y = 0; y < shape.length; y++)
        {
            const nextPosY = y + this.y + yOffset;
            for (let x = 0; x < shape[y].length; x++)
            {
                if (shape[y][x] !== 0)
                {
                    const nextPosX = x + this.x + xOffset;
                    if (nextPosX >= grid.width || nextPosX < 0 || nextPosY >= grid.height || grid.playground[nextPosY][nextPosX][1] === "stay")
                    {
                        return true;

                    }
                }
            }
        }
        return false;
    }

    updatePlayerPos = (x, y, grid) => {
        if (!grid) return;
        if (!this.checkColision(grid, x, y))
        {
            this.x += x;
            this.y += y;
            return true;
        }
        return false;
    }
}

exports.Player = Player;