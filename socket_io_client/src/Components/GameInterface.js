import React, { useEffect, useState } from "react";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay"
import Nav from "../Components/Nav"
import DisplayForOther from "./DisplayForOther";
import styled from "styled-components";


const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
export default function GameInterface({ io }) {

    const [tetris, resetTetris] = useTetris();
    const [grid, setBackendGrid] = useGrid(tetris, resetTetris);
    const [joined, setJoined] = useState(false);
    const [multiPlayers, SetMultiPlayers] = useState(false);

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
        io.on("multy", () => {
            console.log("setting multy")
            SetMultiPlayers(true);
        })
        io.on("noMulty", () => {
            console.log("setting no multy")
            SetMultiPlayers(false);
        })
        io.on("respond", data => 
        {
            setBackendGrid(data);
        });
    }, [io, setBackendGrid])

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
    console.log(multiPlayers)
    return (
    <StyledGameInterfaceWrapper onKeyDown={e => move(e)} tabIndex="-1">
        
        {!joined && <JoinGame io={io} handleSubmit={handleSubmit}></JoinGame>}

        {joined && <StyledGameInterface>
            <React.StrictMode>

            <Nav io={io} reset={reset}></Nav>
            <StyledWrapper>
                <MasterDisplay grid={grid}></MasterDisplay>
                {/* display only whene someone joined */}
                <DisplayForOther multiPlayers={multiPlayers} io={io}></DisplayForOther>
            </StyledWrapper>
            </React.StrictMode>
        </StyledGameInterface>}
        {/* {gameOver && <div>soso</div>} */}
        {/* <div style="background-color: coral; padding: 5em; border:4px solid black;border-radius: 50%">GameOver</div>} */}
    </StyledGameInterfaceWrapper>
    )
}