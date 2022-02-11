import joinGame from "./JoinGame";
import GameInterface from "./GameInterface";
import Nav from "./Nav";
import Users from "./Users";
import SnackBar from "./SnackBar";
import Overlay from "./Overlay";
import { combineReducers } from "redux";
const routeReducers = combineReducers({
  joinGame,
  GameInterface,
  Nav,
  Users,
  SnackBar,
  Overlay,
});

export default routeReducers;
