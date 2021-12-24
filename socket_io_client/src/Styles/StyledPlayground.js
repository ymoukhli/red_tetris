import styled from "styled-components";

// position: absolute;
export const StyledPlayground = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, calc(50vw/${props => props.height}));
    grid-template-columns: repeat(${props => props.width}, calc(50vw/${props => props.height}));
    // border: 2px solid black;
`
