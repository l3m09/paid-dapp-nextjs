import { combineReducers } from 'redux'
import profileReducer from './profile'
import menuReducer from './menu'
import walletReducer from './wallet'

const reducers: any = {
  profileReducer,
  menuReducer,
  walletReducer,
}

export default combineReducers(reducers)
