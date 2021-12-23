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
import JoinGame from "./JoinGame";


export default function GameInterface({ io }) {

    const [tetris, updateTetrimino, resetTetris, rotateTetris] = useTetris();
    const [grid, setBackendGrid] = useGrid(tetris, resetTetris);
    const [lineScore] = useLineScore();
    const [gameOver, setGameOver] = useState(false);
    const [score, onLinesDestroy] = useScore();
    const [joined, setJoined] = useState(false);
    const [started, setStarted] = useState(false);
    
    const [otherGrid, setOtherGrid] = useState([]);

    const reset = () => {
        if (!started)
        {
            console.log(started)
            setStarted(true)
            io.emit("start");
        }
    }
    const move = ({key}) =>
    {
        if (!joined) return ;
        if (key ==="ArrowRight" || key == "d")
        {
            io.emit("move", {x: 1, y: 0});
        }
        else if (key === "ArrowLeft" || key === "a")
        {
            io.emit("move", {x: -1, y: 0});
        }
        else if (key === "ArrowDown" || key === "s")
        {
            io.emit("move", {x: 0, y: 1});
        }
        else if (key === "ArrowUp" || key === "w")
        {
            io.emit("Rotate", {x: 30, y: { y1: 10, y2: 20}})
        }
        else if (key === "")
        {
            io.emit("end");
        }
    }

    io.on("joined", (num) => {
        
        setJoined(true);
        console.log("joined")
    })
    io.on("respond", ans => 
    {
        setBackendGrid(ans.playground)
    });

    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {/* playground grid*/}
        {!joined && <JoinGame io={io}></JoinGame>}

        {/* playground area */}
        {joined && <StyledGameInterface>
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