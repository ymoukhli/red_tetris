import React  from "react";
import styled from "styled-components";

    const StyledInfoCard = styled.div`
    border-left: 2px solid black;
    font-size: 1.2rem;
    padding: 0 1em;
    margin: 0.2em 1em;
    `
export default function InfoCard({username,score,lines}) {

    return (<StyledInfoCard>
        <div>username : {username}</div>
        <div>score : {score}</div>
        <div>lines : {lines}</div>
    </StyledInfoCard>)
} 