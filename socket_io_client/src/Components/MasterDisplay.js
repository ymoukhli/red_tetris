import React from "react";
import Playground from "./Playground";

import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import { useSelector } from "react-redux";

export default function MasterDisplay() {
  //#region redux

  const state = useSelector((state) => {
    return state;
  });

  //#endregion

  return (
    <StyledMasterDisplay>
      <Playground grid={state.GameInterface.grid} master></Playground>
    </StyledMasterDisplay>
  );
}
