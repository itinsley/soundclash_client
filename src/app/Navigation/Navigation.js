import React, { Fragment, useEffect, useState } from "react";
import ConnectStore from "../../lib/ConnectStore";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem,
} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { setUserSessionAction, clearUserSessionAction } from "../../actions";
import ErrorAlertContainer from "../../lib/ErrorAlertContainer";
import Avatar from "../shared/Avatar";

function Navigation(props) {
  const {
    user: auth0user,
    isAuthenticated,
    loginWithPopup,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Set user and JWT in global state when auth0 user status changes
  useEffect(() => {
    if (auth0user == null) {
      props.dispatch(clearUserSessionAction());
      return;
    }

    // Reset user session if auth0User different to session user
    if (auth0user.email !== (props.currentUser && props.currentUser.email)) {
      (async () => {
        const jwt = await getAccessTokenSilently();
        props.dispatch(setUserSessionAction(auth0user, jwt));
      })();
    }
  }, []);

  return (
    <div>
      <Navbar color="black" dark expand="md" className="fixed-top bg-black">
        <NavbarBrand tag={Link} to="/">
          <img
            alt="Soundclash Logo"
            src="https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
            <NavItem>
              <NavLink tag={Link} to="/about">
                What is this?
              </NavLink>
            </NavItem>
            <ErrorAlertContainer errorMessage={props.currentUserError} />
            <LoginNav />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );

  function isLoggedIn() {
    return isAuthenticated && props.currentUser;
  }

  function loggedInNavItem() {
    return (
      <Fragment>
        <NavItem>
          <NavLink tag={Link} to="/user">
            {props.currentUser.name}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/user">
            <Avatar
              user={props.currentUser}
              description="User avatar"
              size="35"
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <Button className="btn-link nav-link" onClick={doLogout}>
            Logout
          </Button>
        </NavItem>
        ;
      </Fragment>
    );
  }

  function notLoggedInNavItem() {
    return (
      <Fragment>
        <NavItem>
          <Button
            id="login"
            className="btn-link nav-link"
            onClick={loginWithPopup}
          >
            Login/Sign Up
          </Button>
        </NavItem>
      </Fragment>
    );
  }

  function LoginNav() {
    return isLoggedIn() ? loggedInNavItem() : notLoggedInNavItem();
  }

  async function doLogout() {
    logout();
    props.dispatch(setUserSessionAction(null));
  }
}

export default ConnectStore(Navigation);
