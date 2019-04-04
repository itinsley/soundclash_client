import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';
import UserSession from '../lib/UserSession/UserSession';


export class Navigation extends Component {
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
      const userDetails = UserSession.get();
      if (userDetails.userName){
        const loggedIn = 
          <Fragment>
            <NavItem>
              <NavLink className='disabled'>Hello {userDetails.userName}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="logout">Logout</NavLink>
            </NavItem>;
          </Fragment>
          return loggedIn;
      } else {
        const loggedOut =
          <Fragment>
            <NavItem>
              <a className='nav-link' href='/users/sign_up'>Sign Up</a>
            </NavItem>
            <NavLink tag={Link} to="/login">Login</NavLink>
          </Fragment> 
        return loggedOut;
      }
    }

    
    render() {
      
      return (
        <div>
          <Navbar dark color="dark" expand="md">
              <Link to='/' className='navbar-brand'>
                <img alt="Soundclash Logo" src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
              </Link>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to='/about'>What is this?</NavLink>
                </NavItem>
                {this.loginNav()}                
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }