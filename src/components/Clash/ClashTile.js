import React, {Component} from "react";
import { Link } from "react-router-dom";

class ClashTile extends Component{

  opponentName(clash){
    if (clash.opponent){
      return clash.opponent.name
    } else {
      return(clash.opponent_name)
    }
  }

  render(){
    const clash = this.props.clash;

    return(
      <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 border-0 bg-transparent my-3">
        <Link to={`/clashes/${clash.id}`} >
          <div className="card-body bg-white"  >
            <h3 className="card-title text-truncate">{clash.name}</h3>
            <h4 className="card-subtitle mb-2 text-muted text-truncate">
              {clash.owner.name} vs. {this.opponentName(clash)}
            </h4>
            <div className="card-text" >
            <img style={{width:'100%'}} 
                  alt={`Track thumbnail for ${clash.name}`}
                  src={clash.thumbnail}></img>
            </div>
            <div className='row'>
              <span className='col-xs-12 col-sm-6 text-size-xx-small'>
                <img alt="Comments Icon" src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" 
                  width="20"/>
                {` ${clash.comments_count} comments`}
              </span>
              <span className='col-xs-12 col-sm-6 text-size-xx-small'>
                <img alt="Tracks Icon" src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg" 
                  width="20"/>
                  {` ${clash.tracks_count} tracks`}
              </span>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default ClashTile;