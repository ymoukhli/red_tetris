import React, { useState } from "react";
import styled from "styled-components";

export default function InfoCard({username,score,lines}) {
    const StyledInfoCard = styled.div`
    border-left: 2px solid black;
    font-size: 1.2rem;
    padding: 0 1em;
    margin: 0.2em 1em;
    `

    return (<StyledInfoCard>
        <div>username : {username}</div>
        <div>score : {score}</div>
        <div>lines : {lines}</div>
    </StyledInfoCard>)
} 