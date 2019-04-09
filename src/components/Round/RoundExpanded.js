import React, {Component} from "react";
import Round from "./Round";

class RoundExpanded extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Round round={this.props.round} 
             currentUser={this.props.currentUser}/>
    )
  }
}

export default RoundExpanded;