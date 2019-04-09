import React, {Component} from "react";
import Track from "../Track/Track";

class Round extends Component{

  render(){

    console.log("Round props", this.props)
    const owner_track = this.props.round.owner_track;
    const opponent_track = this.props.round.opponent_track;
    const currentUser = this.props.currentUser;

    return(
      <div className="container-fluid bg-grey px-0">
        <div className='row p-4'>
          <div className='col-sm-6 text-center p-3' >           
            <Track track = {owner_track}
                  currentUser = {currentUser} />
          </div>
          <div className='col-sm-6 text-center p-3' >           
            <Track track = {opponent_track}
                    currentUser = {currentUser} />
          </div>
        </div>
      </div>
    )
  }
}

export default Round;