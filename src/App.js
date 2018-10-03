import React from 'react';
import './App.css';
import { Container, Nav } from './components';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Nav/>
        </div>
        <div className="App-intro">
          <Container/>
        </div>
      </div>
    );
  }
}

export default App;
