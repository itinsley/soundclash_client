import React from "react";
import Track from "../Track/Track";
import ConnectStore from "../../../lib/ConnectStore";

function Round({ round }) {
  const rowClassNames = `row px-4 t-row-detail-${round.index}`;
  return (
    <div className="container-fluid bg-grey px-0">
      <div className={rowClassNames}>
        <div className="t-track-owner col-sm-6 text-center p-3">
          <Track track={round.owner_track} />
        </div>
        <div className="col-sm-6 text-center p-3">
          <Track track={round.opponent_track} />
        </div>
      </div>
    </div>
  );
}

export default ConnectStore(Round);
