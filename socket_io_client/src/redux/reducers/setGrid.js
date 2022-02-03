import * as actionType from "../actionTypes"
import { generateGrid } from "../../Utilitys/generateGrid";

const grid = generateGrid();


const reducer = (state = grid, action) => {
    switch (action.type) {
        case actionType.GRID:
            return action.payload;
        default:
            return state;
    }
}


export default reducer;