import { combineReducers } from 'redux'

import Engineers from './Engineers'
import Login from './Login'
import CompanyProfile from './CompanyProfile'
import Profile from './Profile'
import Companies from './Companies'

const rootReducer = combineReducers({
    Engineers,
    Login,
    Profile,
    Companies,
    CompanyProfile
})

export default rootReducer