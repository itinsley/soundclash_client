import React, {Component} from "react";
import ClashApi from "../../api/Clashes";
import Clash from "./components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';
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
    loadClash: (clashId, currentUser)=>{
      fetchClashAction(dispatch, clashId, currentUser)
    }
  }
}

class ClashContainer extends Component{
  constructor(props){
    super(props);
  }

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