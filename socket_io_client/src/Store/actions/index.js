export const increment = (nb) => {
  return {
    type: "INCREMENT",
    payload: nb,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

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
//#endregion

//#region NAV
export const StartGame = () => {
  return {
    type: "START_GAME",
  };
};

export const AddUsers = (users) => {
  return {
    type: "SET_USER",
    payload: users
  };
};
//#endregion
