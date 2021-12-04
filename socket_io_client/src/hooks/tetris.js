import { useState } from 'react';
import { dimenssion } from '../Utilitys/generateGrid';
import { getRandomTetri, TETRIMINO } from '../Utilitys/tetrimino';


export const useTetris = () => {
    const [tetris, setTetris] = useState(
        {
            pos: {x: dimenssion.width /2, y: 0},
            tetrimino: TETRIMINO[0].shape,
            collided: false
        });

    const updateTetrimino = ({x, y, collided}) => {
        setTetris(prev => ({
            ...prev,
            pos: {x: prev.pos.x + x, y: prev.pos.y + y},
            collided
        }))
    }
    const resetTetris = () => {
        setTetris(
            {
                pos: {x: dimenssion.width /2, y: 0},
                tetrimino: getRandomTetri().shape,
                collided: false
            }
        )
    }
    return [tetris, updateTetrimino, resetTetris];
}