import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import AboutUs from './components/AboutUs/AboutUs';
import Technologies from './components/Technologies/Technologies';
import Learning from './components/Learning/Learning';
import Contacts from './components/Contacts/Contacts';
import { Route, Switch } from 'react-router-dom';
import ReviewsContainer from "./components/Reviews/ReviewsContainer";
import TestDialogsContainer from "./components/TestDialogs/TestDialogsContainer";

const App = (props) => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/aboutus' component={AboutUs} />
        <Route path='/technologies' component={Technologies} />
        <Route path='/learning' component={Learning} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/reviews' render={() => <ReviewsContainer store={props.store}/>} />
        <Route path='/testdialogs' render={() => <TestDialogsContainer store={props.store}/>} />
        <Route path='/' component={Welcome} />
      </Switch>
    </div>
  );
};

export default App;



