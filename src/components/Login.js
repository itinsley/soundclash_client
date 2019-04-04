import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import UserSession from '../lib/UserSession/UserSession';
import Session from '../api/Session';

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

  async responseFacebook(response) {
    const accessToken = response["accessToken"];
    const sessionResponse = await Session.create(accessToken)

    // See if we can get ourselves a session cookie
    UserSession.set(sessionResponse.jwt);

    // Reload to make refreshing the nav nice and simple..
    window.location.href="/client";
  }

}

export default Login;