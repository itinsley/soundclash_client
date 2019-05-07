import React, {Component} from "react";
import Navigation from  './components/Navigation'
import { connect } from 'react-redux';
import logoutAction from "../../actions/logoutAction";

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    logOut: ()=>{
      dispatch(logoutAction)
    },
  }
}

// Connected Component
const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

class NavigationContainer extends Component {
  render() {
    return (
      <ConnectedNavigation />
    );
  }
}

export default NavigationContainer;