import React from "react";
import Playground from "./Playground";

import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import { useSelector } from "react-redux";

export default function MasterDisplay() {
  //#region redux

  const grid = useSelector(state => state.GameInterface.grid);

  //#endregion

  return (
    <StyledMasterDisplay>
      <Playground grid={grid} master></Playground>
    </StyledMasterDisplay>
  );
}
