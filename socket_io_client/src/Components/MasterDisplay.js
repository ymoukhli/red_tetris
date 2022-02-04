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

    const {grid, socket, joined, started} = useSelector(state => state);
    const move = ({key}) =>
    {
        if (!joined || !started) return ;
        if (key ==="ArrowRight" || key === "d")
            socket.emit("move", {x: 1, y: 0});
        else if (key === "ArrowLeft" || key === "a")
            socket.emit("move", {x: -1, y: 0});
        else if (key === "ArrowDown" || key === "s")
            socket.emit("move", {x: 0, y: 1});
        else if (key === "ArrowUp" || key === "w")
            socket.emit("rotate", {x: 30, y: { y1: 10, y2: 20}})
        else if (key === "")
            socket.emit("end");
    }
    return (
    <StyledMasterDisplay onKeyDown={e => move(e)} tabIndex="-1">
        <Playground grid={grid}></Playground>
        <Display></Display>
    </StyledMasterDisplay>
    )
}         

                