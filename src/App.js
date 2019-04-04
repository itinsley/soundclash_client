import React, { Component } from 'react';
import './App.css';
import {Navigation} from './containers/Navigation';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="main-content col-lg-12 col-md-12 col-sm-12 p-0">
            <Navigation />
          </div>
        </div>
      </div>
    );
  }
}

export default App;