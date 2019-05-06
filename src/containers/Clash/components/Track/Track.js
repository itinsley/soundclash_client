import React, {Component, Fragment} from "react";
import youtube from "../../../../lib/youtube";
import ConnectedComments from "../Comments/ConnectedComments";

class Track extends Component{
  render(){
    const track = this.props.track;
    const currentUser = this.props.currentUser;
    const youtubeUrl = youtube.embedUrl(track.url);

    const Comments = ConnectedComments();

    return(
      <Fragment>
        {youtube.iframe(youtubeUrl, track.name)}
        <Comments track={track} currentUser={currentUser}/>
      </Fragment>
    )
  }
}

export default Track;