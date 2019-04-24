import React, {Component, Fragment} from "react";
import Navigation from  './components/Navigation'
import { Provider, connect } from 'react-redux';
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
    const store = this.props.store;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default NavigationContainer;