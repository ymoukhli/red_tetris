const data = {
  alert: {
    value: false,
    message: "",
  },
  name: "name",
};

const joinGame = (state = data, action) => {
  switch (action.type) {
    case "USER_CON":
      return {
        ...state,
        alert: {
          value: true,
          message: action.message
        },
      };
    default:
      return state;
  }
};

export default joinGame;
