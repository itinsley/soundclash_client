import React, { Component} from 'react';
import '../../App.css';
import Home from './components/Home';
import { Provider, connect } from 'react-redux';
import {fetchMyClashesAction, fetchRecentClashesAction} from '../../actions';

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
    const store = this.props.store;
    return(
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default HomeContainer;