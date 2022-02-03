import * as actionType from "../actionTypes"

const reducer = (state = false, action) => {
    switch (action.type) {
        case actionType.MULTIPLAYER:
            return action.payload;
        default:
            return state;
    }
}


export default reducer;