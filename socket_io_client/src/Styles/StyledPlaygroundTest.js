import styled from "styled-components";

// position: absolute;
export const StyledPlaygroundTest = styled.div`
    display: grid;
    justify-self: center;
    grid-template-rows: repeat(${props => props.height}, calc(40vw/${props => props.height}));
    grid-template-columns: repeat(${props => props.width}, calc(40vw/${props => props.height}));
    @media (min-aspect-ratio: 1/1) {
        grid-template-rows: repeat(${props => props.height}, calc(40vh/${props => props.height}));
        grid-template-columns: repeat(${props => props.width}, calc(40vh/${props => props.height}));
    }
`
