const data = {
  joined: false,
  sockets: {},
  user_id: {},
  roomName: null,
  data: {},
  grid: [],
};

const GameInterface = (state = data, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        joined: true,
        sockets: action.payload.socket,
        user_id: action.payload.userID,
        roomName: action.payload.room,
        data: action.payload.data,
        grid: action.payload.data.Grid.playground,
      };
    case "SET_GRID":
      return {
        ...state,
        grid: action.payload,
      };
    default:
      return state;
  }
};

export default GameInterface;
