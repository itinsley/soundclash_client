import React, { Component } from 'react';
import FacebookSession from '../api/FacebookSession';
import FacebookLogin from 'react-facebook-login';
import UserSession from '../lib/UserSession/UserSession';

class FacebookLoginWrapper extends Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  async responseFacebook(response) {
    const accessToken = response["accessToken"];
    const sessionResponse = await FacebookSession.create(accessToken)

    // See if we can get ourselves a session cookie
    UserSession.set(sessionResponse.jwt);

    // Reload to make refreshing the nav nice and simple..
    window.location.href="/client";
  }

  render(){

    return(
      <div id="fbDemo">
        <FacebookLogin
          className='btn-facebook'
          appId={process.env.REACT_APP_FACEBOOK_APPID}
          fields="name,email,picture"
          callback={this.responseFacebook} 
          icon="fa-facebook"
          />
      </div>
    )

  }
}

export default FacebookLoginWrapper;