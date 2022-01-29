import React from "react";
import styled from "styled-components";
import { dimenssion } from "../Utilitys/generateGrid";
import CellTest from "./CellTest";

const StyledPlaygroundTest = styled.div`
width: 144px;
height: 240px;
display: grid;
justify-self: center;
grid-template-rows: repeat(${props => props.height}, 12px);
grid-template-columns: repeat(${props => props.width}, 12px);
`

export default function PlaygroundTest({grid})
{
    return (
        <StyledPlaygroundTest height={dimenssion.height} width={dimenssion.width}>
            {grid.map(x => x.map((y,i) => <CellTest
             key={i} 
             type={y[0]} 
             width={grid[0].length} 
             height={grid.length}
             ></CellTest>))}
        </StyledPlaygroundTest>
    )
}