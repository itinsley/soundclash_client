import React, {Component} from "react";

class Round extends Component{

  render(){
    const round =this.props.round;
    return(
      <a className="py-3 round-thumb u-overlay-hover" >
        <strong >
          <span className="text-uppercase" >Round {round.index}</span>
          <img className="mx-2" 
              alt="Tracks icon" 
              src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" width="20" />
          {round.comments_count}
        </strong>
        <h3 style={{fontSize:'150%', fontWeight:'300'}}>
          {round.owner_track.name}
        </h3>
        <h3 style={{fontSize:'150%', fontWeight:'300'}}>
        {round.opponent_track.name}
        </h3>
      </a>
    )
  }
}

export default Round;