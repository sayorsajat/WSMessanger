import { combineReducers } from 'redux'
import { messageReducer } from './messageReducer'
import {userReducer} from './userReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer
})