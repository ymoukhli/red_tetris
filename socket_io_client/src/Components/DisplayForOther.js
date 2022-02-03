import React from "react";
import DisplayCard from "./DisplayCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DisplayForOther() {
  //#region redux

  const state = useSelector((state) => {
    return state;
  });

  //#endregion

  const display = Object.values(state.Users.grids).map((grid) => (
    <Grid item lg={6} md={6} sm={12} xs={12}>
      <Item>
        <DisplayCard grid={grid}></DisplayCard>
      </Item>
    </Grid>
  ));
  return (
    <Stack style={{ flexWrap: "wrap" }} direction={{ xs: "column", sm: "row" }} justifyContent="start" alignItems="center">
      <Grid container spacing={2}>
        {display}
      </Grid>
    </Stack>
  );
}
