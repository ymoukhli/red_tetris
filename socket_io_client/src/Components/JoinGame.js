import React from "react";
import { StyledJoinGame, Wrap } from "../Styles/StyledJoinGame";
import Button from "./Button";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useSelector } from "react-redux";

export default function JoinGame({ handleSubmit }) {
  //#region redux

  const state = useSelector((state) => {
    return state;
  });
  
  //#endregion

  return (
    <React.Fragment>
      <Wrap>
        <Container className="container" fixed>
          {state.joinGame.alert.value ? (
            <Alert severity="error" className="alert">
              <AlertTitle>Error</AlertTitle>
              {state.joinGame.alert.message} — <strong>Try again!</strong>
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
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username..."
                        required
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        name="room"
                        id="room"
                        placeholder="Enter room..."
                        required
                      />
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
        </Container>
      </Wrap>
    </React.Fragment>
  );
}
