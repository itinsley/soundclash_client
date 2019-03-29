import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        email: ""
      }
    };
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

          <div id="fbDemo">{process.env.REACT_APP_FACEBOOK_APPID}
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APPID}
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook} />
          </div>
          <div>
            <button onClick={()=>this.handleClick()}>
              Prove Auth Works
            </button>
          </div>
          <div id="responseData">
            Below is an arbitrary user from a secured URI for POC for JWT
            <table border='1'>
              <tr><td id='userId'>{this.state['user']['id']}</td></tr>
              <tr><td id='userEmail'>{this.state['user']['email']}</td></tr>
            </table>
          </div>

      </div>
    );
  }

  handleClick (){
    //Retrieve a secure page (hardcoded user in edge)
    axios.get('/users/5.json?jwt=' + localStorage.token).then((response)=>{
      this.setState({
        user: {
          id: response['data']['id'],
          email: response['data']['email']
        }
      })
    })
  }

  responseFacebook(response) {
    const accessToken = response["accessToken"];
    console.log(accessToken)

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

      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default Login;