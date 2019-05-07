import React, {Component, Fragment} from "react";
import youtube from "../../../../lib/youtube";
import connectedComments from "../Comments/connectedComments";

class Track extends Component{
  render(){
    const track = this.props.track;
    const currentUser = this.props.currentUser;
    const youtubeUrl = youtube.embedUrl(track.url);

    const ConnectedComments = connectedComments();

    return(
      <Fragment>
        {youtube.iframe(youtubeUrl, track.name)}
        <ConnectedComments track={track} currentUser={currentUser}/>
      </Fragment>
    )
  }
}

export default Track;