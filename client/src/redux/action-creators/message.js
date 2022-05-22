import { SET_MESSAGE_LIST, SET_ROOMS_LIST, SET_ROOM_ID } from "../utils/actionConsts";


export function setRoomId(roomId) {
    return {
        type: SET_ROOM_ID,
        payload: roomId
    }
}

export function setRoomsList(roomsList) {
    return {
        type: SET_ROOMS_LIST,
        payload: roomsList
    }
}

export function setMessageList(messageList) {
    return {
        type: SET_MESSAGE_LIST,
        payload: messageList
    }
}