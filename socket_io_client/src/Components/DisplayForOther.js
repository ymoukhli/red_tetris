import React, { useState, useEffect } from "react";
import {StyledDisplayForOther} from "../Styles/StyledDisplayForOther"
import DisplayCard from "./DisplayCard";
export default function DisplayForOther({io})
{
    const [grids, setGrids] = useState([]);

    io.on("joined", ({playground, id}) => {
        if (Boolean(grids.find((e) => e.id === id))) return ;
        const tmp = [...grids]
        tmp.push({id, playground})
        setGrids(tmp);
    })
   
    io.on("left", ({id}) => {
        const tmp = [...grids]
        const arr = tmp.filter((e) => e.id !== id);
        setGrids(arr);
    })

    io.on("collided", ({id, playground}) => {
        if (io.id === id) return;
        const tmp = [...grids]
        const arr = tmp.find((e) => e.id === id);
        if (arr)
        {
            arr.playground = playground;
            setGrids(tmp);
        }
    })
    const display = grids.map(e => <DisplayCard grid={e.playground}></DisplayCard>)
    return (<StyledDisplayForOther>
        {display}
    </StyledDisplayForOther>)
}