import axios from "axios";
import io from "socket.io-client";
import { Sockets } from "../sockets";
import { connectUser } from "../Store/actions";
const ENDPOINT = "http://127.0.0.1:4001/";

export default function Connect(room, user, userID, dispatch) {
    axios
        .get(`${ENDPOINT}rooms/${room}/${user}/${userID}`)
        .then((response) => {
            const options = {
                query: {
                    userId: userID,
                    room: room,
                },
            };
            const socket = io(ENDPOINT, options);

            Sockets({ socket, userID, room: room, data: response.data.data, dispatch, host: response.data.host });
        })
        .catch((err) => {
            dispatch(connectUser(err.response.data.response || err.response.data || err.response));
            console.log(err.response);
        });

}
