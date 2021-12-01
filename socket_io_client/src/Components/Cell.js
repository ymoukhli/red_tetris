import React from "react";
import { StyledCell } from "../Styles/StyledCell";


export default function Cell({width,heigth})
{
    return (
        <StyledCell width={width}
        heigth={heigth}>Cell</StyledCell>
    )
}