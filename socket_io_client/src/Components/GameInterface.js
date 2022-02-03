import React from "react";
import JoinGame from "./JoinGame";
import MasterDisplay from "../Components/MasterDisplay";
import Nav from "../Components/Nav";
import DisplayForOther from "./DisplayForOther";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { connectUser } from "../Store/actions";
import { Sockets } from "../sockets";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { StyledNotification } from "../Styles/StyledGameInterface";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = uuidv4();
    axios
      .get(`http://localhost:4001/rooms/${e.target.room.value}/${e.target.username.value}/${userID}`)
      .then((response) => {
        const ENDPOINT = "http://127.0.0.1:4001/";
        const options = {
          query: {
            userId: userID,
            room: e.target.room.value,
          },
        };
        const socket = io(ENDPOINT, options);

        Sockets({ socket, userID, room: e.target.room.value, data: response.data.data, dispatch });
      })
      .catch((err) => {
        dispatch(connectUser(err.response.data.response || err.response.data || err.response));
        console.log(err.response);
      });
  };

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
      <Box>
        {!state.GameInterface.joined && state.GameInterface.sockets && <JoinGame handleSubmit={handleSubmit}></JoinGame>}

        {state.GameInterface.joined && state.GameInterface.sockets && (
          <Box onKeyDown={(e) => move(e)} tabIndex="-1">
            <Nav></Nav>
            {state.Nav.alert.show ? (
              <StyledNotification>
                <div id="notif" className="visible">
                  <Alert severity={state.Nav.alert.type} className="alert">
                    <AlertTitle>
                      <strong>{state.Nav.alert.message}</strong>
                    </AlertTitle>
                  </Alert>
                </div>
              </StyledNotification>
            ) : (
              ""
            )}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={{ md: 4, sm: 8 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Item>
                <MasterDisplay></MasterDisplay>
              </Item>

              <DisplayForOther></DisplayForOther>
            </Stack>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
