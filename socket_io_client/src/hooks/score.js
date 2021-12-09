import { useState } from "react";

export const useScore = () => {
    const [score, setScore] = useState(0);

    const onLinesDestroy = (line) => {
        let sum = 0;
        for(let i = 1; i <= line; i++)
        {
            sum += i * 10 + line * 4;
        }
        console.log(`setting score: ${sum}`)
        setScore(prev => prev + sum);
    }
    return [score, onLinesDestroy]
}