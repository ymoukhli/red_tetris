import React from "react";
import { Backdrop, Typography, Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function MasterBoard() {
  //#region redux

  const overlay = useSelector((state) => state.Overlay.overlay);

  //#endregion

  const reload = () => {
    console.log("leave", document.location.reload(true));
  };
  
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={overlay.show ? true : false}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item lg={"auto"} style={{ textAlign: "center" }}>
          <Typography variant="h3" component="div">
            {overlay.message}
          </Typography>
          <Button variant="contained" onClick={reload}>
            Go back
          </Button>
        </Grid>
      </Grid>
    </Backdrop>
  );
}
