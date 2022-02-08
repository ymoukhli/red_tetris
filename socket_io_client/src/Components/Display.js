import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Shape  from "./Shapes";


export const StyledDisplay = styled.div`
    width: 100px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #655D8A; 
`

export default function Display()
{
    const tetrminosQueue = useSelector(state => state.GameInterface.display);
    const started = useSelector(state => state.Nav.GameStart);
        let tetriminos = [];
        if (started){
            tetriminos = tetrminosQueue.map(e => {
                const Component = Shape[e];
                return <Component />;
            })
        }
        return (
        <StyledDisplay>
            {tetriminos}
        </StyledDisplay>
        )
}