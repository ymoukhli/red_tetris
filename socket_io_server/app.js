const express = require("express");
const http = require("http");
const { nextTick } = require("process");
const socketIo = require("socket.io");
const cors = require("cors")
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const { GameManager } = require("./utilitys/GameManger");
const router = express.Router();
const  {joinRoom} = require("./utilitys/utilitys");
const { format } = require("path");
const app = express();
const rooms = {};
const locked = {};
const users = {};
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});

const removeUser = (id) => {
  if (users[id])
  {
    rooms[users[id].room] =  rooms[users[id].room].filter(e => e.id !== id);
    delete locked[users[id].room];
    delete users[id];
  }
}

const addUser = (id, room, username) => {
  if (!userExist(room, username)) return ;
  if (!rooms[room])
  {
    rooms[room] = [];
  }
  locked[room] = false;
  rooms[room].push({id, username});
  users[id] = { room, username};
}
const userExist = (room, username) => {
  if (!rooms[room]) return false;
  return Boolean(rooms[room].find(e => e.username === username));
}
const usersInRoom = (room) => rooms[room] ? rooms[room].length : 0;

io.on("connection", (socket) => {
  console.log("New client connected");
  let interval;
  
  const game = new GameManager(socket, io);

  socket.on("move", (data) => {
    if (game.move(data.x,data.y))
    {
      socket.emit("respond", game.Grid.playground);
    }
  })

  socket.on("rotate", (sok) => {
    if (game.rotate())
    {
      socket.emit("respond", game.Grid.playground);
    }
  })

  socket.on("start", () => {
    if (locked[users[socket.id].room]) return ;
      locked[users[socket.id].room] = true;
      io.to(users[socket.id].room).emit("startGame");
    })
  socket.on("gameStarted", () => {
    interval = setInterval(() => {
      game.move();
      socket.emit("respond", game.Grid.playground);
    }, 1000);
  })
  socket.on("joinRoom", ({username, room}) => {
    // join room 
    if (!username || !room || (locked[room] && locked[room] === false)) return ;
    addUser(socket.id, room, username);
    socket.join(room);
    addData(room, username)

      io.to(room).emit("joined", {
        playground : game.Grid.playground,
        lines: game.lines,
        score: game.score,
        username: game.username
      });

  })

  socket.on("disconnect", () => {
    // disconnect
    removeUser(socket.id);
  });
  
});

server.listen(port, () => console.log(`Listening on port ${port}`));