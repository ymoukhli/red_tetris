import React from "react";
import { Backdrop, Typography, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function MasterBoard() {
  //#region redux

  const overlay = useSelector((state) => state.Overlay.overlay);
  const sockets = useSelector((state) => state.GameInterface.sockets);
  const roomName = useSelector((state) => state.GameInterface.roomName);
  const Host = useSelector((state) => state.GameInterface.host);
  //#endregion

  const reload = () => {
    console.log("leave", document.location.reload(true));
  };
  const restart = () => {
    sockets.emit("GameRstart", roomName, (data) => {
      if (typeof data == "string") {
        console.log("GameRstart issue", data);
        return;
      } else {
        console.log("resrart");
      }
    });
  };

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={overlay.show ? true : false}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item lg={12} style={{ textAlign: "center" }}>
          <Typography variant="h3" component="div">
            {overlay.message}
          </Typography>
        </Grid>
        <Grid item lg={"auto"} style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={reload}>
            Go back
          </Button>
        </Grid>
        {Host ? (
          <Grid item lg={"auto"} style={{ textAlign: "center" }}>
            <Button variant="contained" onClick={restart}>
              restart
            </Button>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Backdrop>
  );
}
