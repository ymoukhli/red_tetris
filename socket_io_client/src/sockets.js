import { useSelector } from "react-redux";
import { removeGrid } from "./redux/actions/actions";
import * as actionType from "./redux/actionTypes";

export default function Socket(io, ac, state,userID) {

    const {
        setSocket,
        setMultiplayer,
        setGrid,
        setRoom,
        setStarted,
        removeGrid,
        updateGrid,
        addGrid
    } = ac;

    const {
        grids,
        room
    } = state;
    setSocket(io);

    io.on("started", () => {
        setStarted(true);
    });
    io.on("respond", (data) => {
        setGrid(data.playground);
    });
    io.on("joined", ({ users }) => {
        const tmp = {};
        console.log("USER", users);
        addGrid({users, userID});
        setRoom(users)
    });
  
    io.on("left", ({ username, userID }) => {
        removeGrid({userID});

        setRoom(() => {
            const tmp = { ...room };
            delete tmp[userID];
            return tmp;
            });
    });

    io.on("collided", ({ playground, username, score, lines, user_id }) => {
        updateGrid({username, playground});
        // tmp[user_id].score = score;
        // tmp[user_id].lines = lines; 
        // setRoom(tmp);
    });

    io.on("multy", () => {
        setMultiplayer(true);
    })

    io.on("noMulty", () => {
        setMultiplayer(false);
    })
}