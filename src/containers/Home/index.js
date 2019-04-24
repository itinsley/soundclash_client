import React, { Component} from 'react';
import '../../App.css';
import Home from './components/Home';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import reducer from '../../reducer'
import thunk from 'redux-thunk';
import {fetchMyClashesAction, fetchRecentClashesAction} from '../../actions';

// Store
const store = createStore(reducer, applyMiddleware(thunk));

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
  render(){
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default HomeContainer;