import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    const { room, roomName} = useSelector(state => state)

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
  
    
    const userInfo = Object.values(room).map((x) => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart onClick={reset} room>start</StyledStart>
        {userInfo}
    </StyledNav>)
} 