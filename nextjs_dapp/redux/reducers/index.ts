import { combineReducers } from 'redux'
import profileReducer from './profile'
import menuReducer from './menu'
import aggrementReducer from './agreement'

const reducers: any = {
  profileReducer,
  menuReducer,
  aggrementReducer,
}

export default combineReducers(reducers)
