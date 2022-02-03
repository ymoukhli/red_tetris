const { Grid } = require("./Grid");
const { Player } = require("./Player");
const { getRandomTetri } = require("./tetrimino");
const { checkLineInGrid, generateTetros } = require("./utilitys")
const GameManager = class {

    // ---------- constructor ------- ///
    constructor(username, room, arr, user_id)
    {
        this.id = user_id
        this.Grid = new Grid(10, 20)
        this.lines = 0;
        this.score = 0;
        this.room = room;
        this.username = username;
        this.Player = new Player(arr[0]);
        this.tetrArrayIndexer = 0;
    }

    updateGrid = (tetrArray) =>
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
            const arr = checkLineInGrid(newGrid);
            this.lines += arr.length;
            
            
            for (let i = 0; i < arr.length; i++)
            {
                this.score += i * 10 + arr.length * 3;
                newGrid.splice(arr[i], 1);
                newGrid.unshift(Array(newGrid[0].length).fill([0,'clear']))
            }

            this.score += 1
            io.to(this.room).emit("collided", {
                playground : newGrid,
                lines: this.lines,
                score: this.score,
                username: this.username,
                user_id: this.id
            })

            this.tetrArrayIndexer += 1;
            console.log("GAME MANAGER ::: TETRIMINOS ARRAY: ", tetrArray, tetrArray.length, this.tetrArrayIndexer);
            this.Player = new Player(tetrArray[this.tetrArrayIndexer]);
        }

        // ---------- > delete line if any < --------//

        return newGrid;
    }

    // for setinterval move() :)

    move = (x = 0, y = 1, room = null, tetrArray = []) => {
        console.log('from room', room);
        if (this.Player.updatePlayerPos(x, y, this.Grid))
        {
            this.Grid.playground = this.updateGrid(tetrArray);
            return true;
        }
        else if (y === 1)
        {
            this.Player.collided = true;
            this.Grid.playground = this.updateGrid(tetrArray);
            return true;
        }
        return false;
        // =========================> <========================= //
    }

    rotate = (tetrArray) => {

        if (this.Player.rotatePlayer(0,0,this.Grid))
        {
            this.Grid.playground = this.updateGrid(tetrArray);
            return true;
        }
        return false;
        
    }
}

exports.GameManager = GameManager;