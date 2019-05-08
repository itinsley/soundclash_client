import React, {Component} from "react";
import Clash from "./components/Clash/Clash";
import { connect } from 'react-redux';
import {fetchClashAction} from "../../actions";

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    clash: state.currentClash,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadClash: (clashId)=>{
      dispatch(fetchClashAction(clashId));
    }
  }
}

class ClashContainer extends Component{
  render(){

    const ConnectedClash = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Clash)

    return(
      <ConnectedClash {... this.props}/>
    )
  }
}

export default ClashContainer;