import React, { Component} from 'react';
import '../../App.css';
import Home from './Home';
import { connect } from 'react-redux';
import {fetchMyClashesAction, fetchRecentClashesAction} from '../../actions';
import { withAuth0 } from '@auth0/auth0-react';

// Connected Component
const ConnectedHome = connect(
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
      <ConnectedHome />
    )
  }
}

export default withAuth0(HomeContainer);