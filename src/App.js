import React from 'react';
import './App.css';
import { Nav, About, Home, Login, Clash, Track, NotFound  } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <Router basename='/client'>
        <div className="App">
          <Nav />

          <div className="App-intro">
            <div id = "routes">
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/login' component={Login}/>
                <Route path="/clashes/:id" component={Clash}/>
                <Route path="/tracks/:id" component={Track}/>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;


