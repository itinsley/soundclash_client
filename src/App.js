import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Nav, About, Home, Login, NotFound  } from './components';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends React.Component {
  responseFacebook (response) {
    const accessToken = response["accessToken"];
    console.log(accessToken)

    //See if we can proxy to api
    // axios.get("/api/wontwork")

    // See if we can get ourselves a session cookie
    // Browser should take care of storage
    axios.post('/users/auth/api_sessions', {
        AccessToken: accessToken
      })
      .then((response)=> {
        //This response confirms server validates FB user and returns FB user ID (user.uid in soundclash DB)
        console.log(response);
        //Now we've got a JWT. Can we access a secure route?
        localStorage.token = response['data']['jwt']

        axios.get('/users/83.json?jwt=bogus').then((response)=>{
          console.log("bogus token should fail");
          console.log(response);
        })

        axios.get('/users/83.json?jwt=' + localStorage.token).then((response)=>{
          console.log(response);
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentClicked (response) {
    console.log(response)
  }

  render() {
    return (
      <Router basename='/client'>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <Nav />
          </div>

          <div className="App-intro">
            <div id = "routes">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/login' component={Login}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
          <div id="fbDemo">
            {process.env.REACT_APP_FACEBOOK_APPID}
            <FacebookLogin
              // appId="389386081241417" //soundclash_development
              // appId="803392683074499" //soundclash_edge
              appId={process.env.REACT_APP_FACEBOOK_APPID} //soundclash_edge
              autoLoad={true}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


