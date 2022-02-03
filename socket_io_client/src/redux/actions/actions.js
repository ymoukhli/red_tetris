import * as actions from "../actionTypes"

export function join(boolean)
{
    return (dispatch) => {
        dispatch({ type: actions.JOIN, payload: boolean});
    }
}

export function setGrid(grid)
{
    return (dispatch) => {
        dispatch({ type: actions.GRID, payload: grid})
    }
}

export function setGrids(grids)
{
    return (dispatch) => {
        dispatch({ type: actions.GRIDS, payload: grids})
    }
}

export function setSocket(socket)
{
    return (dispatch) => {
        dispatch({ type: actions.SOCKET, payload: socket})
    }
}

export function setMultiplayer(boolean)
{
    return (dispatch) => {
        dispatch({ type: actions.MULTIPLAYER, payload: boolean})
    }
}

export function setRoomName(room)
{
    return (dispatch) => {
        dispatch({ type: actions.ROOMNAME, payload: room})
    }
}

export function setRoom(room)
{
    return (dispatch) => {
        dispatch({ type: actions.START, payload: room})
    }
}

export function setStarted(boolean)
{
    return (dispatch) => {
        dispatch({ type: actions.START, payload: boolean})
    }
}
