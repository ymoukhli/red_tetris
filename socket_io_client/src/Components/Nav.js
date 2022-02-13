import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StartGame } from "../Store/actions";

export default function Nav() {
  //#region redux

  const roomName = useSelector((state) => state.GameInterface.roomName);
  const sockets = useSelector((state) => state.GameInterface.sockets);
  const GameStart = useSelector((state) => state.Nav.GameStart);
  const Host = useSelector((state) => state.GameInterface.host);
  const gameOver = useSelector((state) => state.GameInterface.gameOver);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //#endregion

  const RoomDisplay = () => {
    if (roomName) {
      return (
        <div>
          <Typography component="div">
            Room: {roomName} {Host ? " | Master" : ""}
          </Typography>
        </div>
      );
    }
  };

  const reset = () => {
    if (GameStart) {
      console.log("Game already started");
      return;
    }
    if (roomName) {
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
  const Leave = () => {
    navigate('/')
    console.log("leave", document.location.reload(true));
  };

  return (
    <AppBar position="fixed" style={{ background: "#3c4d6d" }} sx={{ bottom: "auto", top: 0 }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Red tetris
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {RoomDisplay()}
        <Box sx={{ flexGrow: 1 }} />

        {Host && !gameOver ? (
          <Button sx={{ mr: 2 }} color="inherit" variant="outlined" onClick={reset} size="small" disabled={GameStart}>
            <span style={{ fontWeight: "bold" }}>Start</span>
          </Button>
        ) : (
          ""
        )}
        <Button color="inherit" variant="outlined" onClick={Leave} size="small">
          <span style={{ fontWeight: "bold" }}>Leave</span>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
