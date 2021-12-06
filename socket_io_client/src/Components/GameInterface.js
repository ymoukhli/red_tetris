import React, { useState, useEffect } from "react";
import Display from "./Display";
import Playground from "./Playground";
import Button from "./Button";
import Score from "./Score";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { StyledGameInterface , StyledGameInterfaceWrapper } from "../Styles/StyledGameInterface";
import {useTetris} from "../hooks/tetris";
import { useGrid } from "../hooks/grid"



export default function GameInterface() {

    const [tetris, updateTetrimino, resetTetris] = useTetris();
    const [grid, resetGrid] = useGrid(tetris, resetTetris);

    
    const moveDown = () => {
        const tmp = [];
        tetris.tetrimino.forEach((element, y) => element.forEach((val, x) => {
            if (val != 0)
            {
                tmp.push({x: tetris.pos.x + x, y: tetris.pos.y + y + 1});
            }
        }))
        console.log(tmp);
        //   next move is a collision with obstacl or not;
        let collided = tmp.some((element, index) => 
                                        (element.y >= grid.length ||
                                        grid[element.y][element.x][1] === "stay"))  
        
        // let collided = false;
        // for (let i = 0; i < tmp.length; i++)
        // {
            //     if (tmp[i].y >= grid.length || grid[tmp[i].y][tmp[i].x][1] === "stay")
            //     {
                //         collided = true;
                //         // updateTetrimino({x: 0, y: 0, collided: true});
                //         break;
                //     }
                // }
        if (collided)
        {
            updateTetrimino({x: 0, y: 0, collided: true});
            // resetTetris();
        }
        else
        {
            updateTetrimino({x: 0, y: 1, collided: false});
        }
    }
    const checkColision = (dir) => {
        console.log("cheking - horizantal collision");
        const arr = tetris.tetrimino;
        for (let y = 0; y < arr.length; y++)
        {
            const nextPosY = y + tetris.pos.y;
            for (let x = 0; x < arr[y].length; x++)
            {
                if (arr[y][x] !== 0)
                {
                    const nextPosX = x + tetris.pos.x + dir;
                    if (nextPosX >= dimenssion.width || nextPosX < 0 || grid[nextPosY][nextPosX][1] === "stay")
                    {
                        return 0;
                    }
                }       
            }
        }
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

    }
    // useEffect(() => {
    //     console.log("updated");
    //     setGrid({
            
    //     });
    // }, [grid]);
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