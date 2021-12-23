const express = require("express");
const http = require("http");
const { nextTick } = require("process");
const socketIo = require("socket.io");
const cors = require("cors")
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const { GameManager } = require("./utilitys/GameManger");
const router = express.Router();

const app = express();
const users = [];
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});



io.on("connection", (socket) => {
  console.log("New client connected");

  let interval;
  const game = new GameManager(socket);

  socket.on("move", (data) => {
    
    if (game.move(data.x,data.y))
    {
      socket.emit("respond", game.Grid);
    }
  })

  socket.on("Rotate", (sok) => {
    if (game.rotate())
    {
      socket.emit("respond", game.Grid);
    }
  })

  socket.on("start", (data) => {
    interval = setInterval(() => {
      game.move();
      socket.emit("respond", game.Grid);
    }, 1000)
  })

  socket.on("joinRoom", data => {
    // add checker
    users.push({username: data.username, room: data.room});
    socket.join(data.room);
    socket.emit("joined");
  })

  socket.on("disconnect", () => {
    if (interval)
      clearInterval(interval);
  });
  
  socket.on("end", (data) => {
    if (interval)
      clearInterval(interval);
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));