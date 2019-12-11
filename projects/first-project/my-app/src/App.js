import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import AboutUs from './components/AboutUs/AboutUs';
import Technologies from './components/Technologies/Technologies';
import Learning from './components/Learning/Learning';
import Contacts from './components/Contacts/Contacts';
import Reviews from './components/Reviews/Reviews';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path='/welcome' component={Welcome} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/technologies' component={Technologies} />
          <Route path='/learning' component={Learning} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/reviews' component={Reviews} />
          <Route path='*' component={Welcome} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;



