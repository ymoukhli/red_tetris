import React from "react";
import styled from "styled-components";

export const StyledScore = styled.div`
`

export default function Score({text, value = 0})
{
    return (
        <StyledScore>{text}{value}</StyledScore>
    )
}