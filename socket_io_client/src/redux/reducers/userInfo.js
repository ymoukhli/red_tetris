import * as actionType from "../actionTypes"
import produce from "immer"


const reducer = (state = [], action) => {
    switch (action.type) {
        case actionType.ADDUSERINFO:

            const tmpArr = [];
                for (const [key, value] of Object.entries(action.payload.users)) {
                    let tmp = {};
                    tmp.username = value.username;
                    tmp.score = value.score;
                    tmp.lines = value.lines;
                    tmpArr.push(tmp);
                }
                return tmpArr
        case actionType.UPDATEUSERINFO:

            return produce(state, draft => {
                const tmp = draft.find(e => e.username === action.payload.username);
                tmp.score = action.payload.score;
                tmp.lines = action.payload.lines;
            })
        case actionType.REMOVEUSERINFO:

            return (produce(state, draft => {
                const index = draft.findIndex(e => e.username === action.payload);
                if (index >= 0)
                    draft.splice(index, 1);
            }))
        default:
            return state;
    }
}


export default reducer;