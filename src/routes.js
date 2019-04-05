import React from 'react';
import {Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Clash from '../src/containers/Clash/ClashContainer'
import {Navigation} from './containers/Navigation';

export const makeMainRoutes = () => {
  return (
    <BrowserRouter basename='/client' >
        <div>
          <Navigation />
          <Switch>
            <Route path="/about" render={(props) => <About  />} />
            <Route path="/login" render={(props) => <Login  />} />
            <Route path="/logout" render={(props) => <Logout />} />
            <Route path="/clashes/:clashId" render={(props) => <Clash {...props}/>} />
            <Route path="/" render={(props) => <App  />} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}
