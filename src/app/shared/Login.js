import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Modal from 'react-responsive-modal';
import loginContext from './LoginContext';

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
    this.props.login(this.state.email, this.state.password);
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
            <button type="submit" className="btn btn-primary t-login">Submit</button>
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

  currentUser(){
    if (this.props.currentUser){
      return <div >Currently logged in as: {this.props.currentUser.email}</div>;
    }
  }

  message(){
    if ((this.props.loginContext===loginContext.Challenge)){
      return(
        <div>
        To challenge someone please Login below or <strong><a href='/users/sign_up'>create an account</a></strong> first
      </div>
      )
    }
  }

  render() {
    return (
      <Modal open={this.props.isLoginModalOpen} onClose={this.props.onCloseLoginModal} center>
        <div className="mx-auto text-center" style={{maxWidth: '40.25rem'}}>
          <div className="top-element-margin"></div>
          <h1 className="px-2 p-3">Login</h1>
          <hr/>
          <div className="container" >
          <div className="row mx-auto text-center p-3">
              <div className="col">
                {this.message()}
              </div>
            </div>

            <div className="row mx-auto text-center p-3">
              <div className="col">
                <FacebookLogin
                  className='btn-facebook btn-rounded'
                  appId={process.env.REACT_APP_FACEBOOK_APPID}
                  fields="name,email,picture"
                  callback={this.props.afterFacebookLogin}
                  icon="fa-facebook"
                  textButton="Continue with Facebook"
                  />
              </div>
            </div>
            <div className="row mx-auto text-center">
              <div className="col">
                OR
              </div>
            </div>
            <div className="row mx-auto text-center p-3">
              <div className="col">
                <SoundClashLogin login={this.props.soundClashlogin}/>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default Login;