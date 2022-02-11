import {
  SetGameInterface,
  StartGame,
  SetGrid,
  AddUsersGrid,
  UpdateUsersGrid,
  RemoveUserGrid,
  UpdateTetriminosQueue,
  GameOver,
  HostUpdate,
} from "./Store/actions";

export const Sockets = ({ socket, userID, room, data, dispatch, host }) => {
  dispatch(SetGameInterface({ socket, userID, room, data, host }));
  socket.emit("joinRoom", room);

  ////////////////////
  socket.on("respond", (data) => {
    dispatch(SetGrid(data));
  });

  socket.on("GStart", () => {
    dispatch(StartGame({ type: "success" }));
  });

  /////////////////////

  socket.on("joined", ({ room, users }) => {
    console.log(`emit, joined`);
    dispatch(AddUsersGrid({ users, userID }));
  });

  socket.on("collided", ({ username, score, lines, user_id, playground }) => {
    console.log(`emit, collided`);
    dispatch(UpdateUsersGrid({ username, score, lines, userID: user_id, playground }));
  });

  socket.on("left", ({ username, user_id, newHost }) => {
    console.log(`emit, left`, { username, user_id, newHost });
    dispatch(RemoveUserGrid(user_id));
    dispatch(HostUpdate({ userID, newHost }));
  });

  socket.on("display", (data) => {
    dispatch(UpdateTetriminosQueue(data));
  });

  socket.on("gameOver", () => {
    console.log("GAMEOVER BABY !!");
    dispatch(GameOver());
  });

  socket.on("win", () => {
    console.log("JE SUIS SUPER, BABY !! WIN");
  });
  /////////////////////////

  return socket;
};
