import React, {Component} from "react";
import Round from "./Round";

class RoundExpanded extends Component {
  render(){
    return (
      <Round round={this.props.round} 
             currentUser={this.props.currentUser}/>
    )
  }
}

export default RoundExpanded;