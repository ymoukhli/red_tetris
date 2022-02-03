import React from "react";
import { StyledPlayground } from "../Styles/StyledPlayground";
import Cell from "./Cell";


export default function Playground({grid, master})
{
    return (
        <StyledPlayground height={20} width={10} size={master ? 60 : 40}>
            {grid.map(x => x.map((y,i) => <Cell
             key={i} 
             type={y[0]} 
             width={grid[0].length} 
             height={grid.length}
             ></Cell>))}
        </StyledPlayground>
    )
}