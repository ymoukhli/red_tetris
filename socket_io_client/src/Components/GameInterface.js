import React, { useEffect, useState } from "react";
import { StyledGameInterface, StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import { useTetris } from "../hooks/tetris";
import { useGrid } from "../hooks/grid";
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay";
import Nav from "../Components/Nav";
import DisplayForOther from "./DisplayForOther";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function GameInterface({}) {
  const [tetris, resetTetris] = useTetris();
  const [grid, setBackendGrid] = useGrid(tetris, resetTetris);
  // const [gameOver, setGameOver] = useState(false);
  const [joined, setJoined] = useState(false);
  const [sockets, setSocket] = useState({});
  const [user_id, setUserID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = uuidv4();
    setUserID(userID);
    axios
      .get(`http://localhost:4001/rooms/${e.target.room.value}/${e.target.username.value}/${userID}`)
      .then(() => {
        const ENDPOINT = "http://127.0.0.1:4001/";
        const options = {
          query: {
            userId: userID,
            room: e.target.room.value,
          },
        };
        const socket = io(ENDPOINT, options);

        socket.emit("joinRoom", e.target.room.value);
        // socket.emit("gameStarted")
        setSocket(socket);
        setJoined(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (joined) {
      sockets.on("respond", (data) => {
        setBackendGrid(data.playground);
      });
    }
  }, [joined]);

  const move = ({ key }) => {
    if (!joined) return;
    if (key === "ArrowRight" || key === "d") {
      sockets.emit("move", { x: 1, y: 0 });
    } else if (key === "ArrowLeft" || key === "a") {
      sockets.emit("move", { x: -1, y: 0 });
    } else if (key === "ArrowDown" || key === "s") {
      sockets.emit("move", { x: 0, y: 1 });
    } else if (key === "ArrowUp" || key === "w") {
      sockets.emit("rotate");
    } 
    // else if (key === "") {
    //   sockets.emit("end");
    // }
  };

  return (
    <StyledGameInterfaceWrapper onKeyDown={(e) => move(e)} tabIndex="-1">
      {!joined && <JoinGame handleSubmit={handleSubmit}></JoinGame>}

      {joined && (
        <StyledGameInterface>
          <Nav io={sockets}></Nav>
          <MasterDisplay grid={grid}></MasterDisplay>
          <DisplayForOther io={sockets} user_id={user_id}></DisplayForOther>
        </StyledGameInterface>
      )}
      {/* {gameOver && <div>soso</div>} */}
      {/* <div style="background-color: coral; padding: 5em; border:4px solid black;border-radius: 50%">GameOver</div>} */}
    </StyledGameInterfaceWrapper>
  );
}
