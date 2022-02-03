import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { action } from "./redux/actions";

export default Socket = (io) => {

    const { setSocket, setMultiplayer, setGrid, join, setStarted, setGrids} = bindActionCreators(action, useDispatch())
    const {joined,
        grid,
        grids,
        socket,
        room,
        roomName,
        started} = useSelector(state => state);
    setSocket(io);

    socket.on("started", ()=>{
        setStarted(true);
    });
    socket.on("respond", (data) => {
        setGrid(data.playground);
    });
    socket.on("joined", ({ room, users }) => {
        const tmp = {};

        for (const [key, value] of Object.entries(users)) {
          if (key != user_id) tmp[value.username] = value.Grid.playground;
        }
        setGrids(tmp);
    });
  
    socket.on("left", ({ username, userID }) => {
        setGrids(() => {
            const tmp = { ...grids };
            delete tmp[username];
            return tmp;
        });

        setRoom(() => {
            const tmp = { ...room };
            delete tmp[userID];
            return tmp;
            });
    });

    socket.on("collided", ({ playground, username, score, lines, user_id }) => {
        setGrids(() => {
            const tmp = { ...grids };
            if (tmp[username]) tmp[username] = playground;
            return tmp;
        });

        setRoom(() => {
        const tmp = { ...room };
        tmp[user_id].score = score;
        tmp[user_id].lines = lines;
        return tmp;
        });
    });

    socket.on("multy", () => {
        setMultiplayer(true);
    })

    socket.on("noMulty", () => {
        setMultiplayer(false);
    })
}