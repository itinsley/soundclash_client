
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render() {
        return (
            <ul className="NavList">
                <li>
                    <Link exact to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/about">ABOUT</Link>
                </li>
                <li>
                    <Link to="/contacts">CONTACTS</Link>
                </li>
            </ul>
        );
    }
}

export default Nav;