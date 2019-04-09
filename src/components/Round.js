import React, {Component} from "react";

class Compressed extends Component {
  constructor(props){
    super(props);
    this.Handle_Click = props.Handle_Click;
  }

  render(){
    const round = this.props.round;
    return (
      <a className="py-3 round-thumb u-overlay-hover" onClick={this.Handle_Click} >
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

class Round extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
    this.Handle_Click = this.Handle_Click.bind(this);
  }

  Handle_Click(){
    this.setState({isOpen:true})
  }

  render(){
    const round =this.props.round;
    if (this.state.isOpen){
      return (<div>OPEN</div>)
    } else {
      return (
        <Compressed 
          round={round} 
          Handle_Click={this.Handle_Click}/>
      )
    }
  }
}

export default Round;