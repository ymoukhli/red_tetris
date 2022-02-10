import React from "react";
import { StyledPlayground } from "../../Styles/StyledPlayground";
import Cell from "../Cell";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OthersBoard() {
  //#region redux

  const data = useSelector((state) => state.Users);
  //#endregion

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" alignItems="center">
        {Object.values(data.users).map((user, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item elevation={1}>
              <Grid item lg={"auto"}>
                <Typography variant="h8" component="div">
                  Username : {user.username}
                </Typography>
                <Typography variant="h8" component="div">
                  Score: {user.score} | Lines: {user.lines}
                </Typography>
              </Grid>

              <StyledPlayground height={20} width={10} size={30}>
                {user.grid.map((x) => x.map((y, i) => <Cell key={i} type={y[0]} width={user.grid[0].length} height={user.grid.length}></Cell>))}
              </StyledPlayground>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
