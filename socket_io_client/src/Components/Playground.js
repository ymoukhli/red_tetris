import React from "react";
import { StyledPlayground } from "../Styles/StyledPlayground";
import Cell from "./Cell";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function Playground({ grid, master }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="start" alignItems="center">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item lg={10}>
          <StyledPlayground height={20} width={10} size={master ? 60 : 40}>
            {grid.map((x) => x.map((y, i) => <Cell key={i} type={y[0]} width={grid[0].length} height={grid.length}></Cell>))}
          </StyledPlayground>
        </Grid>
        <Grid item lg={2}>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        </Grid>
      </Grid>
    </Stack>
  );
}
