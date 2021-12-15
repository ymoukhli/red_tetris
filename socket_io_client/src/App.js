import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import GameInterface from './Components/GameInterface'

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");
  
  
    const socket = io(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.on("respond", data => console.log("RESSPONDING"));
  // useEffect(() => {
  // }, []);

  return (
      <GameInterface io={socket}></GameInterface>
  );
}

export default App;
