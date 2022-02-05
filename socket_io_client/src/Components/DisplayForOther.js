import React from "react";
import DisplayCard from "./DisplayCard";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledDisplayForOther = styled.div`
    width: 100%;
    max-width: 50vw;
    display: grid;
    justify-content: space-around;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`

export default function DisplayForOther() {

    const multiPlayers = useSelector(state => state.multiPlayers);
    const grids = useSelector(state => state.grids);
    const display = Object.values(grids).map((grid, i) => <DisplayCard key={i} grid={grid}></DisplayCard>)

    return (
    <React.Fragment>
        {multiPlayers && <StyledDisplayForOther>
        {display}
        </StyledDisplayForOther>}
    </React.Fragment>)
}