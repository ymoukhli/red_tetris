import React from "react";
import { StyledCell } from "../Styles/StyledCell";


export default function Cell({width,height,type})
{
    return (
        <StyledCell width={width}
        height={height} type={type}></StyledCell>
    )
}