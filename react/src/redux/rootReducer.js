import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer'
import { notificationReducer } from './notification/reducer'

export const rootReducer = combineReducers({ authReducer, notificationReducer })
