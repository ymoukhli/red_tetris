import styled from "styled-components";

export const StyledPlayground = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, calc(60vh/${props => props.height}));
    grid-template-columns: repeat(${props => props.width}, calc(60vh/${props => props.height}));
    border: 3px solid black;
`