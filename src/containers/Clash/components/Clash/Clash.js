import React, {Component, Fragment} from "react";
import ClashHeader from "./ClashHeader";
import CurrentRound from "../CurrentRound/CurrentRound"; //Move this to /clash/components folder
import RoundsList from "./RoundsList";
import spinner from "../../../../assets/spinner.gif"

class Clash extends Component {
  constructor(props){
    super(props);
    this.props.loadClash(this.clashID(), this.props.currentUser);
  }

  clashID(){
    return this.props.match.params.clashId;
  }

  render(){
    const clash = this.props.clash.data;
    const currentUser = this.props.currentUser;
    const loading = this.props.clash.loading;

    if (loading){
      return (
        <div className="container-fluid bg-grey text-center">
          <img src={spinner} alt="Logo" />
        </div>
      )
    } else {
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
}

export default Clash;