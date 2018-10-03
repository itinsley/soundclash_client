import React from 'react';
import './App.css';
import { Home, Container, Nav, About } from './components';

import {
  Route,
  Switch
} from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Nav/>
        </div>
        <p className="App-intro">
          <Container/>
        </p>
      </div>
    );
  }
}

export default App;
