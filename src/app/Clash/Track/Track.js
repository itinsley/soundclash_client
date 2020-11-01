import React, { Component, Fragment } from "react";
import youtube from "../../../lib/youtube";
import CommentContainer from "../Comments/CommentContainer";

class Track extends Component {
  render() {
    const track = this.props.track;
    const youtubeUrl = youtube.embedUrl(track.youtube_url);

    return (
      <Fragment>
        {youtube.iframe(youtubeUrl, track.name)}
        <CommentContainer track={track} />
      </Fragment>
    );
  }
}

export default Track;
