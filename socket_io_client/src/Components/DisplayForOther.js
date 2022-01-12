import React from "react";
import {StyledDisplayForOther} from "../Styles/StyledDisplayForOther"
import DisplayCard from "./DisplayCard";
export default function DisplayForOther({grid})
{
    return (<StyledDisplayForOther>
        <DisplayCard grid={grid}></DisplayCard>
        <DisplayCard grid={grid}></DisplayCard>
        <DisplayCard grid={grid}></DisplayCard>
    </StyledDisplayForOther>)
}