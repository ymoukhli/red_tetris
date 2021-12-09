import React, { useState, useEffect } from "react";
import Display from "./Display";
import Playground from "./Playground";
import Button from "./Button";
import Score from "./Score";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"
import {useLineScore} from "../hooks/lineScore"
import { useScore } from "../hooks/score";
import {checkColision , rotateArr} from "../Utilitys/utilitys";


export default function GameInterface() {

    const [tetris, updateTetrimino, resetTetris, rotateTetris] = useTetris();
    const [score, onLinesDestroy] = useScore();
    const [lineScore, updateLineScore] = useLineScore(0);
    const [gameOver, setGameOver] = useState(false);
    
    const updateGameOver = (bolo) => 
    {
        setGameOver(bolo);
    }
    const [grid, resetGrid] = useGrid(tetris, resetTetris,onLinesDestroy, updateLineScore,updateGameOver);

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
            rotateTetris(arr, 1);
        }
        else if (!checkColision(-1, 0, grid, tetris, arr))
        {
            rotateTetris(arr, -1);
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
            moveTetrimino(1);
        }
        else if (key === "ArrowLeft" || key === "a")
        {
            moveTetrimino(-1);
        }
        else if (key === "ArrowDown" || key === "s")
        {
            moveDown();
        }
        else if (key === "ArrowUp" || key === "w")
        {
            rotateTetrimino();
        }
    }
    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        {!gameOver && <StyledGameInterface>
            <Playground grid={grid}></Playground>
            <div>
                <Display></Display>
                <div>
                    <Score text="Score : " value={score}></Score>
                    <Score text="Rows : " value={lineScore}></Score>
                    <Button onClick={reset} text="Start Game"></Button>
                </div>
            </div>
        </StyledGameInterface>}
        {gameOver && <div>soso</div>}
        {/* <div style="background-color: coral; padding: 5em; border:4px solid black;border-radius: 50%">GameOver</div>} */}
    </StyledGameInterfaceWrapper>
    )
}