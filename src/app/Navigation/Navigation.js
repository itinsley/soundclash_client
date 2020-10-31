import React, { Fragment, useEffect, useState } from "react";
import ConnectStore from '../../lib/ConnectStore';
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
import { setUserSessionAction, clearUserSessionAction } from "../../actions";

function Navigation(props) {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently
  } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Set user and JWT in global state when auth0 user status changes
  useEffect(() => {
    if (user==null){
      props.dispatch(clearUserSessionAction())
      return
    }

    if (user.email !== props.currentUser.email) {
      (async () => {
        const jwt = await getAccessTokenSilently();
        props.dispatch(setUserSessionAction(user, jwt))
      })();
    }
  }, []);

  return (
    <div>
      <Navbar color="black" dark expand="md" className="fixed-top bg-black">
        <NavbarBrand tag={Link} to='/' >
          <img alt="Soundclash Logo" src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavLink tag={Link} to='/' >Home</NavLink>
          <NavItem>
              <NavLink tag={Link} to='/about' >What is this?</NavLink>
            </NavItem>
            <LoginNav />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

  function loggedInNavItem(){
    return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to='/user'>Hello {props.currentUser.name}</NavLink>
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

  async function doLogout(){
    logout()
    props.dispatch(setUserSessionAction(null))
  }
}

export default ConnectStore(Navigation);