import * as actionType from "../actionTypes"

const reducer = (state = null, action) => {
    switch (action.type) {
        case actionType.SOCKET:
            return action.payload;
        default:
            return state;
    }
}


export default reducer;