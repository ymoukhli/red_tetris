import * as actionType from "../actionTypes"

const reducer = (state = [], action) => {
    switch (action.type) {
        case actionType.UPDATEQUEUE:
            return action.payload.slice(0,4);
        default:
            return state;
    }
}


export default reducer;