import React from "react";
import Track from "../Track/Track";

const PartialRound = (props) => {
  const previousTrack = props.previousTrack;
  const waitingForDescription = props.waitingForDescription;

  return (
    <div className="container-fluid bg-grey px-0">
      <div className="row p-4 container-gutters">
        <div className="col-sm-6 text-center p-3">
          <Track track={previousTrack} />
        </div>
        <div className="t-clash-status col-sm-6 text-center p-3">
          <h2 className="text-truncate p-4 clash-item__header">Waiting...</h2>
          {waitingForDescription}
        </div>
      </div>
    </div>
  );
};

export default PartialRound;
