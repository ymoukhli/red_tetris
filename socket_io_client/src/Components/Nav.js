import React from "react";
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


export default function Nav()
{
    const userInfo = useSelector(state => state.userInfo)
    const roomName = useSelector(state => state.roomName)
    const started = useSelector(state => state.started)
    const io = useSelector(state => state.socket)

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
  
    
    const users = userInfo.map((x) => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);
    console.log("rerender nav")
    return (<StyledNav>
        <StyledStart onClick={reset} room>start</StyledStart>
        {users}
    </StyledNav>)
} 