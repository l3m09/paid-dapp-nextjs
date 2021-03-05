import { combineReducers } from 'redux'
import profileReducer from './profile'
import menuReducer from './menu'
import agreementReducer from './agreement'

const reducers: any = {
  profileReducer,
  menuReducer,
  agreementReducer,
}

export default combineReducers(reducers)
