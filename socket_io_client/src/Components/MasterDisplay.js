import React from "react";
import Playground from "./Playground";

import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import { useSelector } from "react-redux";

export default function MasterDisplay() {
  //#region redux

  const grid = useSelector((state) => state.GameInterface.grid);
  const score = useSelector((state) => state.GameInterface.score);
  const lines = useSelector((state) => state.GameInterface.lines);
  const username = useSelector((state) => state.GameInterface.data.username);

  //#endregion

  return (
    <StyledMasterDisplay>
      <Playground grid={grid} master score={score} lines={lines} username={username}></Playground>
    </StyledMasterDisplay>
  );
}
