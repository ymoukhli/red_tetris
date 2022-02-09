const data = {
  joined: false,
  sockets: {},
  user_id: null,
  roomName: null,
  data: {},
  score: 0,
  lines: 0,
  grid: [],
  display: [],
};

const GameInterface = (state = data, action) => {
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
        score: action.payload.data.score,
        lines: action.payload.data.lines,
        display: []
      };
    case "SET_GRID":
      return {
        ...state,
        grid: action.payload.Grid.playground,
        score: action.payload.score,
        lines: action.payload.lines,
      };
    default:
      return state;
  }
};

export default GameInterface;
