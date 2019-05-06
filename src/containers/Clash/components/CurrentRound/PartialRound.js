import React from "react";
import Track from "../Track/Track";

const PartialRound=(props)=>{
  const previousTrack = props.previousTrack;
  const currentUser = props.currentUser;
  const waitingFor = props.waitingFor;

  return(
    <div className="container-fluid bg-grey px-0">
      <div className='row p-4'>
        <div className='col-sm-6 text-center p-3' >
          <Track track = {previousTrack}
                currentUser = {currentUser} />
        </div>
        <div className='t-clash-status col-sm-6 text-center p-3' >
          we are waiting for {waitingFor.name}
        </div>
      </div>
    </div>
  )
}

export default PartialRound;