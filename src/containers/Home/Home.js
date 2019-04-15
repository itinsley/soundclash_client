import React, { Component, Fragment } from 'react';
import '../../App.css';
import RecentClashes from '../Clash/RecentClashes';
import UserSession from '../../lib/UserSession/UserSession';
import MyClashes from '../Clash/MyClashes';

function MyClashesWrapper(){
  const currentUser = UserSession.get();
  if(currentUser){
    return <MyClashes currentUser={currentUser} />
  }
  return null
}


class Home extends Component {

  render() {

    return (
      <Fragment >
        <div className="top-element-margin"></div>
        <MyClashesWrapper />
        <RecentClashes />
      </Fragment>
    );
  }
}

export default Home;