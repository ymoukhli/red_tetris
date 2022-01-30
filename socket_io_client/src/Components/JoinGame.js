import React from "react";
import { StyledJoinGame, StyledJoinGameContainer } from "../Styles/StyledJoinGame";
import Button from "./Button";
import Container from "@mui/material/Container";

export default function JoinGame({ handleSubmit }) {
  return (
    <React.Fragment>
      <Container className="container" fixed>
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
      </Container>
    </React.Fragment>
  );
}
