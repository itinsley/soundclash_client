import {Component} from "react";
import ClashWorkflow from "../../../../lib/ClashWorkflow";
import ReadyToAccept from "./ReadyToAccept";
import AwaitingPlayer from "./AwaitingPlayer";
// import Upload from "./Upload";

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
    switch (state) {
      case ClashWorkflow.STATES.ReadyToAccept:
        return ReadyToAccept(clash, currentUser);
      case ClashWorkflow.STATES.Upload:
        // return Upload(clash, currentUser);
      default:
        return AwaitingPlayer(clash, currentUser);
    }
  }

  render(){
    return (
      this.workflowComponentFactory()
    )
  }
}

export default CurrentRound;