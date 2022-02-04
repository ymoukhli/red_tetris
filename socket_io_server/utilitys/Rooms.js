const { GameManager } = require("./GameManger");
const utils = require("./utilitys");
const { clearInterval } = require("timers");

const Rooms = class {
  constructor() {
    this.data = {};
  }

  createRoom = (room, username, userID) => {
    if (this.data[room]) {
      //check room nb players
      if (this.data[room].players.length == 4) {
        return false;
      }
      //check player duplication
      if (!this.data[room].players[userID] && !utils.checkPlayersExist(this.data[room].players, username)) {
        this.data[room].players[userID] = new GameManager(username, room, this.data[room].genaratedTetros, userID);
        return true;
      } else {
        return false;
      }
    } else if (this.data == {} || !this.data[room]) {
      this.data[room] = {
        host: userID,
        players: {},
        genaratedTetros: utils.RandomTetros(8),
        interval: null,
      };
      this.data[room].players[userID] = new GameManager(username, room, this.data[room].genaratedTetros, userID);
      return true;
    }
  };

  startGame(room) {
    // io.to(room).emit("display",this.data[room].genaratedTetros);
    this.data[room].interval = setInterval(() => {
      for (const [key, value] of Object.entries(this.data[room].players)) {
        console.log(`${key}: ${value}`);
        value.move(0, 1, room, this.data[room].genaratedTetros);
        io.to(key).emit("respond", value.Grid);
      }
    }, 500);
  }

  clearRoomInterval(room) {
    clearInterval(this.data[room].interval);
    this.data[room].interval = null;
  }

  destroyRoom(room) {
    delete this.data[room];
  }
};

module.exports = new Rooms();
