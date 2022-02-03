import { useState, useEffect} from "react";
import { dimenssion, generateGrid } from "../Utilitys/generateGrid";
import { checkColision, checkLineInGrid } from "../Utilitys/utilitys";
import { getRandomTetri } from "../Utilitys/tetrimino"

export const useGrid = () =>
{
    const [grid, setGrid] = useState(generateGrid());

    const setBackendGrid = (backendGrid) => {
        setGrid(backendGrid)
    }
    
    return [grid, setBackendGrid];
}
