import React from "react";
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
import initSocket from "../sockets";

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function GameInterface() {


  const dispatch = useDispatch();
  const ac = bindActionCreators(action, dispatch);
  const { join , setRoomName, setUserID} = ac;
  const joined = useSelector(state => state.joined)
  const socket = useSelector(state => state.socket)
  const userID = useSelector(state => state.userID)
  const started = useSelector(state => state.started)

    const handleSubmit = (e) => {
        e.preventDefault();
        const tmpUserID = uuidv4();
        setUserID(tmpUserID);
        axios
          .get(`http://localhost:4001/rooms/${e.target.room.value}/${e.target.username.value}/${tmpUserID}`)
          .then(() => {
            const ENDPOINT = "http://127.0.0.1:4001/";
            const options = {
              query: {
                userId: tmpUserID,
                room: e.target.room.value,
              },
            };
            const sockets = io(ENDPOINT, options);
            sockets.emit("joinRoom", e.target.room.value);
            join(true);
            setRoomName(e.target.room.value);
            initSocket(sockets, ac, tmpUserID);
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


    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {!joined && <JoinGame handleSubmit={handleSubmit}></JoinGame>}

        {joined && <StyledGameInterface>
            <React.StrictMode>

            <Nav io={socket} started={started}></Nav>
            <StyledWrapper>
                <MasterDisplay io={socket}></MasterDisplay>
                <DisplayForOther io={socket} user_id={userID}></DisplayForOther>
            </StyledWrapper>
            </React.StrictMode>
        </StyledGameInterface>}
    </StyledGameInterfaceWrapper>
    )
}