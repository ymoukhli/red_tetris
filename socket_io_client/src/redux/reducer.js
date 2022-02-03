const initstate = {
    joined: false,
}

export default function reducer(state = initstate, type, payload) {
    switch (type) {
        case "join":
            return {
                ...state,
                joined: payload.joined
            }
    
        default:
            break;
    }
}