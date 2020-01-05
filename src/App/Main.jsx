import React from 'react';
import {  Switch, Route } from 'react-router-dom'

import Card from './Components/Card'
import Login from './Components/Login'
import Register from './Components/Register'
import EngineerProfile from './Components/EngineerProfile'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import Companies from './Components/Company/Card'
import CompanyProfile from './Components/Company/CompanyProfile'
import ProfileCompany from './Components/Company/Profile'
import EditCompany from './Components/Company/EditProfile'

function Main(){
    return(
        <Switch>
            <Route exact path='/' component={Card}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/engineerprofile/:id" component={EngineerProfile}/>
            <Route path="/profile/:id" component={Profile}/>
            <Route path="/edit/:id" component={EditProfile}/>
            <Route path="/companies" component={Companies}/>
            <Route path="/companyprofile/:id" component={CompanyProfile} />
            <Route path="/profilecompany/:id" component={ProfileCompany} />
            <Route path="/editcompany/:id" component={EditCompany} />
        </Switch>
    )
}

export default Main