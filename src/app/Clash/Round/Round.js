import React, { Component } from "react";
import Track from "../Track/Track";

class Round extends Component {
  render() {
    const owner_track = this.props.round.owner_track;
    const opponent_track = this.props.round.opponent_track;

    return (
      <div className="container-fluid bg-grey px-0">
        <div className="row px-4">
          <div className="t-track-owner col-sm-6 text-center p-3">
            <Track track={owner_track} />
          </div>
          <div className="col-sm-6 text-center p-3">
            <Track track={opponent_track} />
          </div>
        </div>
      </div>
    );
  }
}

export default Round;
