import React from 'react';
import {Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';

export const makeMainRoutes = () => {
  return (
    <BrowserRouter basename='/client' >
        <div>
          <Route path="/" render={(props) => <App  />} />
          <Route path="/about" render={(props) => <About  />} />
          <Route path="/login" render={(props) => <Login  />} />
          <Route path="/logout" render={(props) => <Logout />} />
        </div>
      </BrowserRouter>
  );
}
