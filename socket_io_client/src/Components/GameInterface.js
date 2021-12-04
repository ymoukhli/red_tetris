import React, { useState, useEffect } from "react";
import Display from "./Display";
import Playground from "./Playground";
import Button from "./Button";
import Score from "./Score";
import { generateGrid } from "../Utilitys/generateGrid";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"



export default function GameInterface() {

    const [tetris, updateTetrimino, resetTetris] = useTetris();
    const [grid, resetGrid] = useGrid(tetris);

    const checkColision = (dir) => {
        // console.log(dir)
        return dir;
    }
    const moveTetrimino = (dir) => {

        // keeps dir value or return 0 if tetrimnos gonna colide with something horizantaly;
        dir = checkColision(dir);

        updateTetrimino({x: dir, y: 0, collided: false});
    }
    
    const reset = () => {
        resetGrid();
        resetTetris();
    }
    const move = ({key}) =>
    {
        console.log(key);
        if (key ==="ArrowRight" || key == "d")
        {
            moveTetrimino(1);
        }
        if (key === "ArrowLeft" || key === "a")
        {
            moveTetrimino(-1);
        }
    }
    // useEffect(() => {
    //     console.log("updated");
    //     setGrid({
            
    //     });
    // }, [grid]);
    console.log(grid);
    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        <StyledGameInterface>
            <Playground grid={grid}></Playground>
            <div>
                <Display></Display>
                <div>
                    <Score text="Score : "></Score>
                    <Score text="Rows : "></Score>
                    <Button onClick={reset} text="Start Game"></Button>
                </div>
            </div>
        </StyledGameInterface>
    </StyledGameInterfaceWrapper>
    )
}