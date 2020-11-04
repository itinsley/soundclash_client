import React, { Component } from "react";
import ClashWorkflow from "../../../lib/ClashWorkflow";
import ReadyToAccept from "./ReadyToAccept";
import AwaitingPlayer from "./AwaitingPlayer";
import PartialRound from "./PartialRound";
import UploadContainer from "./UploadContainer";
import ConnectStore from "../../../lib/ConnectStore";

/*
CurrentRound deals with the Clash object
Presents UI for adding new Tracks which move to the rounds array when completed
*/
class CurrentRound extends Component {
  workflowComponentFactory() {
    const currentUser = this.props.currentUser;
    const clash = this.props.currentClash.data;
    const state = ClashWorkflow.state(clash, currentUser);

    const props = { clash };
    const previousTrack = clash.tracks[clash.tracks.length - 1];

    console.log(state);
    switch (state) {
      case ClashWorkflow.STATES.ReadyToAccept:
        return <ReadyToAccept {...props} />;
      case ClashWorkflow.STATES.Upload:
        return <UploadContainer {...props} />;
      case ClashWorkflow.STATES.DisplayInfo:
        return (
          <PartialRound
            previousTrack={previousTrack}
            waitingForDescription={clash.waiting_for_description}
          />
        );
      default:
        return <AwaitingPlayer {...props} />;
    }
  }

  render() {
    return this.workflowComponentFactory();
  }
}

export default ConnectStore(CurrentRound);
