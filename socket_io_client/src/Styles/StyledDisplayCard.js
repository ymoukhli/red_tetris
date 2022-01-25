import styled from "styled-components";


export const StyledDisplayCard = styled.div`
    // background-color: #333;
    display: grid;
    grid-template-areas:
                "a a"
                "b c"
                "d d";
    grid-template-rows: 20px 20px 1fr;
`