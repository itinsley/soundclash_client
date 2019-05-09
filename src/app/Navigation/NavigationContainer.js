import React, {Component} from "react";
import Navigation from  './Navigation'
import { connect } from 'react-redux';
import logoutAction from "../../actions/logoutAction";

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    isLoginModalOpen: state.isLoginModalOpen
  }
}

function mapDispatchToProps(dispatch){
  return {
    logOut: ()=>{
      dispatch(logoutAction)
    },
    onOpenLoginModal:()=>{
      dispatch({
        type: 'OPEN_LOGIN_FORM'
      })
    }
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