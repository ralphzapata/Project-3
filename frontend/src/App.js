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
import PageNotFound from './views/PageNotFound';

import Iframe from 'react-iframe'

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
          <Route path="/old">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">

                                <div class="row">
                                    <Iframe url="https://travel-verse.herokuapp.com/"
                                        width="100%"
                                        height="500"
                                        id="myId"
                                        className="col-12 border-0"
                                        display="initial"
                                        position="relative" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Pulse.React(App);
