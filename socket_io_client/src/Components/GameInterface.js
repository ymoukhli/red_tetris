import React, { useEffect, useState } from "react";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay"
import Nav from "../Components/Nav"
import DisplayForOther from "./DisplayForOther";

export default function GameInterface({ io }) {

    const [tetris, resetTetris] = useTetris();
    const [grid, setBackendGrid] = useGrid(tetris, resetTetris);
    // const [gameOver, setGameOver] = useState(false);
    const [joined, setJoined] = useState(false);
    

    const reset = () => {

        io.emit("start");
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        io.emit("joinRoom", {username: e.target.username.value, room: e.target.room.value})
    }
    useEffect(() => {

        io.on("join", () => {
            setJoined(true);
        })
        io.on("respond", data => 
        {
            setBackendGrid(data);
        });
    }, [])

    const move = ({key}) =>
    {
        if (!joined) return ;
        if (key ==="ArrowRight" || key === "d")
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
            io.emit("rotate", {x: 30, y: { y1: 10, y2: 20}})
        }
        else if (key === "")
        {
            io.emit("end");
        }
    }

    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {!joined && <JoinGame io={io} handleSubmit={handleSubmit}></JoinGame>}

        {joined && <StyledGameInterface>
            <Nav io={io} reset={reset}></Nav>
            <MasterDisplay grid={grid}></MasterDisplay>
            <DisplayForOther io={io}></DisplayForOther>
        </StyledGameInterface>}
        {/* {gameOver && <div>soso</div>} */}
        {/* <div style="background-color: coral; padding: 5em; border:4px solid black;border-radius: 50%">GameOver</div>} */}
    </StyledGameInterfaceWrapper>
    )
}