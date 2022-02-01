import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";

const StyledNav = styled.div`
top: 0;
width: 100vw;
display: flex;
flex-direction: row;
border-bottom: 3px solid black;
`

const StyledStart = styled.button`
    padding: 1em 3em;
`


export default function Nav({ io ,started}) {
    const [room, setRoom] = useState({});
    const [roomName, setRoomName] = useState(null);
  
    const reset = () => {
      if (roomName && !started) {
        io.emit("GameStarter", roomName, (data) => {
          if (typeof data == "string") {
            console.log("issue", data);
          } else {
            console.log("passed game start");
            io.emit("startGame", roomName);
          }
        });
      } else {
        console.log("error roomName not Set");
      }
    };
  
    useEffect(() => {
      io.on("joined", ({ room, users }) => {
        setRoom(users);
        setRoomName(room);
      });
  
      io.on("collided", ({ score, lines, user_id }) => {
        setRoom((prev) => {
          const tmp = { ...prev };
          tmp[user_id].score = score;
          tmp[user_id].lines = lines;
          return tmp;
        });
      });
  
      io.on("left", ({ userID }) => {
        setRoom((prev) => {
          const tmp = { ...prev };
          delete tmp[userID];
          return tmp;
        });
      });
    }, []);
    
    const userInfo = Object.values(room).map((x) => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart onClick={reset}>start</StyledStart>
        {userInfo}
    </StyledNav>)
} 