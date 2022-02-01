const data = {
  GameStart: false,
  users: {},
};

const joinGame = (state = data, action) => {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        GameStart: true,
      };
    case "SET_USER":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default joinGame;
