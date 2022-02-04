import {combineReducers} from 'redux';
import joined from './reducers/joinReducer';
import grid from './reducers/setGrid';
import grids from './reducers/setGrids';
import multiPlayers from './reducers/multiPlayers';
import socket from './reducers/socket';
import started from './reducers/start';
import room from './reducers/setRoom';
import roomName from './reducers/setRoomName';
import userID from './reducers/setUserID';



const reducers = combineReducers({
    joined,
    grid,
    grids,
    multiPlayers,
    socket,
    started,
    room,
    roomName,
    userID
})

export default reducers;