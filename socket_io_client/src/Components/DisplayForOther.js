import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import styled from "styled-components";

const StyledDisplayForOther = styled.div`
    width: 100%;
    max-width: 50vw;
    display: grid;
    justify-content: space-around;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
`

export default function DisplayForOther({ io, user_id ,multiPlayers}) {
    const [grids, setGrids] = useState({});
  
    useEffect(() => console.log("GRIDS", grids), [grids]);
  
    useEffect(() => {
      io.on("joined", (data) => {
        const tmp = {};

        for (const [key, value] of Object.entries(data.users)) {
          if (key != user_id) tmp[value.username] = value.Grid.playground;
        }
        setGrids(tmp);
      });
  
      io.on("left", ({ username }) => {
        setGrids((prev) => {
          const tmp = { ...prev };
          delete tmp[username];
          return tmp;
        });
      });
      io.on("collided", ({ playground, username }) => {
        setGrids((prev) => {
          const tmp = { ...prev };
          if (tmp[username]) tmp[username] = playground;
          return tmp;
        });
      });
    }, [io]);
    
    const display = Object.values(grids).map((grid, i) => <DisplayCard key={i} grid={grid}></DisplayCard>)
    return (
    <React.Fragment>
        {multiPlayers && <StyledDisplayForOther>
        {display}
        </StyledDisplayForOther>}
    </React.Fragment>)
}