import counterReducer from "./counter";
import joinGame from "./joinGame";
import GameInterface from "./GameInterface";
import Nav from "./Nav";
import { combineReducers } from "redux";

const routeReducers = combineReducers({
  counter: counterReducer,
  joinGame,
  GameInterface,
  Nav
});

export default routeReducers
