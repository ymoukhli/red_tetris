import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Nav({ io }) {
  const [room, setRoom] = useState({});
  const [roomName, setRoomName] = useState(null);

  const reset = () => {
    if (roomName) {
      io.emit("GameStarter", roomName, (data) => {
        if (typeof data == "string") {
          console.log("issue", data);
        } else {
          console.log("passed game start");
          io.emit("startGame", roomName);
        }
      });
    } else {
      console.log("error roomName not Set");
    }
  };

  useEffect(() => {
    io.on("joined", ({ room, users }) => {
      setRoom(users);
      setRoomName(room);
    });

    io.on("collided", ({ username, score, lines, user_id }) => {
      console.log({ username, score, lines, user_id });
      setRoom((prev) => {
        const tmp = { ...prev };
        tmp[user_id].score = score;
        tmp[user_id].lines = lines;
        return tmp;
      });
    });

    io.on("left", ({ userID }) => {
      setRoom((prev) => {
        const tmp = { ...prev };
        delete tmp[userID];
        return tmp;
      });
    });
  }, []);

  const userInfo = Object.values(room).map((x) => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: "auto" }}>
      <Toolbar>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Red tetris
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {userInfo}
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" variant="contained">
          <span style={{ color: "black", fontWeight: "bold" }} onClick={reset}>
            Start
          </span>
        </Button>
      </Toolbar>
    </AppBar>

    // <StyledNav>
    //   <StyledStart onClick={reset}>start</StyledStart>
    //   {userInfo}
    // </StyledNav>
  );
}
