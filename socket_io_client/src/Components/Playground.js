import React from "react";
import { StyledPlayground } from "../Styles/StyledPlayground";
import { dimenssion } from "../Utilitys/generateGrid";
import Cell from "./Cell";


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