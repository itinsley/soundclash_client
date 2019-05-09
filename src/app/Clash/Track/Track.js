import React, {Component, Fragment} from "react";
import youtube from "../../../lib/youtube";
import CommentContainer from "../Comments/CommentContainer";

class Track extends Component{
  render(){
    const track = this.props.track;
    const currentUser = this.props.currentUser;
    const youtubeUrl = youtube.embedUrl(track.url);

    return(
      <Fragment>
        {youtube.iframe(youtubeUrl, track.name)}
        <CommentContainer track={track} currentUser={currentUser}/>
      </Fragment>
    )
  }
}

export default Track;