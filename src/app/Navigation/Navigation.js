import React, {Component, Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import {setUserSessionAction} from "../../actions";

function Navigation(props) {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  async function doLogout(){
    logout()
    props.dispatch(setUserSessionAction(null))
  }

  useEffect(() => {
    if (user != props.currentUser) {
      props.dispatch(setUserSessionAction(user))
    }
  });

  function loggedInNavItem(){
    return (
        <Fragment>
          <NavItem>
            <NavLink className='disabled'>Hello {user.name}</NavLink>
          </NavItem>
          <NavItem>
            <Button className='btn-link nav-link' onClick={doLogout}>Logout</Button>
          </NavItem>;
        </Fragment>
      )
  }

  function notLoggedInNavItem(){
    return (
      <Fragment>
        <NavItem>
          <NavLink className='nav-link' href='/users/sign_up'>Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <Button
            id='login'
            className='btn-link nav-link'
            onClick={loginWithRedirect}>Login</Button>
        </NavItem>
      </Fragment>
    )
  }

  function LoginNav(){
    return isAuthenticated ? loggedInNavItem() : notLoggedInNavItem()
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="black" dark expand="md" className="fixed-top bg-black">
        <NavbarBrand href='/'>
          <img alt="Soundclash Logo" src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink tag={Link} to='/about' >What is this?</NavLink>
            </NavItem>
            <LoginNav />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;