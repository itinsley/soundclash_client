
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render() {
        return (



<header role="banner" className="header  l-container l-container--full-bleed  u-position-fixed u-position-pin-sides">
  <div className="l-container u-s-pe-small">
    <div className="l-side-by-side-alt">
      <div className="l-side-by-side-alt__left">
        <Link to="/"><img src= "https://res.cloudinary.com/soundclash/image/asset/logo-2fbf65a68e23f142eb0690887b418c0e.svg" className="logo" alt="Soundclash"/></Link>
      </div>
      <div className="l-side-by-side-alt__right">
        <nav role="navigation" className="u-text-align-right u-text-size-x-small u-text-size-base-from-lap">
          <Link to='/about' className="u-s-mr-tiny u-display-inline-block">What is this?'</Link>
          <Link to="/" className= "u-display-inline-block">Hello Mr Ian</Link>,<span> </span>
          <Link to="login" className= "u-display-inline-block"> Login</Link>
          <Link to="/" className= "u-display-inline-block"> Logout</Link>
          <span className="u-hide-up-to-palm"> or <Link to="/" className= "u-display-inline-block">Sign up</Link></span>
        </nav>
      </div>
    </div>
  </div>
</header>          
        );
    }
}

export default Nav;