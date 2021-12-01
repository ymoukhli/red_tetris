import styled from "styled-components";

export const StyledCell = styled.div`
    width: calc(75vh / ${props => props.height});
    height: calc(75vh / ${props => props.height});
    background-color: coral;
    border: 1px solid black;
`