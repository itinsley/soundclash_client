import React, {Component} from "react";
import Avatar from "../Avatar";

class Clash extends Component{
  render(){
    const clash = this.props.clash;

    return(
      <main className="container-fluid main-content mt-5 px-0">

      <div className="container mx-auto text-center " style={{maxWidth: '56.25rem'}}>
        <h1 className="px-2 p-3">{clash.name}</h1>
        <h6 className="card-subtitle mb-2 text-muted">
          <div className='text-center pb-3'>
            <span className='text-size-xx-small p-2'>
              <Avatar user={clash.owner} description= "Comment user avatar" size='35' />
              <strong>{clash.owner.name}</strong>
            </span>
            <span>vs.</span>
            <span className='text-size-xx-small p-2'>
              <strong>{clash.opponent.name}</strong>
              <Avatar user={clash.opponent} description= "Comment user avatar" size='35' />
            </span>
          </div>    
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

    </main>
    )
  }
}

export default Clash;