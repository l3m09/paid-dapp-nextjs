import { combineReducers } from 'redux'
import profileReducer from './profile'
import menuReducer from './menu'
import agreementReducer from './agreement'
import walletReducer from './wallet'

const reducers: any = {
  profileReducer,
  menuReducer,
  agreementReducer,
  walletReducer,
}

export default combineReducers(reducers)
