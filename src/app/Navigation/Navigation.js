import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';
import LoginContainer from '../shared/LoginContainer';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  loginNav(){
    const currentUser = this.props.currentUser;
    if (currentUser){
      const loggedIn =
        <Fragment>
          <NavItem>
            <NavLink className='disabled'>Hello {currentUser.userName}</NavLink>
          </NavItem>
          <NavItem>
            <button className='btn-link nav-link' onClick={this.props.logOut}>Logout</button>
          </NavItem>;
        </Fragment>
        return loggedIn;
    } else {
      const loggedOut =
        <Fragment>
          <NavItem>
            <a className='nav-link' href='/users/sign_up'>Sign Up</a>
          </NavItem>
          <NavItem>
            <button id='login' className='btn-link nav-link' onClick={this.props.onOpenLoginModal}>Login</button>
          </NavItem>;
        </Fragment>
      return loggedOut;
    }
  }


  render() {
    return (
      <div>
        <LoginContainer open={this.props.isLoginModalOpen} onClose={this.props.onCloseLoginModal}/>
        <Navbar dark expand="md" className="navbar navbar-default fixed-top bg-black" >
            <Link to='/' className='navbar-brand'>
              <img alt="Soundclash Logo" src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
            </Link>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navbar-fixed-top" navbar>
              <NavItem>
                <NavLink tag={Link} to='/about' >What is this?</NavLink>
              </NavItem>
              {this.loginNav()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;