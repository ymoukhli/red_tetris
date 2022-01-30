import React from "react";
import Playground from "./Playground";
import styled from "styled-components";
import Display from "./Display";

const StyledMasterDisplay = styled.div`
    background-color: blue;
    display: flex;
    width: 50vw;
    min-width: 400px;
`
export default function MasterDisplay({grid, io})
{
    return (
    <StyledMasterDisplay>
        <Playground grid={grid}></Playground>
        <Display io={io}></Display>
    </StyledMasterDisplay>
    )
}         

                