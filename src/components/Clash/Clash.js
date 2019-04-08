import React, {Component, Fragment} from "react";
import Youtube from "../../lib/YouTube";
import spinner from "../../assets/spinner.gif";

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

class Clash extends Component{
  render(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;

    const owner_youtube_url = Youtube.EmbedUrl(clash.rounds[0].owner_track.url);
    const owner_track_name = clash.rounds[0].owner_track.name;
    const opponent_youtube_url = Youtube.EmbedUrl(clash.rounds[0].opponent_track.url);
    const opponent_track_name = clash.rounds[0].opponent_track.name;
    
    return(
      <main className="container-fluid main-content mt-5 px-0">

      <div className="container mx-auto text-center " style={{maxWidth: '56.25rem'}}>
        <h1 className="px-2 p-3">{clash.name}</h1>
        <h6 className="card-subtitle mb-2 text-muted">
          <strong>{clash.owner}</strong> vs. <strong>{clash.opponent}</strong>
        </h6>
        <div className='text-center pb-3'>
          <span className='text-size-xx-small p-2'>
            <img alt="Comments Icon" src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" 
              width="20"/>
            {` ${clash.comments_count} comments`}
          </span>
          <span className='text-size-xx-small p-2'>
            <img alt="Tracks Icon" src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg" 
              width="20"/>
              {` ${clash.tracks_count} tracks`}
          </span>
        </div>
      </div>

      <div className="container-fluid bg-grey px-0">
        <div className='row p-4'>
          <div className='col-sm-6 text-center p-3' > 
            {YoutubeIframe(owner_youtube_url, owner_track_name)}
            <div className="container">
              <div className="row p-2">
                <span className="">
                  <img  alt="Picture?type=large" className="u-circle " height="60" 
                        src={currentUser.imageUrl} title={clash.owner} width="60"></img>
                </span>
                <span className="">Comments</span>
              </div>
            </div>
          </div>
          <div className='col-sm-6 text-center p-3' > 
            {YoutubeIframe(opponent_youtube_url, opponent_track_name)}
          </div>
        </div>
      </div>
    </main>
    )
  }
}

export default Clash;