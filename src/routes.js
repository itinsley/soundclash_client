import React from 'react';
import {Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import About from './components/About';
import Login from './components/Login';

export const makeMainRoutes = () => {
  return (
    <BrowserRouter basename='/client' >
        <div>
          <Route path="/" render={(props) => <App {...props} />} />
          <Route path="/about" render={(props) => <About  {...props} />} />
          <Route path="/login" render={(props) => <Login  {...props} />} />
        </div>
      </BrowserRouter>
  );
}
