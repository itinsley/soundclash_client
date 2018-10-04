import React from 'react';
import './App.css';
import { Container, Nav } from './components';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


class App extends React.Component {
  responseFacebook (response) {
    const accessToken = response["accessToken"];
    console.log(accessToken)

    // curl -H "Accept: application/json" -H "Content-type: application/json" -X POST  http://localhost:3001/users/auth/api_sessions  -d '{"AccessToken": "EAAFiJQMNiUkBANTNW10nOoqotZCAhHq4kByUDxqOMd7Vcj3sCDf2p4aZB0orceXNKfY323gz5TFcTmldlIj65GUAjTOZAyvcxT6ISur5frl2XGdWPKfZBvRWJncSy1CFiijVuCyWjP0EPbV1k9nS2WGj4mQZBbogDvPnbsn9JvN9UYUftpQ0xkM0dmZB5N3I149OijKkVZCCgZDZD"}'
    axios.post('http://localhost:3001/users/auth/api_sessions', {
        AccessToken: accessToken
      })
      .then(function (response) {
        //This response confirms server validates FB user and returns FB user ID (user.uid in soundclash DB)
        console.log(response);
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
      <div className="App">
        <div className="App-header">
          <Nav/>
        </div>
        <div className="App-intro">
          <Container/>
        </div>
        <div id="fbDemo">
          <FacebookLogin
            appId="389386081241417"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />
        </div>
      </div>
    );
  }
}

export default App;
