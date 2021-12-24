import React from "react";
import { StyledScore } from "../Styles/StyledScore";


export default function Score({text, value = 0})
{
    return (
        <StyledScore>{text}{value}</StyledScore>
    )
}