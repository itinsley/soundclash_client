import React, {Component} from "react";
import Round from "../Round/Round";

// CurrentRound deals with the Clash object
// Presents UI for adding new Tracks which move to the rounds array when completed
class CurrentRound extends Component{
  
  render(){
    // No rounds for unaccepted clashes
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;

    if (clash.rounds.length>0){
      return (<Round round = {clash.rounds[0]}
                                currentUser = {currentUser} />)
    } else {
      return (<div className="text-center">{clash.waiting_for_description}</div>)
    }
  }
}

export default CurrentRound;