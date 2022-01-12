import React, { useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";

export default function Nav({room}, io) {
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

    const userInfo = room.map(x => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart>start</StyledStart>
        {userInfo}

    </StyledNav>)
} 