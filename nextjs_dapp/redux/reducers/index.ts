import { combineReducers } from 'redux'
import profileReducer from './profile'
import menuReducer from './menu'

const reducers: any = {
  profileReducer,
  menuReducer,
}

export default combineReducers(reducers)
