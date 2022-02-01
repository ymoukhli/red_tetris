import React from "react";
import { useTetris } from "../hooks/tetris";
import { useGrid } from "../hooks/grid";
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay";
import Nav from "../Components/Nav";
import DisplayForOther from "./DisplayForOther";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { connectUser, SetGameInterface } from "../Store/actions";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GameInterface() {
  //#region redux

  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  //#endregion

  const [tetris, resetTetris] = useTetris();
  const [grid, setBackendGrid] = useGrid(tetris, resetTetris);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = uuidv4();
    axios
      .get(
        `http://localhost:4001/rooms/${e.target.room.value}/${e.target.username.value}/${userID}`
      )
      .then(() => {
        const ENDPOINT = "http://127.0.0.1:4001/";
        const options = {
          query: {
            userId: userID,
            room: e.target.room.value,
          },
        };
        const socket = io(ENDPOINT, options);

        socket.emit("joinRoom", e.target.room.value);
        dispatch(SetGameInterface({ socket, userID, room: e.target.room.value }));
      })
      .catch((err) => {
        dispatch(connectUser(err.response.data.response || err.response.data));
        console.log(err.response);
      });
  };

  if (state.GameInterface.joined) {
    state.GameInterface.sockets.on("respond", (data) => {
      setBackendGrid(data.playground);
    });
  }

  const move = ({ key }) => {
    if (state.GameInterface.joined && state.Nav.GameStart) {
      if (key === "ArrowRight" || key === "d") {
        state.GameInterface.sockets.emit("move", { x: 1, y: 0 });
      } else if (key === "ArrowLeft" || key === "a") {
        state.GameInterface.sockets.emit("move", { x: -1, y: 0 });
      } else if (key === "ArrowDown" || key === "s") {
        state.GameInterface.sockets.emit("move", { x: 0, y: 1 });
      } else if (key === "ArrowUp" || key === "w") {
        state.GameInterface.sockets.emit("rotate");
      }
    }
  };

  return (
    <React.Fragment>
      <Container>
        {!state.GameInterface.joined && state.GameInterface.sockets && (
          <JoinGame handleSubmit={handleSubmit}></JoinGame>
        )}

        {state.GameInterface.joined && state.GameInterface.sockets && (
          <Box onKeyDown={(e) => move(e)} tabIndex="-1">
            <Nav io={state.GameInterface.sockets}></Nav>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={{ xs: 1, sm: 2, md: 4 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Item>
                <MasterDisplay grid={grid}></MasterDisplay>
              </Item>
              <DisplayForOther
                io={state.GameInterface.sockets}
                user_id={state.GameInterface.user_id}
              ></DisplayForOther>
            </Stack>
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
}
