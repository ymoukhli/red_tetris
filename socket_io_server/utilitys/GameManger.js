const { Grid } = require("./Grid");
const { Player } = require("./Player");
const { getRandomTetri } = require("./tetrimino");
const { checkLineInGrid } = require("./utilitys")
const GameManager = class {
    // ----------- shorthands -------- //
    newPlayer = () => new Player(12 / 2, 0, getRandomTetri());

    // ---------- constructor ------- ///
    constructor(socket)
    {
        this.Player = this.newPlayer();
        this.Grid = new Grid(12, 20);
        this.socket = socket;
    }

    updateGrid = () =>
    {
        console.log("updating Grid in Grid class");
        // ----- > reset grid < ---------
        
        const newGrid  = this.Grid.playground.map(x => x.map(y => (y[1] === "clear" ? [0,"clear"] : y)));
        
        // ---------------- > draw < ---------------- //
        this.Player.shape.forEach((element, y) => {
            element.forEach((value, x)=> {
                if (value !== 0)
                {
                    newGrid[y + this.Player.y][x + this.Player.x] = [value, this.Player.collided? "stay" : "clear"]
                }
            });
        });
        
        if (this.Player.collided)
        {
            console.log(newGrid);
            const arr = checkLineInGrid(newGrid);
            for (let i = 0; i < arr.length; i++)
            {
                newGrid.splice(arr[i], 1);
                newGrid.unshift(Array(newGrid[0].length).fill([0,'clear']))
            }
            console.log("player collided");
            this.Player = this.newPlayer();
        }

        // ---------- > delete line if any < --------//

        return newGrid;
    }

    // for setinterval move() :)

    move = (x = 0, y = 1) => {
        if (this.Player.updatePlayerPos(x, y, this.Grid))
        {
            this.Grid.playground = this.updateGrid();
            return true;
        }
        else if (y === 1)
        {
            this.Player.collided = true;
            this.Grid.playground = this.updateGrid();
            return true;
        }
        return false;
        // =========================> <========================= //
    }

    rotate = () => {
        if (this.Player.rotatePlayer(0,0,this.Grid))
        {
            this.Grid.playground = this.updateGrid();
            return true;
        }
        return false;
    }
}

exports.GameManager = GameManager;