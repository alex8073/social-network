import React from 'react';
import './App.css';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Technologies from './components/Technologies';
import Learning from './components/Learning';
import Contacts from './components/Contacts';

const App = () => {
  return (
    <div>
      <Header />
      <AboutUs />
      <Technologies />
      <Learning />
      <Contacts />
    </div>
  );
}

export default App;


