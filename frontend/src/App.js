import React, { useState } from 'react';

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import TestImagePage from './pages/TestImagePage';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/test" exact>
          <TestPage />
        </Route>
        <Route path="/image" exact>
          <TestImagePage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
