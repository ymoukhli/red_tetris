import * as actionType from "../actionTypes"
import produce from "immer"

const reducer = (state = {}, action) => {
    switch (action.type) {

        case actionType.ADDGRID:
        const tmp = {};
        for (const [key, value] of Object.entries(action.payload.users)) {
          if (key !== action.payload.userID) tmp[value.username] = value.Grid.playground;
        }
        return tmp;
      case actionType.UPDATEGRID:
         return produce(state, draft => {
           if (draft[action.payload.username])
           draft[action.payload.username] = action.payload.playground;

         })
      case  actionType.REMOVEGRID:
        return produce(state, draft => {
          delete draft[action.payload];
        })
      default:
        return state;
    }
}


export default reducer;