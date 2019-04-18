import React, {Component, Fragment} from "react";
import Youtube from "../../../../lib/YouTube";
import spinner from "../../../../assets/spinner.gif";
import Comments from "../Comments/Comments";

const YoutubeIframe=(url, track_name)=>{
  if (!url || (!/.*youtube.*/.test(url))){
   return  <img src={spinner} alt="Logo" />;
  }

  return(
    <Fragment>
      <h2 className='text-truncate p-4 clash-item__header' >{track_name}</h2>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" 
                title={track_name}
                src = {url}
                >
        </iframe>
      </div>
    </Fragment>
  )
}

class Track extends Component{

  render(){
    const track = this.props.track;
    const currentUser = this.props.currentUser;
    const youtubeUrl = Youtube.EmbedUrl(track.url);

    return (
      <Fragment>
        {YoutubeIframe(youtubeUrl, track.name)}
        <Comments comments={track.comments} 
                  currentUser={currentUser}
                  trackId={track.id}
                  />
      </Fragment>
    ) 
  }
}

export default Track;