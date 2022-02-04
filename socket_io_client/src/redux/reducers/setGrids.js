import * as actionType from "../actionTypes"

const reducer = (state = {}, action) => {
        let tmp = {}
    switch (action.type) {

        case actionType.ADDGRID:
         tmp = {...state};
        for (const [key, value] of Object.entries(action.payload.users)) {
          if (key !== action.payload.userID) tmp[value.username] = value.Grid.playground;
        }
        return tmp;
      case actionType.UPDATEGRID:
         tmp = {...state};
        if (tmp[action.payload.username]) tmp[action.payload.username] = action.payload.playground;
        return tmp;
      case  actionType.REMOVEGRID:
         tmp  = {...state};
        delete tmp[action.payload];
        return tmp;
      default:
        return state;
    }
}


export default reducer;