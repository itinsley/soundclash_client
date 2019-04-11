import React, { Component } from 'react';
import UserSession from '../lib/UserSession/UserSession';
import FacebookLoginWrapper from './FacebookLoginWrapper';
import UserApi from '../api/Users';

class SoundClashLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await UserApi.login(this.state.email, this.state.password );
      console.log(response)
      UserSession.set(response.jwt);
      // Reload to make refreshing the nav nice and simple..
      window.location.href="/client";
    } catch(error){
      console.log(error)
      alert(`Login failed: ${error.response.data.error}`);
    }
  }

  render(){

    return(
      <div className="row mx-auto text-left p-1" >
        <div className="col">
          <form onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="text" 
                      className="form-control" 
                      name="email" 
                      aria-describedby="emailHelp" 
                      placeholder="Enter email"
                      value={this.state.email} 
                      onChange={this.handleChange} />                   
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" 
                      className="form-control" 
                      name="password" 
                      placeholder="Password"
                      value={this.state.password} 
                      onChange={this.handleChange} /> 
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          <ul className="m-0 p-0 pt-3">
            <li><a href="/users/password/new">Forgot your password?</a></li>
            <li><a href="/users/sign_up">Sign up</a></li>
          </ul>
        </div>
      </div>
    )  
  } 
}

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
      return <div >Currently logged in as: {this.state.currentUser.email}</div>;
    }
  }

  render() {
    return (
      <div>
      <div className="mx-auto text-center" style={{maxWidth: '40.25rem'}}>
        <h1 className="px-2 p-3">Login</h1>
        <hr/>
        <div className="container" >
          <div className="row mx-auto text-center p-3">
            <div className="col">
              {this.currentUser()}
            </div>
          </div>
          <div className="row mx-auto text-center p-3">
            <div className="col">
              <FacebookLoginWrapper />
            </div>
          </div>
          <div className="row mx-auto text-center">
            <div className="col">
              OR
            </div>
          </div>
          <div className="row mx-auto text-center p-3">
            <div className="col">
            <SoundClashLogin />
            </div>
          </div>
        </div>
      </div>
      </div>

    );
  }
}

export default Login;