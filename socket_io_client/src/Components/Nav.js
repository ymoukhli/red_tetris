import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { StartGame } from "../Store/actions";

export default function Nav() {
  //#region redux

  const {GameInterface, Users} = useSelector(state => state);

  const dispatch = useDispatch();
  //#endregion

  const reset = () => {
    if (GameInterface.roomName) {
      GameInterface.sockets.emit("GameStarter", GameInterface.roomName, (data) => {
        if (typeof data == "string") {
          console.log("issue", data);
          dispatch(StartGame({ type: "error", message: data }));
        } else {
          console.log("passed game start");
          GameInterface.sockets.emit("startGame", GameInterface.roomName);
        }
      });
    } else {
      console.log("error roomName not Set");
    }
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: "auto" }}>
      <Toolbar>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Red tetris
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" variant="contained" onClick={reset}>
          <span style={{ color: "black", fontWeight: "bold" }}>Start</span>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
