import styled from "styled-components";

// position: absolute;
export const StyledPlayground = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, calc(50vw/${props => props.height}));
    grid-template-columns: repeat(${props => props.width}, calc(50vw/${props => props.height}));
    @media (min-aspect-ratio: 1/1) {
        grid-template-rows: repeat(${props => props.height}, calc(50vh/${props => props.height}));
        grid-template-columns: repeat(${props => props.width}, calc(50vh/${props => props.height}));
    }
    
    // border: 2px solid black;
`
