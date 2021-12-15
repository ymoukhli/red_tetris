import { useState, useEffect, useCallback} from "react";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { checkLineInGrid } from "../Utilitys/utilitys";

export const useGrid = (tetris, resetTetris, updateTetrimino) =>
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
                resetTetris();
            }

            // ---------- > delete line if any < --------//
            const arr = checkLineInGrid(newGrid);
            for (let i = 0; i < arr.length; i++)
            {
                newGrid.splice(arr[i], 1);
                newGrid.unshift(Array(dimenssion.width).fill([0,'clear']))
            }

            return newGrid;
        }
    }, [tetris])
    
    const setBackendGrid = (backendGrid) => {
        console.log("Updating backendGrid")
        setGrid(backendGrid)
    }
    const resetGrid = () => {

    }
    return [grid, setBackendGrid];
}
