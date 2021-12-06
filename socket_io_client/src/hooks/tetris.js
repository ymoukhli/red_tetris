import { useCallback, useEffect, useState } from 'react';
import { dimenssion } from '../Utilitys/generateGrid';
import { getRandomTetri, TETRIMINO } from '../Utilitys/tetrimino';
import {rotateArr} from '../Utilitys/utilitys'

export const useTetris = () => {
    const [tetris, setTetris] = useState(
        {
            pos: {x: dimenssion.width /2, y: 0},
            tetrimino: TETRIMINO[0].shape,
            collided: false
        });
        
    const updateTetrimino = ({x, y, collided}) => {
        console.log("updating Tetris")
        setTetris(prev => ({
            ...prev,
            pos: {x: prev.pos.x + x, y: prev.pos.y + y},
            collided
        }))
    }
    
    const resetTetris = useCallback(() => {
        console.log("reseting tetris")
        setTetris(
            {
                pos: {x: dimenssion.width /2, y: 0},
                tetrimino: getRandomTetri().shape,
                collided: false
            }
        )
    }, []);

    const rotateTetris = (shape) => {
        setTetris(prev => ({
            ...prev,
            tetrimino: shape
        }))
    }
    return [tetris, updateTetrimino, resetTetris, rotateTetris];
}