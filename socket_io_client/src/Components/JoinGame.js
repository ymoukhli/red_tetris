import React from "react";
import { StyledJoinGame } from "../Styles/StyledJoinGame";
import Button from "./Button";

export default function JoinGame({io, handleSubmit}) {
   

    return (<StyledJoinGame>
        <form onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username..."
            required
            />
        <label htmlFor="room">room</label>
        <input
            type="text"
            name="room"
            id="room"
            placeholder="Enter room..."
            required
            />
        <Button type="submit" text="submit">submit</Button>
        </form>
        
    </StyledJoinGame>)

}