import React, { useEffect, useState } from "react";
import {StyledDisplayForOther} from "../Styles/StyledDisplayForOther"
import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import DisplayCard from "./DisplayCard";
export default function DisplayForOther({io})
{
    const [grids, setGrids] = useState({});
    
    useEffect(() => console.log("GRIDS", grids), [grids]);

    useEffect(() => {
        io.on("joined", (data) => {
            const tmp = {}
            console.log("DATA", data, io.id);
            for (let i = 0; i < data.length; i++)
            {
                const ele = data[i]
                if (ele.id === io.id) continue;
                console.log('ele', ele);
                tmp[ele.id] = ele.playground;
            }
            setGrids(tmp)
        })

        io.on("left", ({id}) => {
            setGrids(prev => {
                const tmp = {...prev}
                delete tmp[id];
                return tmp;
            });
        })
        io.on("collided", ({id, playground}) => {
            if (id === io.id) return;
            setGrids({
                ...grids,
                [id]: playground
            });
        })
    },[io])

    const display = Object.values(grids).map(grid => <DisplayCard grid={grid}></DisplayCard>)
    return (<StyledDisplayForOther>
        {display}
    </StyledDisplayForOther>)
}