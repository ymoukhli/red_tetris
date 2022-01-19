import React, { useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";

export default function Nav({io, reset}) {
    // ****** CSS ***** //
    const StyledNav = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    display: flex;
    flex-direction: row;
    border-bottom: 3px solid black;
    `

    const StyledStart = styled.button`
        padding: 1em 3em;
    `

    // ******************* |||| ******************* //

    const [room, setRoom] = useState([]);
    io.on("joined", (users) => {

        const arr = [];
        for (let user in users)
        {
            arr.push({username : users[user].username, score : users[user].score, lines: users[user].score});
        }
        setRoom(arr);
        
    })

    io.on("left", ({username}) => {
        console.log(`${username} left the room`);
        if (!Boolean(room.find(e => e.username === username))) return ;
        const arr = [...room];
        setRoom(arr.filter(e => e.username !== username));
    })
    
    const userInfo = room.map(x => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart onClick={reset}>start</StyledStart>
        {userInfo}
    </StyledNav>)
} 