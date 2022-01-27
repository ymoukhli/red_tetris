import styled from "styled-components";

// position: absolute;
export const StyledPlayground = styled.div`

    width: 300px;
    height: 500px;
    display: grid;
    justify-self: center;
    grid-template-rows: repeat(${props => props.height}, 25px);
    grid-template-columns: repeat(${props => props.width}, 25px);

`
