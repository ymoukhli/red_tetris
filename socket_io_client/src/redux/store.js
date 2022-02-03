import reducers from "./index"
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"
const composedEnhancement = composeWithDevTools(
    applyMiddleware(thunk)
    )

const store = createStore(reducers,
    {}, composedEnhancement);

export default store;
