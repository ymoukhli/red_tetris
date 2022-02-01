import React, { useEffect, useState } from "react";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay"
import Nav from "../Components/Nav"
import DisplayForOther from "./DisplayForOther";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import io from "socket.io-client";


const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function GameInterface() {

    const [tetris, resetTetris] = useTetris();
    const [grid, setBackendGrid] = useGrid(tetris, resetTetris);
    const [sockets, setSocket] = useState({});
    const [user_id, setUserID] = useState(null);
    const [joined, setJoined] = useState(false);
    const [started, setStarted] = useState(false);
    const [multiPlayers, SetMultiPlayers] = useState(false);

    const reset = () => {
      io.emit("start");
    }

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
          sockets.on("started", ()=>{
            setStarted(true);
          });
          sockets.on("respond", (data) => {
            setBackendGrid(data.playground);
          });
          sockets.on("multy", () => {
              SetMultiPlayers(true);
          })
          sockets.on("noMulty", () => {
              SetMultiPlayers(false);
          })
        }
      }, [joined]);

    const move = ({key}) =>
    {
        if (!joined || !started) return ;
        if (key ==="ArrowRight" || key === "d")
            sockets.emit("move", {x: 1, y: 0});
        else if (key === "ArrowLeft" || key === "a")
            sockets.emit("move", {x: -1, y: 0});
        else if (key === "ArrowDown" || key === "s")
            sockets.emit("move", {x: 0, y: 1});
        else if (key === "ArrowUp" || key === "w")
            sockets.emit("rotate", {x: 30, y: { y1: 10, y2: 20}})
        else if (key === "")
            sockets.emit("end");
    }

    console.log(multiPlayers)
    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {!joined && <JoinGame handleSubmit={handleSubmit}></JoinGame>}

        {joined && <StyledGameInterface>
            <React.StrictMode>

            <Nav io={sockets} reset={reset} started={started}></Nav>
            <StyledWrapper>
                <MasterDisplay grid={grid} io={sockets}></MasterDisplay>
                <DisplayForOther multiPlayers={multiPlayers} io={sockets} user_id={user_id}></DisplayForOther>
            </StyledWrapper>
            </React.StrictMode>
        </StyledGameInterface>}
    </StyledGameInterfaceWrapper>
    )
}