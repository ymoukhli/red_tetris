const data = {
  joined: false,
  sockets: {},
  user_id: null,
  roomName: null,
  data: {},
  grid: [],
  display: [],
};

const GameInterface = (state = data, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case "SET_TETRO":
      return {
        ...state,
        display: action.payload.slice(0,4)
      }
    case "SET_DATA":
      return {
        joined: true,
        sockets: action.payload.socket,
        user_id: action.payload.userID,
        roomName: action.payload.room,
        data: action.payload.data,
        grid: action.payload.data.Grid.playground,
        display: []
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
