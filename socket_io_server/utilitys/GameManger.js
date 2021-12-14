const { Grid } = require("./Grid");
const { Player } = require("./Player");
const { getRandomTetri } = require("./tetrimino");

const GameManager = class {
    constructor(socket)
    {
        this.Grid = new Grid(12, 20);
        this.Player = new Player(this.Grid.width / 2, 0, getRandomTetri());
        this.socket = socket;
    }

    move = (x = 0, y = 1) => {
        return (this.Player.updatePlayerPos(x, y, this.Grid));
        // =========================> <========================= //
    }
}
exports.GameManager = GameManager;