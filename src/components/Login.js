import React, { Component } from 'react';
import UserSession from '../lib/UserSession/UserSession';
import FacebookLoginWrapper from './FacebookLoginWrapper';

class Login extends Component {

  constructor(props) {
    super(props);
    const currentUser = UserSession.get();
    this.state = {
      currentUser
    };
  }

  currentUser(){
    if (this.state.currentUser){
      return <div >Current User: {this.state.currentUser.email}</div>;
    }
  }

  render() {
    return (
      <div className="mx-auto text-center" style={{maxWidth: '56.25rem'}}>
        <h1 >Login</h1>
        <hr/>
        {this.currentUser()}
        <FacebookLoginWrapper />
      </div>
    );
  }
}

export default Login;