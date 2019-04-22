import React, { Component, Fragment } from 'react';
import '../../App.css';
import Home from './components/Home';
import ClashApi from "../../api/Clashes";
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import clashReducer from './reducers/clashReducer';
import thunk from 'redux-thunk';
import {fetchMyClashesAction, fetchRecentClashesAction} from './actions';

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
      dispatch(fetchMyClashesAction)
      dispatch(fetchRecentClashesAction)
    }
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