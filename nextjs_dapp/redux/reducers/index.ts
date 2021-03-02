import { combineReducers } from 'redux'
import profileReducer from './profile'

const reducers: any = {
  profileReducer,
}

export default combineReducers(reducers)
