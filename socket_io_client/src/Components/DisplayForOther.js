import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import styled from "styled-components";

const StyledDisplayForOther = styled.div`
    background-color: red;
    width: 100%;
    display: grid;
    justify-content: space-around;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`


export default function DisplayForOther({io,multiPlayers})
{
    const [grids, setGrids] = useState({});
    
    useEffect(() => {

        console.log("first render")

        io.on("joined", (data) => {
            const tmp = {}
            console.log("DATA", data, io.id);
            for (let i = 0; i < data.length; i++)
            {
                const ele = data[i]
                if (ele.id === io.id) continue;
                tmp[ele.id] = ele.playground;
            }
            setGrids(tmp)
        })

        io.on("left", ({id}) => {
            console.log("leaving")
            setGrids(prev => {
                const tmp = {...prev}
                delete tmp[id];
                return tmp;
            });
        })
        io.on("collided", ({id, playground}) => {
            if (id === io.id) return;
            setGrids((pev) => {
                console.log(pev);
                return {
                    ...pev,
                    [id]: playground
                }
            });
        })
    },[io])

    const display = Object.values(grids).map((grid, i) => <DisplayCard key={i} grid={grid}></DisplayCard>)
    return (
    <React.Fragment>
        {multiPlayers && <StyledDisplayForOther>
        {display}
        </StyledDisplayForOther>}
    </React.Fragment>)
}