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
    recentClashes: state.recentClashes,
    currentUser: state.currentUser,
    myClashes: state.myClashes
  }
}

async function fetchAndDispatchRecentClashes(){
  const recentClashes = await ClashApi.recent();
  store.dispatch({
    type: 'GET_RECENT_CLASHES',
    recentClashes
  })
}

function currentUserJwt(){
  const currentUser = store.getState().currentUser;
  return currentUser?currentUser.jwt:null
}

async function fetchAndDispatchMyClashes(){
  const jwt = currentUserJwt();
  if (jwt){
    const myClashes = await ClashApi.forUser(currentUserJwt())
    store.dispatch({
      type: 'GET_MY_CLASHES',
      myClashes
    })
  }
}

class HomeContainer extends Component {
  constructor(props){
    super(props)
    fetchAndDispatchRecentClashes();
    fetchAndDispatchMyClashes();
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