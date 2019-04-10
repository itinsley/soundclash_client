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


class App extends Component {

  render() {

    return (
      <Fragment >
        <MyClashesWrapper />
        <RecentClashes />
      </Fragment>
    );
  }
}

export default App;