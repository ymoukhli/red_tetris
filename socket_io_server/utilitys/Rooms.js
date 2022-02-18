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
  endGame(room) {
    for (const [key, value] of Object.entries(this.data[room].players)) {
      if (!value.gameOver) io.to(key).emit("win");
    }
  }
  startGame(room) {
    io.to(room).emit("display", this.data[room].genaratedTetros);
    for (const [key, value] of Object.entries(this.data[room].players)) {
      value.gameOver = false;
    }

    this.data[room].interval = setInterval(() => {
      let count = 0;
      const plen = Object.keys(this.data[room].players).length;
      for (const [key, value] of Object.entries(this.data[room].players)) {
        if (value.gameOver) count++;
        if (plen > 1 && plen - count <= 1) {
          clearInterval(this.data[room].interval);
          this.endGame(room);
        } else if (plen == 1 && plen - count <= 0) {
          clearInterval(this.data[room].interval);
        }
        value.move(0, 1, room, this.data[room].genaratedTetros);
        if (value.KarmaLines) {
          this.KarmaLines(room, value.id);
          value.KarmaLines = false;
        }
        io.to(key).emit("respond", { Grid: value.Grid, score: value.score, lines: value.lines });
      }
    }, 1000);
  }

  restartGmae(room) {
    const newDataPlayers = {};
    this.data[room].genaratedTetros = utils.RandomTetros(8);
    for (const [key, value] of Object.entries(this.data[room].players)) {
      newDataPlayers[key] = new GameManager(value.username, value.room, this.data[room].genaratedTetros, key);
      delete this.data[room].players[key];
    }
    this.data[room].players = newDataPlayers;
    io.to(room).emit("restart", { users: this.data[room].players });
    console.log(this.data[room].players);
    setTimeout(() => {
      this.startGame(room);
      io.to(room).emit("GStart", true);
    }, 3000);
  }

  KarmaLines(room, user_id) {
    console.log({ room, user_id });
    const playersIds = Object.keys(this.data[room].players).filter((id) => id !== user_id);
    console.log("send karmaLine to :", playersIds);
    /// add the + line in the other players Grid
    playersIds.forEach((user_id) => {
      const playground = this.data[room].players[user_id].Grid.playground;
      utils.AddKarmLine(playground);
    });
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
