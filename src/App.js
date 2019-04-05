import React, { Component, Fragment } from 'react';
import './App.css';
import {Navigation} from './containers/Navigation';
import RecentClashes from './containers/Clash/RecentClashes';

class App extends Component {

  render() {
    return (
      <Fragment>
      <Navigation />
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey mt-5">
        <RecentClashes />
      </main>
      </Fragment>
    );
  }
}

export default App;