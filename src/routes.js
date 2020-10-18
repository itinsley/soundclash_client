import React from 'react';
import {Route, Router, Switch } from 'react-router-dom';
import Home from './app/Home/HomeContainer';
import About from './app/About/About';
import Clash from '../src/app/Clash/ClashContainer';
import NavigationContainer from './app/Navigation/NavigationContainer';
import { Provider } from 'react-redux';
import history from './history';
import config from "./auth_config.json";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

export const makeMainRoutes = (store) => {
  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      audience={config.audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
        <Router basename='/client' history={history} >
            <div>
              <NavigationContainer />
              <Switch>
                <Route path="/about" render={(props) =>  <About  />} />
                <Route path="/clashes/:clashId" render={(props) => <Clash {...props}/>} />
                <Route path="/" render={(props) => <Home />} />
              </Switch>
            </div>
          </Router>
      </Provider>
    </Auth0Provider>
  );
}
