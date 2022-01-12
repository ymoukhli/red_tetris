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
const users = {};
const rooms = {};
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors : {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});


const removeFromRoom = (id) =>
{
  for (const [key, value] of Object.entries(rooms))
  {
    if (value.find(e => e.id === id))
    {
      rooms[key].splice(rooms[key].indexOf(rooms[key].find(e => e.id === id)), 1)
      return key;
    }
  }
}
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
    users[socket.socket_id]={username: data.username, room: data.room};
    if (!joinRoom(rooms, data, socket.id) && rooms[data.room].length < 4)
    {
      socket.join(data.room);
      io.to(data.room).emit("joined", rooms[data.room]);
      console.log(`player joined room ${data.room}`)
    }
  })

  socket.on("disconnect", () => {
    console.log('user disconect -->', io.sockets.adapter.rooms);
    for (let i = 0; i <  socket.adapter.rooms.length; i++) {
      const element =  socket.adapter.rooms[i];
      console.log('->', element);
    }
    if (interval)
      clearInterval(interval);
      
      const room = removeFromRoom(socket.id);
      io.to(room).emit("joined", rooms[room]);
  });
  
  socket.on("end", () => {
    if (interval)
      clearInterval(interval);
    const room = removeFromRoom(socket.id);
    io.to(room).emit("joined", rooms[room]);
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));