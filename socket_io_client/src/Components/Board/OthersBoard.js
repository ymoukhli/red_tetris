import React from "react";
import { StyledPlaygroundOthers } from "../../Styles/StyledPlayground";
import Cell from "../Cell";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Box, Paper, Typography, Grid } from "@mui/material";

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
          <Grid item xs={3} sm={4} md={6} lg={12} key={index}>
            <Item elevation={1}>
              <Grid item lg={12}>
                <Typography variant="h12" component="div">
                  Username : {user.username}
                </Typography>
                <Typography variant="h10" component="div">
                  Score: {user.score} | Lines: {user.lines}
                </Typography>
              </Grid>

              <StyledPlaygroundOthers height={20} width={10} size={30}>
                {user.grid.map((x) => x.map((y, i) => <Cell key={i} type={y[0]} width={user.grid[0].length} height={user.grid.length}></Cell>))}
              </StyledPlaygroundOthers>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
