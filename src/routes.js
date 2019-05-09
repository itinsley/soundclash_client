import React from 'react';
import {Route, Router, Switch } from 'react-router-dom';
import Home from './app/Home/HomeContainer';
import About from './components/About';
import connectedLogin from './components/connectedLogin';
import Clash from '../src/app/Clash/ClashContainer';
import NavigationContainer from './app/Navigation/NavigationContainer';
import { Provider } from 'react-redux';
import history from './history';

  // Should never hit these routes in prod as root will point to server app
  // and this app only has the scope of basename='/client'
  function WrongWayGoBack(props){
    return(
      <div style={{paddingTop: "100px"}}>
        Did you mean to visit {props.link}
      </div>
    )
}

export const makeMainRoutes = (store) => {
  const ConnectedLogin = connectedLogin();
  return (
    <Provider store={store}>
      <Router basename='/client' history={history} >
          <div>
            <NavigationContainer />
            <Switch>
              <Route path="/about" render={(props) =>  <About  />} />
              <Route path="/login" render={(props) => <ConnectedLogin history={props.history} />} />
              <Route path="/clashes/:clashId" render={(props) => <Clash {...props}/>} />
              <Route path="/users/sign_up" render={(props) => {
                return <WrongWayGoBack link={<a href='/users/sign_up'>Sign Up</a>} />
              }} />
              <Route path="/users/password/new" render={(props) => {
                return <WrongWayGoBack link={<a href='/users/password/new'>Reset Password</a>} />
              }} />
              <Route path="/" render={(props) => <Home />} />
            </Switch>
          </div>
        </Router>
    </Provider>
  );
}
