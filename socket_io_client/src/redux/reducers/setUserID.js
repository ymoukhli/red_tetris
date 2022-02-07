import * as actionType from "../actionTypes"

const reducer = (state = "", action) => {
    switch (action.type) {
        case actionType.USERID:
            return action.payload;
        default:
            return state;
    }
}


export default reducer;