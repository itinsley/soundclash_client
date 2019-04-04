import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        email: ""
      },
       currentUserEmail: ""
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  render() {
    return (
      <div className="mx-auto text-center" style={{maxWidth: '56.25rem'}}>
        <h1 >Login</h1>
        <hr/>

          <div id="fbDemo">
            <div >Current User: {this.state.currentUserEmail}</div>

            <FacebookLogin
              className='btn-facebook'
              appId={process.env.REACT_APP_FACEBOOK_APPID}
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook} 
              icon="fa-facebook"
              />
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
        const token = response['data']['jwt'];
        const decoded = jwt.decode(token);
        this.setState({'currentUserEmail': decoded.email}) ;    
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default Login;