import { GET_USER, SET_IS_AUTHENTICATED_FALSE, SET_IS_AUTHENTICATED_TRUE, SET_USER } from "../utils/actionConsts"


const initialState = {
    user: null,
    isAuthenticated: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload}
        case SET_IS_AUTHENTICATED_TRUE:
            return {...state, isAuthenticated: true}
        case SET_IS_AUTHENTICATED_FALSE:
            return {...state, isAuthenticated: false}
        case GET_USER:
            return {...state.user}
        default:
            return state
    }
}