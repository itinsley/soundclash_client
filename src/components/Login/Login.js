import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>

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
    );
  }

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

}

export default Login;