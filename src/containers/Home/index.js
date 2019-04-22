import React, { Component, Fragment } from 'react';
import '../../App.css';
import Home from './components/Home';
import ClashApi from "../../api/Clashes";
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import clashReducer from './reducers/clashReducer';
import thunk from 'redux-thunk';

// Store
const store = createStore(clashReducer, applyMiddleware(thunk));

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    recentClashes: state.recentClashes,
    currentUser: state.currentUser,
    myClashes: state.myClashes
  }
}

function mapDispatchToProps(dispatch){
  return {
    onLoad: ()=>{
      dispatch(fetchAndDispatchRecentClashes)
      dispatch(fetchAndDispatchMyClashes)
    }
  }
}

async function fetchAndDispatchRecentClashes(dispatch){
  const recentClashes = await ClashApi.recent();
  dispatch({
    type: 'GET_RECENT_CLASHES',
    recentClashes
  })
}

function currentUserJwt(state){
  const currentUser = state.currentUser;
  return currentUser?currentUser.jwt:null
}

async function fetchAndDispatchMyClashes(dispatch, getState){
  const state = getState()
  const jwt = currentUserJwt(state);
  if (jwt){
    const myClashes = await ClashApi.forUser(jwt)
    dispatch({
      type: 'GET_MY_CLASHES',
      myClashes
    })
  }
}

class HomeContainer extends Component {
  constructor(props){
    super(props)
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