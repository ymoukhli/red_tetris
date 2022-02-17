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
  TrigerSnackBar,
  imWinner,
  TrigerOverlay,
  Restart
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
    dispatch(
      TrigerSnackBar({
        show: true,
        time: 4000,
        message: "Game start",
        severity: "success",
        horizontal: "left",
        vertical: "bottom",
      })
    );
  });

  /////////////////////

  socket.on("joined", ({ room, users, user_id }) => {
    console.log(`emit, joined`);
    dispatch(AddUsersGrid({ users, userID }));
    if (user_id !== userID)
      dispatch(
        TrigerSnackBar({
          show: true,
          message: `Player joind "${users[userID].username ? `name : ${users[userID].username}` : "" || ""}"`,
          severity: "info",
          horizontal: "left",
          vertical: "bottom",
        })
      );
  });

  socket.on("collided", ({ username, score, lines, user_id, playground }) => {
    console.log(`emit, collided`);
    dispatch(UpdateUsersGrid({ username, score, lines, userID: user_id, playground }));
  });

  socket.on("left", ({ username, user_id, newHost }) => {
    console.log(`emit, left`, { username, user_id, newHost });
    dispatch(RemoveUserGrid(user_id));
    dispatch(HostUpdate({ userID, newHost }));
    dispatch(
      TrigerSnackBar({
        show: true,
        time: 4000,
        message: `Player left "${username ? `name : ${username}` : "" || ""}"`,
        severity: "warning",
        horizontal: "left",
        vertical: "bottom",
      })
    );
  });

  socket.on("display", (data) => {
    dispatch(UpdateTetriminosQueue(data));
  });


  socket.on("restart", ({users}) => {
    console.log("restart !!");
    dispatch(Restart());
    dispatch(AddUsersGrid({ users, userID }));
    dispatch(
      TrigerSnackBar({
        show: true,
        time: 4000,
        message: `Game restart in 3s`,
        severity: "info",
        horizontal: "left",
        vertical: "bottom",
      })
    );
  });

  socket.on("gameOver", () => {
    console.log("GAMEOVER BABY !!");
    dispatch(GameOver());
    dispatch(
      TrigerOverlay({
        show: true,
        message: "Game over",
      })
    );
  });

  socket.on("win", () => {
    console.log("JE SUIS SUPER, BABY !! WIN");
    dispatch(
      TrigerSnackBar({
        show: true,
        time: 8000,
        message: "YOU WON THE GAME !!!",
        severity: "error",
        horizontal: "center",
        vertical: "bottom",
      })
    );
    dispatch(imWinner());
    dispatch(
      TrigerOverlay({
        show: true,
        message: "YOU ARE THE WINNER",
      })
    );
  });
  /////////////////////////

  return socket;
};
