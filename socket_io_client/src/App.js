import React from "react";
// import io from "socket.io-client";
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

import GameInterface from "./Components/GameInterface";

// const ENDPOINT = "http://127.0.0.1:4001/";
// var options = { query: "userId=" + uuidv4() };
// const socket = io(ENDPOINT, options);

// socket.on("startGame", () => {
//   console.log("MOUNTED: startGAME");

//   socket.emit("gameStarted");
// });
function App() {
  return <GameInterface ></GameInterface>;
}

export default App;
