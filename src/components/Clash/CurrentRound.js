import React, {Component} from "react";


function ChallengeSent(clash){
  return (
    <div className='col-sm-12 text-center p-3' >
      {clash.waiting_for_description}
    </div>
  )
}

/*
CurrentRound deals with the Clash object
Presents UI for adding new Tracks which move to the rounds array when completed

# Workflow
State              Description
challenge_sent     Created, awaiting response from challengee
                    - Only CurrentUser can view this clash so "awaiting opponent"
awaiting_owner     Waiting for owner to upload a track
                    - CurrentUser sees Form to upload
                    - Opponent sees Message
awaiting_opponent  Waiting for opponent to upload a track
                    - Opponent sees Form to upload
                    - CurrentUser sees Message
*/
class CurrentRound extends Component{

  workflowComponentFactory(){
    const clash = this.props.clash;
    if (clash.state='challenge_sent'){
      return (
        ChallengeSent(clash)
      )
    } 
  }
  
  render(){
    return (
      this.workflowComponentFactory()
    )
  }
}

export default CurrentRound;