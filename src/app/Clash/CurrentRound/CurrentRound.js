import React, {Component} from "react";
import ClashWorkflow from "../../../lib/ClashWorkflow";
import ReadyToAccept from "./ReadyToAccept";
import AwaitingPlayer from "./AwaitingPlayer";
import PartialRound from "./PartialRound";
import UploadContainer from "./UploadContainer";
import UserSession from "../../../lib/UserSession/UserSession";


/*
CurrentRound deals with the Clash object
Presents UI for adding new Tracks which move to the rounds array when completed
*/
class CurrentRound extends Component{

  workflowComponentFactory(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;
    const state = ClashWorkflow.state(clash, currentUser);

    const props = {clash, currentUser}

    console.log(state)
    switch (state) {
      case ClashWorkflow.STATES.ReadyToAccept:
        return <ReadyToAccept {...props} />;
      case ClashWorkflow.STATES.Upload:
        return <UploadContainer {...props} />;
      case ClashWorkflow.STATES.DisplayInfo:
        return <PartialRound previousTrack={clash.previous_track}
                             waitingForDescription={clash.waiting_for_description}/>;
      default:
        return <AwaitingPlayer {...props} />;
    }
  }

  render(){
    return (
      this.workflowComponentFactory()
    )
  }
}

export default CurrentRound;