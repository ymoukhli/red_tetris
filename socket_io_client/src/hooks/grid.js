import { useState, useEffect } from "react";
import { generateGrid } from "../Utilitys/generateGrid";

export const useGrid = (tetris) =>
{
    const [grid, setGrid] = useState(generateGrid());

    
    useEffect(() => {
        setGrid(prev => updateGrid(prev));
        const updateGrid = (prev) => {
            console.log("rendered");
            // let newGrid = [...prev];
            // ----- > reset grid < ---------
            
            const newGrid  = prev.map(x => x.map(y => (y[1] === "clear" ? [0,"clear"] : y)));
            
            // -------- > draw < ----------
            tetris.tetrimino.forEach((element, y) => {
                element.forEach((value, x)=> {
                    if (value !== 0)
                    {
                        newGrid[y + tetris.pos.y][x + tetris.pos.x] = [value, `${tetris.collided? "stay" : "clear"}`]
                    }
                });
            });
            return newGrid;
        }
    }, [tetris])
    
    const resetGrid = () => {

    }
    return [grid, resetGrid];
}
