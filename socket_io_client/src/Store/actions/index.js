export const connectUser = (message) => {
  return {
    type: "USER_CON",
    message,
  };
};

//#region GI
export const SetGameInterface = (data) => {
  console.log('SetGameInterface', data);
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

export const AddUsers = (users) => {
  return {
    type: "SET_USER",
    payload: users,
  };
};

export const UpdateUsers = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};

export const RemoveUsers = (user_id) => {
  return {
    type: "REMOVE_USER",
    payload: user_id,
  };
};
//#endregion

//#region display users
export const AddUsersGrid = (users) => {
  console.log('ADD_USERS_GRID', users);
  return {
    type: "ADD_USERS_GRID",
    payload: users,
  };
};

export const UpdateUsersGrid = (data) => {
  console.log('UPDATE_USERS_GRID', data);
  return {
    type: "UPDATE_USERS_GRID",
    payload: data,
  };
};

export const RemoveUserGrid = (userID) => {
  return {
    type: "REMOVE_USERS_GRID",
    payload: userID,
  };
};
//#endregion
