import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Shape  from "./Shapes";


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
    const { tetrminosQueue , started }  = useSelector(state => state);
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