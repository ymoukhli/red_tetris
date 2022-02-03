import * as actionType from "../actionTypes"

const reducer = (state = false, action) => {
    switch (action.type) {
        case actionType.START:
            return action.payload;
        default:
            return state;
    }
}


export default reducer;