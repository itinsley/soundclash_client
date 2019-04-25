import React, { Component} from 'react';
import '../../App.css';
import Home from './components/Home';
import { connect } from 'react-redux';
import {fetchMyClashesAction, fetchRecentClashesAction, syncUserSession} from '../../actions';

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
      dispatch(syncUserSession)
    }
  }
}

class HomeContainer extends Component {
  render(){
    return(
      <App />
    )
  }
}

export default HomeContainer;