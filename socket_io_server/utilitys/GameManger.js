const { Grid } = require("./Grid");
const { Player } = require("./Player");
const { getRandomTetri } = require("./tetrimino");
const { checkLineInGrid, generateTetros } = require("./utilitys")
const GameManager = class {

    // ---------- constructor ------- ///
    constructor(socket, io)
    {
        this.Player = undefined;
        this.Grid = new Grid(12, 20)
        this.socket = socket;
        this.io = io;
        this.lines = 0;
        this.score = 0;
        this.room = "";
        this.username = "";
        this.tetrArray = [];
        this.tetrArrayIndexer = 0;
    }

    addData = (room , username, arr) => {
        this.room = room; 
        this.username = username
        this.Player = new Player(arr[0]);
        this.tetrArray = arr;

    };

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
            const arr = checkLineInGrid(newGrid);
            this.lines += arr.length;
            
            
            for (let i = 0; i < arr.length; i++)
            {
                this.score += i * 10 + arr.length * 3;
                newGrid.splice(arr[i], 1);
                newGrid.unshift(Array(newGrid[0].length).fill([0,'clear']))
            }
            this.io.to(this.room).emit("collided", {
                playground : newGrid,
                lines: this.lines,
                score: this.score,
                username: this.username,
                id: this.socket.id
            })

            this.tetrArrayIndexer += 1;
            console.log("GAME MANAGER ::: TETRIMINOS ARRAY: ", this.tetrArray, this.tetrArray.length, this.tetrArrayIndexer);
            this.Player = new Player(this.tetrArray[this.tetrArrayIndexer]);
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