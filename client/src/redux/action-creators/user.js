import { SET_IS_AUTHENTICATED_TRUE, SET_USER, GET_USER, SET_IS_AUTHENTICATED_FALSE } from "../utils/actionConsts";

export function setIsAuthenticated() {
    return {
        type: SET_IS_AUTHENTICATED_TRUE
    }
}

export function setIsAuthenticatedFalse() {
    return {
        type: SET_IS_AUTHENTICATED_FALSE
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function getUser() {
    return {
        type: GET_USER
    }
}