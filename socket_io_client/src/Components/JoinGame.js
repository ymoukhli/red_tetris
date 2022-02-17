import React from "react";
import { StyledJoinGame } from "../Styles/StyledJoinGame";
import Connect from "../Utilitys/Connect";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { AlertTitle, Grid, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connectUser } from "../Store/actions";

export default function JoinGame() {
  //#region redux

  const joinGame = useSelector((state) => state.joinGame);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //#endregion

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = uuidv4();
    if (e.target.room.value.length > 20 || e.target.username.value.length > 20) {
      console.log("ooooooh boy");
      dispatch(connectUser("Please respect the length as 20 characters in player_name and in room_name"));
    } else if (!/^[a-zA-Z1-9_-]*$/.test(e.target.room.value) || !/^[a-zA-Z1-9_-]*$/.test(e.target.username.value)) {
      console.log("ooooooh boy");
      dispatch(connectUser("Please fill Input with just the allow characters (A-Z|a-z|1-9|-_)"));
    } else {
      Connect(e.target.room.value, e.target.username.value, userID, dispatch);
      navigate(`#${e.target.room.value}[${e.target.username.value}]`);
    }
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
                      <input type="text" name="username" id="username" placeholder="Enter username..." maxLength="20" required />
                    </div>
                    <div className="input-field">
                      <input type="text" name="room" id="room" placeholder="Enter room..." maxLength="20" required />
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
