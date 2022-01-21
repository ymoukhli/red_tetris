import React from "react";
import io from "socket.io-client";

import GameInterface from './Components/GameInterface'

const ENDPOINT = "http://127.0.0.1:4001";
const socket = io(ENDPOINT);

socket.on("startGame", () => {
  console.log("MOUNTED: startGAME");
  
  socket.emit("gameStarted")
})
function App() {
  
  

  
  return (
      <GameInterface io={socket}></GameInterface>
  );
}

export default App;
