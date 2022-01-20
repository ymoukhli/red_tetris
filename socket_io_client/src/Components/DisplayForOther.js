import React, { useState } from "react";
import {StyledDisplayForOther} from "../Styles/StyledDisplayForOther"
import DisplayCard from "./DisplayCard";
export default function DisplayForOther({io})
{
    const [grids, setGrids] = useState({});

    io.on("joined", (data) => {
        const tmp = {...grids}
        for (let i = 0; i < data.length; i++)
        {
            const ele = data[i]
            console.log('ele', ele);
            if (ele.id === io.id) continue;
            tmp[ele.id] = ele.playground;
        }
        setGrids(tmp);
    })
   
    io.on("left", ({id}) => {
        const tmp = {...grids}
        const arr = tmp.filter((e) => e.id !== id);
        setGrids(arr);
    })

    io.on("collided", ({id, playground}) => {
        if (id === io.id) return;
        const tmp = {...grids};
        if (tmp[id])
        {
            tmp[id] = playground;
            setGrids(tmp);
        }
    })

    const display = Object.values(grids).map(grid => <DisplayCard grid={grid}></DisplayCard>)
    return (<StyledDisplayForOther>
        {display}
    </StyledDisplayForOther>)
}