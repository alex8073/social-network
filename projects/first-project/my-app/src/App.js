import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import AboutUs from './components/AboutUs/AboutUs';
import Technologies from './components/Technologies/Technologies';
import Learning from './components/Learning/Learning';
import Contacts from './components/Contacts/Contacts';

const App = () => {
  return (
    <div>
      <Header />
      <Welcome />
      <AboutUs />
      <Technologies />
      <Learning />
      <Contacts />
    </div>
  );
};

export default App;


