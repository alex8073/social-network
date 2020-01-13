import React from 'react';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import AboutUs from './components/AboutUs/AboutUs';
import Technologies from './components/Technologies/Technologies';
import Learning from './components/Learning/Learning';
import Contacts from './components/Contacts/Contacts';
import {Route, Switch} from 'react-router-dom';
import TestDialogsContainer from "./components/TestDialogs/TestDialogsContainer";
import UsersContainer from "./components/TestUsers/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = () => {
    return (
        <div>
            <HeaderContainer/>
            <Switch>
                <Route path='/aboutus' component={AboutUs}/>
                <Route path='/technologies' component={Technologies}/>
                <Route path='/learning' component={Learning}/>
                <Route path='/contacts' component={Contacts}/>
                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                <Route path='/testdialogs' render={() => <TestDialogsContainer/>}/>
                <Route path='/testusers' render={() => <UsersContainer />}/>
                <Route path='/' component={Welcome}/>
            </Switch>
        </div>
    );
};

export default App;



