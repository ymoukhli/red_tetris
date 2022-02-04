import {combineReducers} from 'redux';
import joined from './reducers/joinReducer';
import grid from './reducers/setGrid';
import grids from './reducers/setGrids';
import multiPlayers from './reducers/multiPlayers';
import socket from './reducers/socket';
import started from './reducers/start';
import userInfo from './reducers/userInfo';
import roomName from './reducers/setRoomName';
import userID from './reducers/setUserID';
import tetrminosQueue from "./reducers/tetriminosQueue"


const reducers = combineReducers({
    joined,
    grid,
    grids,
    multiPlayers,
    socket,
    started,
    roomName,
    userID,
    tetrminosQueue,
    userInfo
})

export default reducers;