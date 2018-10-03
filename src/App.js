import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


const Home = () => (<div><h1>Welcome home</h1><a href='/about'>Go to about</a></div>)
const About = () => (<div><h1>About</h1><a href='/'>Go home</a></div>)

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App;
