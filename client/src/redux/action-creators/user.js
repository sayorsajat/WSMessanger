import { SET_IS_AUTHENTICATED, SET_USER } from "../utils/actionConsts";

export function setIsAuthenticated() {
    return {
        type: SET_IS_AUTHENTICATED
    }
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}