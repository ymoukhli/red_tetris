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

  const data = useSelector((state) => state.Users);
  //#endregion

  const display = Object.values(data.users).map((user, index) => (
    <Grid item lg={"auto"}>
      <Item>
        <DisplayCard key={index} grid={user.grid} score={user.score} lines={user.lines}></DisplayCard>
      </Item>
    </Grid>
  ));
  return (
    <Stack style={{ flexWrap: "wrap", placeContent: "center" }} direction={{ xs: "column", sm: "row" }} justifyContent="start" alignItems="center">
      <Grid style={{ placeContent: "center" }} container spacing={2} justifyContent="center" alignItems="center">
        {display}
      </Grid>
    </Stack>
  );
}
