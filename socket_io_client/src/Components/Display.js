import React from "react";
import styled from "styled-components";
import { I, K } from "./Shapes";

export const StyledDisplay = styled.div`
    width: 100px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 12px;
    background-color: #655D8A; 
`
export default function Display()
{
    return (
        <StyledDisplay>
            <I></I>
            <K></K>
        </StyledDisplay>
    )
}