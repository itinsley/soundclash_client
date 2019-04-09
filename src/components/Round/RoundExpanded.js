import React, {Component} from "react";

class RoundExpanded extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const round = this.props.round;
    return (
      <div>{round.owner_track.name} vs {round.opponent_track.name}</div>
    )
  }
}

export default RoundExpanded;