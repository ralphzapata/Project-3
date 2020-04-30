import React from 'react';
import Pulse from 'pulse-framework';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import NavigationBar from './components/NavigationBar';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Pulse.React(App);
