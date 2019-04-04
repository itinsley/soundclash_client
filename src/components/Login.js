import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import UserSession from '../lib/UserSession/UserSession';

class Login extends Component {

  constructor(props) {
    super(props);
    const userDetails = UserSession.get();
    const userEmail = userDetails ? userDetails.email: '';
    this.state = {
      user: {
        id: "",
        email: ""
      },
      currentUserEmail: userEmail
    };
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  currentUser(){
    if (this.state.currentUserEmail){
      return <div >Current User: {this.state.currentUserEmail}</div>;
    }
  }

  render() {
    return (
      <div className="mx-auto text-center" style={{maxWidth: '56.25rem'}}>
        <h1 >Login</h1>
        <hr/>

          <div id="fbDemo">
            {this.currentUser()}

            <FacebookLogin
              className='btn-facebook'
              appId={process.env.REACT_APP_FACEBOOK_APPID}
              // autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook} 
              icon="fa-facebook"
              />
          </div>
      </div>
    );
  }

  responseFacebook(response) {
    const accessToken = response["accessToken"];
    console.log("FBAccessToken", accessToken)

    // See if we can get ourselves a session cookie
    // Browser should take care of storage
    axios.post('/users/auth/api_sessions', {
        AccessToken: accessToken
      })
      .then((response)=> {
        //This response confirms server validates FB user and returns FB user ID (user.uid in soundclash DB)
        console.log(response);
        const token = response['data']['jwt'];
        UserSession.set(token);
        // Reload to make refreshing the nav nice and simple..
        window.location.href="/client";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default Login;