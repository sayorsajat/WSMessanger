import { SET_IS_AUTHENTICATED, SET_USER } from "../utils/actionConsts"


const initialState = {
    user: {},
    isAuthenticated: true
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload}
        case SET_IS_AUTHENTICATED:
            return {...state, isAuthenticated: true}
        default:
            return state
    }
}