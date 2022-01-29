import React from "react";
import { dimenssion } from "../Utilitys/generateGrid";
import Cell from "./Cell";
import styled from "styled-components";

// position: absolute;
export const StyledPlayground = styled.div`

    width: 300px;
    height: 500px;
    display: grid;
    margin: 0 auto;
    grid-template-rows: repeat(${props => props.height}, 25px);
    grid-template-columns: repeat(${props => props.width}, 25px);
`

export default function Playground({grid})
{
    return (
        <StyledPlayground height={dimenssion.height} width={dimenssion.width}>
            {grid.map(x => x.map((y,i) => <Cell
             key={i} 
             type={y[0]} 
             width={grid[0].length} 
             height={grid.length}
             ></Cell>))}
        </StyledPlayground>
    )
}