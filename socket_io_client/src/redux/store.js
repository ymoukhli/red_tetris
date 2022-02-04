import reducers from "./index"
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { action } from "../redux/actions";

const composedEnhancement = composeWithDevTools({ 
    action, 
    trace: true, 
    traceLimit: 25 
})

const store = createStore(reducers,
    {}, composedEnhancement(
        applyMiddleware(thunk)
        ));

export default store;
