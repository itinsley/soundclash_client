import React, {Component, Fragment} from "react";
import ClashHeader from "./ClashHeader";
import CurrentRound from "../CurrentRound/CurrentRound"; //Move this to /clash/components folder
import RoundsList from "./RoundsList";

class Clash extends Component {

  render(){
    const clash = this.props.clash;
    const currentUser = this.props.currentUser;

    return(
      <Fragment>
        <ClashHeader  clash={clash} 
                currentUser = {currentUser} />
        <CurrentRound clash ={clash} 
                currentUser = {currentUser} />
        <RoundsList rounds={clash.rounds}
                currentUser = {currentUser} />
      </Fragment>
    )

  }
}

export default Clash;