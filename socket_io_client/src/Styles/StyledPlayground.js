import styled from "styled-components";

// position: absolute;
export const StyledPlayground = styled.div`
    display: grid;
    justify-self: center;
    place-content: center;
    grid-template-rows: repeat(${props => props.height}, calc(${props => props.size}vw/${props => props.height}));
    grid-template-columns: repeat(${props => props.width}, calc(${props => props.size}vw/${props => props.height}));
    @media (min-aspect-ratio: 1/1) {
        grid-template-rows: repeat(${props => props.height}, calc(${props => props.size}vh/${props => props.height}));
        grid-template-columns: repeat(${props => props.width}, calc(${props => props.size}vh/${props => props.height}));
    }
`
