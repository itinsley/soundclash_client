import React, {Component, Fragment} from "react";
import ClashHeader from "./ClashHeader";
import CurrentRoundContainer from "./CurrentRound/CurrentRoundContainer"; //Move this to /clash/components folder
import RoundsList from "./RoundsList";
import spinner from "../../assets/spinner.gif"
import ConnectStore from '../../lib/ConnectStore';
import {fetchClashAction} from "../../actions";

class Clash extends Component {
  constructor(props){
    super(props);
    const clashId = this.props.match.params.clashId;
    this.props.dispatch(fetchClashAction(clashId));
  }

  render(){
    const clash = this.props.currentClash.data;
    const loading = this.props.currentClash.loading;

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

export default ConnectStore(Clash);