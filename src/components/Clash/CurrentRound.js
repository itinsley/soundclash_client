import React, {Component} from "react";


function ChallengeSent(clash){
  return (
    <div className='col-sm-12 text-center p-3' >
      {clash.waiting_for_description}
      <div>{clash.state}</div>
    </div>
  )
}

function AwaitingPlayer(clash, currentUser){
  if(clash.current_user_is_involved){
    return (
      <div className='col-sm-12 text-center p-3' >
        hello {currentUser.name} we are waiting for {clash.waiting_for}
      </div>
    )  
  }
  return null;
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
    const currentUser = this.props.currentUser;
    console.log("State", clash.state)
    if (clash.state==='challenge_sent'){
      return ChallengeSent(clash)
    } else if (clash.state==='awaiting_owner' || clash.state==='awaiting_opponent'){
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