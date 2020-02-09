import React from 'react';
import { Router } from '@reach/router';

import './App.css';

import Home from './components/Home'
import AsanaCallback from './components/AsanaCallback';
import AsanaTasksProvider from './hooks/asana';
import { TasksProvider } from './hooks/tasks';

const App = () => {
  return (
    <AsanaTasksProvider>
      <TasksProvider>
        <Router style={{ height: '100%' }}>
          <Home path="/"/>
          <AsanaCallback path="/auth/callback/asana" />
        </Router>
      </TasksProvider>
    </AsanaTasksProvider>
  )
}

export default App;
