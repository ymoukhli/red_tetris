import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import Nav from "./Components/Nav";
import MasterBoard from "./Components/Board/MasterBoard";
import OthersBoard from "./Components/Board/OthersBoard";
import Display from "./Components/Display";
import JoinGame from "./Components/JoinGame";
import Snackbar from "./Components/Core/Snackbar";
import Overlay from "./Components/Core/Overlay";
import Connect from "./Utilitys/Connect";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const theme = createTheme();
export default function Checkout() {
  //#region redux

  const user_id = useSelector((state) => state.GameInterface.user_id);
  const joined = useSelector((state) => state.GameInterface.joined);
  const gameOver = useSelector((state) => state.GameInterface.gameOver);
  const winner = useSelector((state) => state.GameInterface.winner);
  const sockets = useSelector((state) => state.GameInterface.sockets);
  const GameStart = useSelector((state) => state.Nav.GameStart);
  const joindUsersd = useSelector((state) => Object.keys(state.Users.users).length);
  const location = useLocation();
  const dispatch = useDispatch();
  //#endregion

  const move = ({ key }) => {
    if (joined && GameStart && !gameOver && !winner) {
      console.log("trigger move");
      if (key === "ArrowRight" || key === "d") {
        sockets.emit("move", { x: 1, y: 0 });
      } else if (key === "ArrowLeft" || key === "a") {
        sockets.emit("move", { x: -1, y: 0 });
      } else if (key === "ArrowDown" || key === "s") {
        sockets.emit("move", { x: 0, y: 1 });
      } else if (key === "ArrowUp" || key === "w") {
        sockets.emit("rotate");
      }
    }
  };


  const GetHash = (hash) => {
    console.log('--------')
    console.log({ user_id })
    if(user_id)
      sockets.emit('linkChangeDetect', user_id)
    console.log('--------')
    const matches = hash.match(/(#([a-zA-Z1-9_-]+)\[([a-zA-Z1-9_-]+)\])/)
    console.log('matches->', matches);
    if (!matches) return;
    if (matches[2] && matches[3]) {
      const userID = uuidv4();
      Connect(matches[2], matches[3], userID, dispatch)
    }
  }

  // useEffect(() => {
  //   GetHash(location.hash)
  // }, [location.hash])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!joined && sockets && <JoinGame></JoinGame>}
      {joined && sockets && (
        <div onKeyDown={(e) => move(e)} tabIndex={-1}>
          <Snackbar />
          <Overlay />
          <Nav></Nav>
          <Paper variant="none" sx={{ my: { xs: 7, md: 6 }, p: { xs: 2, md: 3 }, mb: 4 }}>
            <React.Fragment>
              <Grid container spacing={{ xs: 2, md: 0 }} component="main" sx={{ height: "89vh" }} justifyContent="space-around" alignItems="center">
                <CssBaseline />

                <Grid item xs={false} sm={6} md={6} style={{ alignSelf: "center" }}>
                  {GameStart && (
                    <Grid container justifyContent="center" alignItems="center" style={{ textAlign: "-webkit-center" }}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Display></Display>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container spacing={1} justifyContent="center" alignItems="center">
                    <Grid item lg={12} md={10} sm={10} xs={10}>
                      <MasterBoard></MasterBoard>
                    </Grid>
                  </Grid>
                </Grid>
                {joindUsersd ? (
                  <Grid
                    style={{ maxHeight: "90vh", overflow: "auto", alignSelf: "center" }}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    elevation={2}
                    square
                  >
                    <OthersBoard></OthersBoard>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </React.Fragment>
          </Paper>
        </div>
      )}
    </ThemeProvider>
  );
}
