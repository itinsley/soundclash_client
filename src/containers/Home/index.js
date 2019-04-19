import React, { Component, Fragment } from 'react';
import '../../App.css';
import Home from './components/Home';
import ClashApi from "../../api/Clashes";
import {createStore} from 'redux';
import { Provider, connect } from 'react-redux';
import clashReducer from './reducers/clashReducer';


// Store
const store = createStore(clashReducer);

// Connected Component
const App = connect(
  mapStateToProps,
  {},
)(Home)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    recentClashes: state.recentClashes
  }
}

async function fetchAndDispatchRecentClashes(){
  const recentClashes = await ClashApi.recent();
  store.dispatch({
    type: 'GET_RECENT_CLASHES',
    recentClashes
  })
}

class HomeContainer extends Component {
  constructor(props){
    super(props)
    fetchAndDispatchRecentClashes();
  }
  render(){
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default HomeContainer;