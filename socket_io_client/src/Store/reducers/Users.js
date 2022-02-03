const data = {
  grids: {},
};

const Users = (state = data, action) => {
  let tmp = {};
  switch (action.type) {
    case "ADD_USERS_GRID":
      for (const [key, value] of Object.entries(action.payload.users)) {
        if (key !== action.payload.userID) tmp[value.username] = value.Grid.playground;
      }
      return {
        grids: tmp,
      };
    case "UPDATE_USERS_GRID":
      tmp = state.grids;
      if (tmp[action.payload.username]) tmp[action.payload.username] = action.payload.playground;
      return {
        grids: tmp,
      };
    case "REMOVE_USERS_GRID":
      tmp = state.grids;
      delete tmp[action.payload];
      return {
        grids: tmp,
      };
    default:
      return state;
  }
};

export default Users;
