import React, {Component} from "react";
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';

export class Navigation extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        Username:''
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      
      return (
        <div>
          <Navbar dark color="dark" expand="md">
              <Link to='/' className='navbar-brand'>
                <img src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
              </Link>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to='/about'>What is this?</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <a className='nav-link' href='/users/sign_up'>Sign Up</a>
                </NavItem>
                
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }