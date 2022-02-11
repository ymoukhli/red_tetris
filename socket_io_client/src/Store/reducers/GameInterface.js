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
  gameOver: false,
  host: false,
  winner: false,
};

const GameInterface = (state = data, action) => {
  switch (action.type) {
    case "SET_TETRO":
      return {
        ...state,
        display: action.payload.slice(0, 4),
      };
    case "SET_DATA":
      console.log("host:", action.payload.host === action.payload.userID);
      return {
        joined: true,
        sockets: action.payload.socket,
        user_id: action.payload.userID,
        roomName: action.payload.room,
        data: action.payload.data,
        host: action.payload.host === action.payload.userID,
        grid: action.payload.data.Grid.playground,
        score: action.payload.data.score,
        lines: action.payload.data.lines,
        display: [],
      };
    case "SET_GRID":
      return {
        ...state,
        grid: action.payload.Grid.playground,
        score: action.payload.score,
        lines: action.payload.lines,
      };
    case "SET_GAMEOVER":
      return {
        ...state,
        gameOver: true,
      };
    case "SET_WINNER":
      return {
        ...state,
        winner: true,
      };
    case "UPDATE_HOST":
      console.log("newHost:", action.payload.newHost === action.payload.userID);
      return {
        ...state,
        host: action.payload.newHost === action.payload.userID,
      };
    default:
      return state;
  }
};

export default GameInterface;
