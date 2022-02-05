import React, { useEffect } from "react";
import Playground from "./Playground";
import styled from "styled-components";
import Display from "./Display";
import { useSelector } from "react-redux";


const StyledMasterDisplay = styled.div`
    display: flex;
    width: 50vw;
    min-width: 400px;
`
export default function MasterDisplay()
{

    
    return (
    <StyledMasterDisplay >
        <Playground></Playground>
        <Display></Display>
    </StyledMasterDisplay>
    )
}         

                