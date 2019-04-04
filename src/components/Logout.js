import React, {Component} from 'react';
import UserSession from './UserSession/UserSession';

class Logout extends Component {

  constructor(props) {
    super(props);
    UserSession.clear();
    window.location.href="/client";
  }

  render() {
    return (
      <div className="mx-auto text-center" style={{maxWidth: '56.25rem'}}>
        You have been logged out
      </div>
    )
  }
}

export default Logout;