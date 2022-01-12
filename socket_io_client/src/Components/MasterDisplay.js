import React from "react";
import Playground from "./Playground";
import Score from "./Score";
import Button from "./Button";
import Display from "./Display";
import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay"

export default function MasterDisplay({grid, score, lineScore, reset})
{
    return (
    <StyledMasterDisplay>
        <Playground grid={grid}></Playground>
    </StyledMasterDisplay>
    )
}         

                