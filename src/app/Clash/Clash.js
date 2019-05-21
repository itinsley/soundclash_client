import React, {Component, Fragment} from "react";
import ClashHeader from "./ClashHeader";
import CurrentRoundContainer from "./CurrentRound/CurrentRoundContainer"; //Move this to /clash/components folder
import RoundsList from "./RoundsList";
import spinner from "../../assets/spinner.gif"

class Clash extends Component {
  constructor(props){
    super(props);
    this.props.clash.loading=true;
    this.props.loadClash(this.clashID());
  }

  clashID(){
    return this.props.match.params.clashId;
  }

  render(){
    const clash = this.props.clash.data;
    const loading = this.props.clash.loading;

    if (loading){
      return (
        <div className="container-fluid bg-grey text-center">
          <img src={spinner} alt="waiting.." />
        </div>
      )
    } else {
      return(
        <Fragment>
          <ClashHeader  clash={clash}/>
          <CurrentRoundContainer />
          <RoundsList rounds={clash.rounds} />
        </Fragment>
      )
    }
  }
}

export default Clash;