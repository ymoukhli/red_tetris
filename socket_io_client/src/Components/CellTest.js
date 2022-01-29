import { TETRIMINO } from "../Utilitys/tetrimino"
import styled from "styled-components";
import React from "react";

const StyledCellTest = styled.div`
    background-color: coral;
    background-color: rgb(${props => TETRIMINO[props.type].color})
    `
export default function Cell({width,height,type})
{
    return (
        <StyledCellTest width={width}
        height={height} type={type}></StyledCellTest>
    )
}