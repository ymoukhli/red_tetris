import React from "react";
import Playground from "./Playground";
import styled from "styled-components";

const StyledMasterDisplay = styled.div`
    // justify-self: center;
    background-color: blue;
    // margin: 0 auto;
    min-width: 50vw;
`
export default function MasterDisplay({grid})
{
    return (
    <StyledMasterDisplay>
        <Playground grid={grid}></Playground>
    </StyledMasterDisplay>
    )
}         

                