const data = {
  joined: false,
  sockets: {},
  user_id: {},
  roomName: null
};

const GameInterface = (state = data, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_DATA":
      return {
        joined: true,
        sockets: action.payload.socket,
        user_id: action.payload.userID,
        roomName: action.payload.room,
      };
    default:
      return state;
  }
};

export default GameInterface;
