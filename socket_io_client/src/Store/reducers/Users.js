const data = {
  users: {},
};

const Users = (state = data, action) => {
  let tmp = {};
  switch (action.type) {
    case "ADD_USERS":
      for (const [key, value] of Object.entries(action.payload.users)) {
        if (key !== action.payload.userID) {
          tmp[value.id] = {
            grid: value.Grid.playground,
            score: value.score,
            lines: value.lines,
            username: value.username,
            id: value.id,
          };
        }
      }
      return {
        users: tmp,
      };
    case "UPDATE_USERS":
      tmp = state.users;
      if (tmp[action.payload.userID])
        tmp[action.payload.userID] = {
          grid: action.payload.playground,
          score: action.payload.score,
          lines: action.payload.lines,
        };
      return {
        users: tmp,
      };
    case "REMOVE_USERS":
      tmp = state.users;
      delete tmp[action.payload];
      return {
        users: tmp,
      };
    default:
      return state;
  }
};

export default Users;
