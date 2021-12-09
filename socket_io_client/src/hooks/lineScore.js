import { useState } from "react";

export const useLineScore = () => {
    const [lineScore, setLineScore] = useState(0);

    const updateLineScore = (lines) => {
        setLineScore(prev => prev + lines);
    }

    return [lineScore, updateLineScore];
}