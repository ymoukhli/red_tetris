import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Shape  from "./Shapes";


export const StyledDisplay = styled.div`
    width: 100px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 12px;
    background-color: #655D8A; 
`
export default function Display({io})
{
    const [tetriminos, SetTetriminos] = useState([]);

    const display = (data) => {
        console.log("UPDATATING")
        SetTetriminos(() => {
            const tmp = data.slice(0,4)
            return tmp.map(e => {
                    const Component = Shape[e];
                    return <Component />;
            })
        })
    }
    useEffect(() => {

        // io.on("join", display)

        io.on("display", display)
        return (() => {
            io.off("display", display);
            // io.off("join", display);
        })
    },[io])
    return (
        <StyledDisplay>
            {tetriminos}
        </StyledDisplay>
    )
}