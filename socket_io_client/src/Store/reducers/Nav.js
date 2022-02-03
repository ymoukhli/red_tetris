const data = {
  GameStart: false,
  alert: {
    show: false,
    message: "",
    type: "",
  },
  users: {},
};

const Nav = (state = data, action) => {
  let tmp = state.users;
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        GameStart: true,
        alert: {
          show: true,
          message: "Game has Stared",
          type: "success",
        },
      };
    case "ERROR_START_GAME":
      return {
        ...state,
        alert: {
          show: true,
          message: action.payload,
          type: "error",
        },
      };
    case "SET_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_USER":
      tmp = state.users;
      tmp[action.payload.user_id].score = action.payload.score;
      tmp[action.payload.user_id].lines = action.payload.lines;
      return {
        ...state,
        users: tmp,
      };
    case "REMOVE_USER":
      tmp = state.users;
      delete tmp[action.payload];
      return {
        ...state,
        users: tmp,
      };
    default:
      return state;
  }
};

export default Nav;
