import styled from "styled-components";
import { TETRIMINO } from "../Utilitys/tetrimino"

export const StyledCell = styled.div`
    background-color: coral;
    border: 1px solid black;
    background-color: rgb(${props => TETRIMINO[props.type].color})
    `