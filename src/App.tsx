import React from 'react';
import { Router } from '@reach/router';

import './App.css';

import Home from './components/Home'
import AsanaCallback from './components/AsanaCallback';
import AsanaTasksProvider from './hooks/asana';

const App = () => {
  return (
    <AsanaTasksProvider>
      <Router style={{ height: '100%' }}>
        <Home path="/"/>
        <AsanaCallback path="/auth/callback/asana" />
      </Router>
    </AsanaTasksProvider>
  )
}

export default App;
