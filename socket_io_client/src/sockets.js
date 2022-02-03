import {
  SetGameInterface,
  AddUsers,
  UpdateUsers,
  RemoveUsers,
  StartGame,
  SetGrid,
  AddUsersGrid,
  UpdateUsersGrid,
  RemoveUserGrid,
} from "./Store/actions";

export const Sockets = ({ socket, userID, room, data, dispatch }) => {
    dispatch(SetGameInterface({ socket, userID, room, data }));
    socket.emit("joinRoom", room);
    
    ////////////////////
    socket.on("respond", (data) => {
      dispatch(SetGrid(data.playground));
    });

    socket.on("GStart", () => {
      dispatch(StartGame({ type: "success" }));
    });

    /////////////////////

    socket.on("joined", ({ room, users }) => {
      console.log(`emit, joined`);
      dispatch(AddUsers(users));
      dispatch(AddUsersGrid({ users, userID }));
    });

    socket.on("collided", ({ username, score, lines, user_id, playground }) => {
      console.log(`emit, collided`);
      dispatch(UpdateUsers({ username, score, lines, user_id }));
      dispatch(UpdateUsersGrid({ username, playground }));
    });

    socket.on("left", ({ username, userID }) => {
      console.log(`emit, left`);
      dispatch(RemoveUsers(userID));
      dispatch(RemoveUserGrid(username));
    });
    /////////////////////////

  return socket;
};
