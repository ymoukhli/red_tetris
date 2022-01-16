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

    const [room, setRoom] = useState("");
    io.on("joined", ({lines, score, username}) => {

    })
    const userInfo = room.map(x => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart onClick={reset}>start</StyledStart>
        {userInfo}

    </StyledNav>)
} 