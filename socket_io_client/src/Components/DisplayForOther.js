import React, { useEffect, useState } from "react";
import { StyledDisplayForOther } from "../Styles/StyledDisplayForOther";
import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import DisplayCard from "./DisplayCard";
export default function DisplayForOther({ io, user_id }) {
  const [grids, setGrids] = useState({});

  useEffect(() => console.log("GRIDS", grids), [grids]);

  useEffect(() => {
    io.on("joined", (data) => {
      const tmp = {};
      console.log("DATA", data.users, user_id);
      for (const [key, value] of Object.entries(data.users)) {
        // console.log(`${key}: ${value}`);
        if (key != user_id)
            tmp[value.username] = value.Grid.playground;
      }
      setGrids(tmp);
    });

    io.on("left", ({ username }) => {
      setGrids((prev) => {
        const tmp = { ...prev };
        delete tmp[username]
        return tmp
      });
    });
    io.on("collided", ({ playground, username }) => {
      setGrids((prev) => {
        const tmp = { ...prev };
        if (tmp[username])
            tmp[username] = playground;
        return tmp
      });
    });
  }, [io]);

  const display = Object.values(grids).map((grid) => (
    <DisplayCard grid={grid}></DisplayCard>
  ));
  return <StyledDisplayForOther>{
    display
    }</StyledDisplayForOther>;
}
