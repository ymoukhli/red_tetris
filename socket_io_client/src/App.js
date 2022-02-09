import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Nav from "./Components/Nav";
import Grid from "@mui/material/Grid";
import MasterDisplay from "./Components/MasterDisplay";
import DisplayForOther from "./Components/DisplayForOther";
import Display from "./Components/Display";
import JoinGame from "./Components/JoinGame";
import { useSelector } from "react-redux";

function App() {
  //#region redux

  const joined = useSelector((state) => state.GameInterface.joined);
  const sockets = useSelector((state) => state.GameInterface.sockets);
  const GameStart = useSelector((state) => state.Nav.GameStart);

  //#endregion

  const move = ({ key }) => {
    if (joined && GameStart) {
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
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box>
          <Nav></Nav>
        </Box>
        {!joined && sockets && <JoinGame></JoinGame>}
        {joined && sockets && (
          <Box onKeyDown={(e) => move(e)} tabIndex="-1">
            <Grid container spacing={3} justifyContent="space-evenly" alignItems="center">
              <Grid item xs>
                <Display></Display>
              </Grid>
              <Grid item xs={6}>
                <MasterDisplay></MasterDisplay>
              </Grid>
              <Grid item xs>
                <DisplayForOther></DisplayForOther>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}

export default App;
