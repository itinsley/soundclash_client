import React, {Component} from "react";
import Track from "../Track/Track";
import ClashWorkflow from "../../lib/ClashWorkflow";


function ReadyToAccept(clash, currentUser){
  const owner_track = clash.owner_track;

  return (
    <div className='col-sm-12 text-center p-3' >
      <div className="container-fluid bg-grey px-0">
        <div className='row p-4'>
          <div className='col-sm-6 text-center p-3' >           
            <Track track = {owner_track}
                  currentUser = {currentUser} />
          </div>
          <div className='col-sm-6 text-center p-3' >           
            <h2 className='text-truncate p-4 clash-item__header' >Waiting for you</h2>
            <div>You have been challenged to a soundclash by {clash.owner.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AwaitingPlayer(clash, currentUser){
  if(clash.current_user_is_involved){
    return (
      <div className='col-sm-12 text-center p-3' >
        hello {currentUser.name} we are waiting for {clash.waiting_for.name}
      </div>
    )  
  }
  return null;
}

/*
CurrentRound deals with the Clash object
Presents UI for adding new Tracks which move to the rounds array when completed
*/
class CurrentRound extends Component{

  workflowComponentFactory(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;
    const state = ClashWorkflow.state(clash, currentUser);
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