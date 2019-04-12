import React from 'react';
import {Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Clash from '../src/containers/Clash/ClashContainer'
import {Navigation} from './containers/Navigation';

  // Should never hit these routes in prod as root will point to server app
  // and this app only has the scope of basename='/client'
  function WrongWayGoBack(props){
    return(
      <div style={{paddingTop: "100px"}}>
        Did you mean to visit {props.link}
      </div>
    )
}

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
            <Route path="/users/sign_up" render={(props) => {
              return <WrongWayGoBack link={<a href='/users/sign_up'>Sign Up</a>} />
            }} />
            <Route path="/users/password/new" render={(props) => {
              return <WrongWayGoBack link={<a href='/users/password/new'>Reset Password</a>} />
            }} />
            <Route path="/users/password/new" render={(props) => <Logout />} />
            <Route path="/" render={(props) => <Home  />} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}
