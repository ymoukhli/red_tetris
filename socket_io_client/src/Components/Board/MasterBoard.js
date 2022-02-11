import React from "react";
import { StyledPlayground } from "../../Styles/StyledPlayground";
import Cell from "../Cell";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";

export default function MasterBoard() {
  //#region redux

  const grid = useSelector((state) => state.GameInterface.grid);
  const score = useSelector((state) => state.GameInterface.score);
  const lines = useSelector((state) => state.GameInterface.lines);
  const username = useSelector((state) => state.GameInterface.data.username);
  const gameOver = useSelector((state) => state.GameInterface.gameOver);

  //#endregion
  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="start" alignItems="center">
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={gameOver ? true: false}>
        <Typography variant="h3" component="div">
          Game Over
        </Typography>
      </Backdrop>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item lg={"auto"} style={{ textAlign: "center" }}>
          <Typography variant="h7" component="div">
            Username : {username}
          </Typography>
          <Typography variant="h6" component="div">
            Score: {score} | Lines: {lines}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <StyledPlayground height={20} width={10} size={70}>
            {grid.map((x) => x.map((y, i) => <Cell key={i} type={y[0]} width={grid[0].length} height={grid.length}></Cell>))}
          </StyledPlayground>
        </Grid>
      </Grid>
    </Stack>
  );
}
