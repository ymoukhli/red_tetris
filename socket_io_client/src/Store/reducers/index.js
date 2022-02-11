import joinGame from "./JoinGame";
import GameInterface from "./GameInterface";
import Nav from "./Nav";
import Users from "./Users"
import { combineReducers } from "redux";
const routeReducers = combineReducers({
  joinGame,
  GameInterface,
  Nav,
  Users,
});

export default routeReducers
