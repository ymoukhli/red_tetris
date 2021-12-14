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

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  const game = new GameManager(socket);
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  //   clearInterval(interval);
  // });
  socket.on("move", (data) => {
    
    if (game.move(data.x,data.y))
    {
      socket.emit("respond", game.Grid);
      console.log("emiting \"respond\"")
    }
    console.log("moveRight");
  })
  socket.on("Rotate", (sok) => {
    console.log("Rotate");
  })
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));