import { SET_MESSAGE_LIST, SET_ROOMS_LIST, SET_ROOM_ID } from "../utils/actionConsts"


const initialState = {
    roomId: 1,
    roomsList: null,
    messageList: null,
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROOM_ID:
            return {...state, roomId: action.payload}
        case SET_ROOMS_LIST:
            return {...state, roomsList: action.payload}
        case SET_MESSAGE_LIST:
            return {...state, messageList: action.payload}
        default:
            return state
    }
}