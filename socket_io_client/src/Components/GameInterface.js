import React, { useState, useEffect } from "react";
import Display from "./Display";
import Playground from "./Playground";
import Button from "./Button";
import Score from "./Score";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"
import {checkColision , rotateArr} from "../Utilitys/utilitys";


export default function GameInterface({ io }) {

    const [tetris, updateTetrimino, resetTetris, rotateTetris] = useTetris();
    const [grid, resetGrid, setBackendGrid] = useGrid(tetris, resetTetris);

    useEffect(() => {

        const interval = setInterval(() => {
            moveDown()
        }, 1000);
        return () => {
            console.log("unmount gameInterface")
            clearInterval(interval)
        };
    }, [tetris])

    
    const moveDown = () => {
        // if no tetrimino don't update
        if (tetris.tetrimino.length === 1)
            return;

        const tmp = [];
        tetris.tetrimino.forEach((element, y) => element.forEach((val, x) => {
            if (val != 0)
            {
                tmp.push({x: tetris.pos.x + x, y: tetris.pos.y + y + 1});
            }
        }))
        //   next move is a collision with obstacl or not;
        let collided = tmp.some((element, index) => 
                                        (element.y >= grid.length ||
                                        grid[element.y][element.x][1] === "stay"))  
        
        if (collided)
        {
            updateTetrimino({x: 0, y: 0, collided: true});
        }
        else
        {
            updateTetrimino({x: 0, y: 1, collided: false});
        }
    }

    const rotateTetrimino = () => {
        let arr = rotateArr(tetris.tetrimino)
        if (!checkColision(0, 0, grid, tetris, arr))
        {

            rotateTetris(arr);
        }
        else if (!checkColision(1, 0, grid, tetris, arr))
        {
            console.log("shifted to the left");
            rotateTetris(arr, 1);

        }
        else if (!checkColision(-1, 0, grid, tetris, arr))
        {
            rotateTetris(arr, -1);

            console.log("shifted to the right");
        }
        
    }
    const moveTetrimino = (x) => {

        // keeps dir value or return 0 if tetrimnos gonna colide with something horizantaly;
        x = checkColision(x, 0, grid, tetris)? 0: x;

        updateTetrimino({x, y: 0, collided: false});
    }
    
    const reset = () => {
        resetGrid();
        resetTetris();
    }
    const move = ({key}) =>
    {
        if (tetris.tetrimino.length <= 1)
        return;
        if (key ==="ArrowRight" || key == "d")
        {
            io.emit("move", {x: 1, y: 0});
            moveTetrimino(1);
        }
        else if (key === "ArrowLeft" || key === "a")
        {
            io.emit("move", {x: -1, y: 0});
            moveTetrimino(-1);
        }
        else if (key === "ArrowDown" || key === "s")
        {
            io.emit("move", {x: 0, y: 1});
            moveDown();
        }
        else if (key === "ArrowUp" || key === "w")
        {
            io.emit("Rotate", {x: 30, y: { y1: 10, y2: 20}})
            rotateTetrimino();
        }
        io.on("respond", ans => setBackendGrid(ans.playground));
    }
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