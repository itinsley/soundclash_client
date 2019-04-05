import React, {Component} from "react";

class ClashTile extends Component{
  render(){
    const clash = this.props.clash;

    return(
      <div className="card col-sm-3 p-2 border-0 bg-grey" >
        <div className="card-body bg-white">
          <h5 className="card-title text-truncate">{clash.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {clash.owner} vs. {clash.opponent}
          </h6>
          <div className="card-text">
          <img style={{maxWidth:'100%'}} 
                alt={`Track thumbnail for ${clash.name}`}
                src={clash.thumbnail}></img>
          </div>
          <div className='row'>
            <span className='col-sm-6 text-size-xx-small'>
              <img alt="Comments Icon" src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" 
                width="20"/>
              {` ${clash.comments_count} comments`}
            </span>
            <span className='col-sm-6 text-size-xx-small'>
              <img alt="Tracks Icon" src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg" 
                width="20"/>
                {` ${clash.tracks_count} tracks`}
            </span>
          </div>            
        </div>
      </div>
    )
  }
}

export default ClashTile;