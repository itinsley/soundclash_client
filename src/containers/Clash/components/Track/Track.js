import React, {Component, Fragment} from "react";
import Youtube from "../../../../lib/YouTube";
import YoutubeIframe from "../../../../lib/YoutubeIframe";
import ConnectedComments from "../Comments/ConnectedComments";

class Track extends Component{
  render(){
    const track = this.props.track;
    const currentUser = this.props.currentUser;
    const youtubeUrl = Youtube.EmbedUrl(track.url);

    const Comments = ConnectedComments();

    return(
      <Fragment>
        {YoutubeIframe(youtubeUrl, track.name)}
        <Comments track={track} currentUser={currentUser}/>
      </Fragment>
    )
  }
}

export default Track;