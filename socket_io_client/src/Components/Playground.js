import React from "react";
import { StyledPlayground } from "../Styles/StyledPlayground";
import Cell from "./Cell";


export default function Playground({grid})
{
    return (
        <StyledPlayground>
            {grid.map(x => x.map((y,i) => <Cell
             key={i} 
             type={y[0]} 
             width={grid[0].length} 
             heigth={grid.length}
             ></Cell>))}
        </StyledPlayground>
    )
}