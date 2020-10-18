import React, {Component, Fragment, useEffect} from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavLink,
    NavItem} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import {setUserSessionAction} from "../../actions";
import setUserSession from "../../actions/setUserSessionAction";

function Navigation(props) {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  async function doLogout(){
    //dispatch logout action with the auth0 logout function
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
            <button className='btn-link nav-link' onClick={doLogout}>Logout</button>
          </NavItem>;
        </Fragment>
      )
  }

  function notLoggedInNavItem(){
    return (
      <Fragment>
        <NavItem>
          <a className='nav-link' href='/users/sign_up'>Sign Up</a>
        </NavItem>
        <NavItem>
          <button
            id='login'
            className='btn-link nav-link'
            onClick={loginWithRedirect}>Login</button>
        </NavItem>
      </Fragment>
    )
  }

  function LoginNav(){
    return isAuthenticated ? loggedInNavItem() : notLoggedInNavItem()
  }

  return (
    <div>
      <Navbar dark expand="md" className="navbar navbar-default fixed-top bg-black" >
        <Link to='/' className='navbar-brand'>
          <img alt="Soundclash Logo" src='https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg' />
        </Link>
        <Nav className="ml-auto navbar-fixed-top" navbar>
          <NavItem>
            <NavLink tag={Link} to='/about' >What is this?</NavLink>
          </NavItem>
          <LoginNav />
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;