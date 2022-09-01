import React from "react";
import Track from "../Track/Track";

const PartialRound = (props) => {
  const ownerTrack = props.ownerTrack;
  const waitingForDescription = props.waitingForDescription;

  return (
    <div className="t-current-round container-fluid bg-grey px-0">
      <div className="row p-4 container-gutters">
        <div className="t-clash-status col-sm-6 order-1 order-sm-2 text-center p-3">
          <h2 className="text-truncate p-4 clash-item__header">Waiting...</h2>
          {waitingForDescription}
        </div>
          <PreviousTrack {...{ownerTrack}} />
      </div>
    </div>
  );
};

const PreviousTrack=({ownerTrack})=>{
  // We only need to show this track if it is the owner's track. If the last track was the opponents 
  // it will show in the history as a completed round
  if (!ownerTrack) return null

  return(
    <div className="col-sm-6 order-2 order-sm-1 text-center p-3">
      <Track track={ownerTrack}/>
    </div>
  ) 
}

export default PartialRound;
