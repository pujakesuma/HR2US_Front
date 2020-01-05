import { combineReducers } from 'redux'

import Engineers from './Engineers'
import Login from './Login'
import Profile from './Profile'
import Companies from './Companies'

const rootReducer = combineReducers({
    Engineers,
    Login,
    Profile,
    Companies
})

export default rootReducer