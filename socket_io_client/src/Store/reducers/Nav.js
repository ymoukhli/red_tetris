const data = {
  GameStart: false,
  alert: {
    show: false,
    message: "",
    type: "",
  },
};

const Nav = (state = data, action) => {
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
    case "RESTART":
      return {
        ...state,
        GameStart: false,
      };
    default:
      return state;
  }
};

export default Nav;
