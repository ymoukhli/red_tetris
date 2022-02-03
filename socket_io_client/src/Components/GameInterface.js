import React, { useEffect, useState } from "react";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay"
import Nav from "../Components/Nav"
import DisplayForOther from "./DisplayForOther";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import io from "socket.io-client";
import { useSelector, useDispatch} from "react-redux";
import { bindActionCreators } from "redux";
import { action } from "../redux/actions";


const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function GameInterface() {

    const [user_id, setUserID] = useState(null);

    const dispatch = useDispatch();
    const {joined, socket} = useSelector(state => state)
    const { join , setGrid, setSocket, setRoomName} = bindActionCreators(action, dispatch);
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
            const sockets = io(ENDPOINT, options);
    
            sockets.emit("joinRoom", e.target.room.value);
            
            // socket.emit("gameStarted")
            setSocket(sockets);
            join(true);
            setRoomName(e.target.room.value);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const move = ({key}) =>
    {
        if (!joined || !started) return ;
        if (key ==="ArrowRight" || key === "d")
            socket.emit("move", {x: 1, y: 0});
        else if (key === "ArrowLeft" || key === "a")
            socket.emit("move", {x: -1, y: 0});
        else if (key === "ArrowDown" || key === "s")
            socket.emit("move", {x: 0, y: 1});
        else if (key === "ArrowUp" || key === "w")
            socket.emit("rotate", {x: 30, y: { y1: 10, y2: 20}})
        else if (key === "")
            socket.emit("end");
    }

    console.log(joined)
    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {!joined && <JoinGame handleSubmit={handleSubmit}></JoinGame>}

        {joined && <StyledGameInterface>
            <React.StrictMode>

            <Nav io={socket} reset={reset} started={started}></Nav>
            <StyledWrapper>
                <MasterDisplay io={socket}></MasterDisplay>
                <DisplayForOther io={socket} user_id={user_id}></DisplayForOther>
            </StyledWrapper>
            </React.StrictMode>
        </StyledGameInterface>}
    </StyledGameInterfaceWrapper>
    )
}