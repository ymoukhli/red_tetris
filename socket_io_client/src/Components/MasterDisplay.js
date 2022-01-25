import React from "react";
import Playground from "./Playground";

import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay"

export default function MasterDisplay({grid})
{
    return (
    <StyledMasterDisplay>
        <Playground grid={grid}></Playground>
    </StyledMasterDisplay>
    )
}         

                