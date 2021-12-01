import React, { useState, useEffect } from "react";
import Display from "./Display";
import Playground from "./Playground";
import Button from "./Button";
import Score from "./Score";
import { generateGrid } from "../Utilitys/generateGrid";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";


export default function GameInterface() {

    return (
    <StyledGameInterfaceWrapper>
        <StyledGameInterface>
            <Playground grid={generateGrid(12,30)}></Playground>
            <div>
                <Display></Display>
                <div>
                    <Score text="Score : "></Score>
                    <Score text="Rows : "></Score>
                    <Button text="Start Game"></Button>
                </div>
            </div>
        </StyledGameInterface>
    </StyledGameInterfaceWrapper>
    )
}