import React from "react";
import { StyledJoinGame } from "../Styles/StyledJoinGame";
import { Sockets } from "../sockets";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { connectUser } from "../Store/actions";
import CssBaseline from "@mui/material/CssBaseline";
import { AlertTitle, Grid, Alert, Button } from "@mui/material";

export default function JoinGame() {
  //#region redux

  const joinGame = useSelector((state) => state.joinGame);

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

        Sockets({ socket, userID, room: e.target.room.value, data: response.data.data, dispatch, host: response.data.host });
      })
      .catch((err) => {
        dispatch(connectUser(err.response.data.response || err.response.data || err.response));
        console.log(err.response);
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container sx={{ height: "90vh" }} justifyContent="space-around" alignItems="center">
        <Grid item xs={false}>
          {joinGame.alert.value ? (
            <Alert severity="error" className="alert">
              <AlertTitle>Error</AlertTitle>
              {joinGame.alert.message} — <strong>Try again!</strong>
            </Alert>
          ) : (
            ""
          )}
          <StyledJoinGame>
            {
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <h1>Join/Create a game</h1>
                  <div className="content">
                    <div className="input-field">
                      <input type="text" name="username" id="username" placeholder="Enter username..." required />
                    </div>
                    <div className="input-field">
                      <input type="text" name="room" id="room" placeholder="Enter room..." required />
                    </div>
                  </div>
                  <div className="action">
                    <Button type="submit" text="submit">
                      submit
                    </Button>
                  </div>
                </form>
              </div>
            }
          </StyledJoinGame>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
