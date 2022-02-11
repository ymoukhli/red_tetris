export const connectUser = (message) => {
  return {
    type: "USER_CON",
    message,
  };
};

//#region GI
export const SetGameInterface = (data) => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};
export const SetGrid = (data) => {
  return {
    type: "SET_GRID",
    payload: data,
  };
};

export const UpdateTetriminosQueue = (data) => {
  console.log("SET_TETRO");
  return {
    type: "SET_TETRO",
    payload: data,
  };
};

export const GameOver = (data) => {
  console.log("SET_GAMEOVER");
  return {
    type: "SET_GAMEOVER",
    payload: data,
  };
};

export const imWinner = () => {
  console.log("SET_WINNER");
  return {
    type: "SET_WINNER",
  };
};

export const HostUpdate = (data) => {
  console.log("UPDATE_HOST");
  return {
    type: "UPDATE_HOST",
    payload: data,
  };
};

//#endregion

//#region NAV
export const StartGame = (data) => {
  console.log(data);
  if (data.type === "error")
    return {
      type: "ERROR_START_GAME",
      payload: data.message,
    };
  else
    return {
      type: "START_GAME",
    };
};

export const TrigerSnackBar = (data) => {
  return {
    type: "SNACKBAR",
    payload: data,
  };
};

export const TrigerOverlay = (data) => {
  return {
    type: "OVERLAY",
    payload: data,
  };
};

//#endregion

//#region display users
export const AddUsersGrid = (users) => {
  console.log("ADD_USERS", users);
  return {
    type: "ADD_USERS",
    payload: users,
  };
};

export const UpdateUsersGrid = (data) => {
  console.log("UPDATE_USERS", data);
  return {
    type: "UPDATE_USERS",
    payload: data,
  };
};

export const RemoveUserGrid = (userID) => {
  console.log("REMOVE_USERS", userID);
  return {
    type: "REMOVE_USERS",
    payload: userID,
  };
};
//#endregion
