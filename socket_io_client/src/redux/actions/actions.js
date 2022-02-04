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

export function addGrid(data)
{
    return (dispatch) => {
        dispatch({ type: actions.ADDGRID , payload: data})
    }
}
export function updateGrid(data)
{
    return (dispatch) => {
        dispatch({ type: actions.UPDATEGRID , payload: data})
    }
}
export function removeGrid(data)
{
    return (dispatch) => {
        dispatch({ type: actions.REMOVEGRID , payload: data})
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

export function updateUserInfo(data)
{
    return (dispatch) => {
        dispatch({ type: actions.UPDATEUSERINFO, payload: data})
    }
}

export function removeUserInfo(data)
{
    return (dispatch) => {
        dispatch({ type: actions.REMOVEUSERINFO, payload: data})
    }
}

export function addUserInfo(data)
{
    return (dispatch) => {
        dispatch({ type: actions.ADDUSERINFO, payload: data})
    }
}

export function setUserID(id)
{
    return (dispatch) => {
        dispatch({ type: actions.USERID, payload: id})
    }
}


export function updateQueue(data)
{
    return (dispatch) => {
        dispatch({ type: actions.UPDATEQUEUE, payload: data})
    }
}

export function setStarted(boolean)
{
    return (dispatch) => {
        dispatch({ type: actions.START, payload: boolean})
    }
}