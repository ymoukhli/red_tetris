import React, { useEffect, useState } from "react";
import { StyledDisplayForOther } from "../Styles/StyledDisplayForOther";
import { StyledMasterDisplay } from "../Styles/StyledMasterDisplay";
import DisplayCard from "./DisplayCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DisplayForOther({ io, user_id }) {
  const [grids, setGrids] = useState({});

  useEffect(() => console.log("GRIDS", grids), [grids]);

  useEffect(() => {
    io.on("joined", (data) => {
      const tmp = {};
      console.log("DATA", data.users, user_id);
      for (const [key, value] of Object.entries(data.users)) {
        // console.log(`${key}: ${value}`);
        if (key != user_id) tmp[value.username] = value.Grid.playground;
      }
      setGrids(tmp);
    });

    io.on("left", ({ username }) => {
      setGrids((prev) => {
        const tmp = { ...prev };
        delete tmp[username];
        return tmp;
      });
    });
    io.on("collided", ({ playground, username }) => {
      setGrids((prev) => {
        const tmp = { ...prev };
        if (tmp[username]) tmp[username] = playground;
        return tmp;
      });
    });
  }, [io]);

  const display = Object.values(grids).map((grid) => (
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
