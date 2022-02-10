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

  const roomName = useSelector((state) => state.GameInterface.roomName);
  const sockets = useSelector((state) => state.GameInterface.sockets);
  const GameStart = useSelector((state) => state.Nav.GameStart);

  const dispatch = useDispatch();
  //#endregion

  const reset = () => {
    if (GameStart){
      console.log('Game already started');
      return
    }
    if (roomName) {
      console.log('in');
      sockets.emit("GameStarter", roomName, (data) => {
        if (typeof data == "string") {
          console.log("issue", data);
          dispatch(StartGame({ type: "error", message: data }));
        } else {
          console.log("passed game start");
          sockets.emit("startGame", roomName);
        }
      });
    } else {
      console.log("error roomName not Set");
    }
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ bottom: "auto", top: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Red tetris
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {roomName ? (
          <Typography variant="h6" component="div">
            Room: {roomName}
          </Typography>
        ) : (
          ""
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" variant="contained" onClick={reset}>
          <span style={{ color: "black", fontWeight: "bold" }}>Start</span>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
