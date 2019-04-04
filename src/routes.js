import React from 'react';
import {Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import About from './components/About';
import history from './history';

export const makeMainRoutes = () => {
  return (
    <BrowserRouter basename='/client' history={history}>
        <div>
          <Route path="/" render={(props) => <App {...props} />} />
          <Route path="/about" render={(props) => <About  {...props} />} />
        </div>
      </BrowserRouter>
  );
}
