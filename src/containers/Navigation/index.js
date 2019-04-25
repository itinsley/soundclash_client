import React, {Component, Fragment} from "react";
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
const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

class NavigationContainer extends Component {
  render() {
    return (
      <App />
    );
  }
}

export default NavigationContainer;