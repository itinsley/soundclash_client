import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { About, Home, NotFound } from '../';

class Container extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default Container;