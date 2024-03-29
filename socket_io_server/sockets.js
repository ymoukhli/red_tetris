const socketio = require("socket.io");
const Rooms = require("./utilitys/Rooms");
const utils = require("./utilitys/utilitys");

module.exports = {
  startSocketServer: function (server) {
    io = socketio(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", async function (socket) {
      const userID = socket.handshake.query["userId"];
      const name_room = socket.handshake.query["room"];
      //when you res the api (clean Rooms) will a player stil broadcating from the client side
      if (!Rooms.data[name_room]) {
        console.log(`from player id: ${userID} , room not exist `);
        return;
      }
      const roomObj = Rooms.data[name_room];
      const playerGM = Rooms.data[name_room].players[userID];

      //#region  joining players data
      console.log("user connect", userID, "room", name_room);

      socket.on("joinRoom", () => {
        socket.join(name_room);
        socket.join(userID);

        if (Object.values(roomObj.players).length > 1)
        io.to(name_room).emit("multy");

        io.to(name_room).emit("joined", {
          room: name_room,
          users: roomObj.players,
          tetriminosQueue: roomObj.genaratedTetros
        });
      });
      //#endregion
      
      //#region game start
      socket.on("GameStarter", (room, cb) => {
        if (!room) cb("error no Room passed");
        if (Rooms.data[room].host !== userID) cb("error this user is not the host");
        else cb(true);
      });
      
      socket.on("startGame", (room) => {
        Rooms.startGame(room);
        io.to(room).emit(("started"));
      });
      //#endregion
      
      //#region movments
      socket.on("move", (data) => {
        if (playerGM.move(data.x, data.y, name_room, roomObj.genaratedTetros)) {

          socket.emit("respond", playerGM.Grid);
        }
      });

      socket.on("rotate", () => {
        if (playerGM.rotate(roomObj.genaratedTetros)) {
          socket.emit("respond", playerGM.Grid);
        }
      });
      //#endregion

      //#region leave players updates
      socket.on("disconnect", function () {
        console.log(`user out ${playerGM.username} from room ${name_room}`);
        const room = Rooms.data[name_room];
        delete room.players[userID];
        const playersInRoom = Object.keys(room.players).length;
        if (!playersInRoom) {
          Rooms.clearRoomInterval(name_room);
          Rooms.destroyRoom(name_room);
          console.info("destroy room :", name_room);
        } else if (room.host == userID && playersInRoom) {
          room.host = Object.keys(room.players)[0];
          console.info(`new host for room ${name_room} host is: ${room.host}`);
        }
        io.to(name_room).emit("left", { username: playerGM.username, userID });
        socket.leave(name_room);
        socket.leave(userID);


        if (Object.values(roomObj.players).length === 1)
          io.to(name_room).emit("noMulty");
      });
      //#endregion
    });
    return io;
  },
};
