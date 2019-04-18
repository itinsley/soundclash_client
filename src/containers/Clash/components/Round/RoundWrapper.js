import React, {Component} from "react";
import RoundCompressed from "./RoundCompressed";
import RoundExpanded from "./RoundExpanded";

class RoundWrapper extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: props.isOpen
    }
    this.Handle_Click = this.Handle_Click.bind(this);
  }

  Handle_Click(event){
    this.setState({isOpen:true})
    event.preventDefault();
  }

  render(){
    const round =this.props.round;
    if (this.state.isOpen){
      return (
        <RoundExpanded 
          round={round}  
          currentUser = {this.props.currentUser} 
        />
      )
    } else {
      return (
        <RoundCompressed 
          round={round} 
          Handle_Click={this.Handle_Click}/>
      )
    }
  }
}

export default RoundWrapper;