import { useState, useEffect, useCallback} from "react";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { checkColision, checkLineInGrid } from "../Utilitys/utilitys";
import { getRandomTetri } from "../Utilitys/tetrimino"

export const useGrid = (tetris, resetTetris, onLinesDestroy, updateLineScore, updateGameOver) =>
{
    const [grid, setGrid] = useState(generateGrid());

    useEffect(() => {
        setGrid(prev => updateGrid(prev));
        const updateGrid = (prev) => {
            console.log("use Effect: updating grid");
            // ----- > reset grid < ---------
            
            const newGrid  = prev.map(x => x.map(y => (y[1] === "clear" ? [0,"clear"] : y)));
            
            // ---------------- > draw < ---------------- //
            tetris.tetrimino.forEach((element, y) => {
                element.forEach((value, x)=> {
                    if (value !== 0)
                    {
                        newGrid[y + tetris.pos.y][x + tetris.pos.x] = [value, tetris.collided? "stay" : "clear"]
                    }
                });
            });
            if (tetris.collided)
            {
                if (checkColision(0,0,grid,
                    {
                        pos: {x: dimenssion.width /2, y: 0},
                        tetrimino: getRandomTetri().shape,
                        collided: false
                    }))
                    {
                        updateGameOver(true);
                    }

                resetTetris();
            }

            // ---------- > delete line if any and update score and row < --------//
            const arr = checkLineInGrid(newGrid);
            if (arr.length >= 1)
            {
                onLinesDestroy(arr.length);
                updateLineScore(arr.length);
            }
            for (let i = 0; i < arr.length; i++)
            {
                newGrid.splice(arr[i], 1);
                newGrid.unshift(Array(dimenssion.width).fill([0,'clear']))
            }
            return newGrid;
        }
    }, [tetris])
    
    const setBackendGrid = (backendGrid) => {
        setGrid(backendGrid)
    }
    
    return [grid, setBackendGrid];
}
