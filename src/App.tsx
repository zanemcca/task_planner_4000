import React from 'react';
import { Router } from '@reach/router';

import './App.css';

import Home from './components/Home'
import AsanaCallback from './components/AsanaCallback';

const App = () => {
  return (
    <Router>
      <Home path="/"/>
      <AsanaCallback path="/auth/callback/asana" />
    </Router>
  )
}

export default App;
