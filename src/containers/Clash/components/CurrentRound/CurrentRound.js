import React, {Component} from "react";
import ClashWorkflow from "../../../../lib/ClashWorkflow";
import ReadyToAccept from "./ReadyToAccept";
import AwaitingPlayer from "./AwaitingPlayer";

/*
CurrentRound deals with the Clash object
Presents UI for adding new Tracks which move to the rounds array when completed
*/
class CurrentRound extends Component{

  workflowComponentFactory(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;
    const state = ClashWorkflow.state(clash, currentUser);
    console.log(state)
    if (state===ClashWorkflow.STATES.ReadyToAccept){
      return ReadyToAccept(clash, currentUser)
    } else {
      return AwaitingPlayer(clash, currentUser)
    }

    return null;
  }
  
  render(){
    return (
      this.workflowComponentFactory()
    )
  }
}

export default CurrentRound;