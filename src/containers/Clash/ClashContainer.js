import React, {Component, Fragment} from "react";
import ClashApi from "../../api/Clashes";
import UserApi from "../../api/Users";
import ClashHeader from "./components/Clash/ClashHeader";
import UserSession from '../../lib/UserSession/UserSession';
import spinner from "../../assets/spinner.gif";
import CurrentRound from "./components/CurrentRound/CurrentRound";
import RoundsList from "./components/Clash/RoundsList";

class ClashContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      clash: null,
      currentUser: UserSession.get(),
    }
  }

  clashID(){
    return this.props.match.params.clashId;
  }

  async loadClash(){
    const jwt = this.state.currentUser ? this.state.currentUser.jwt:'';
    const clash = await ClashApi.get(this.clashID(), jwt);
    await this.setState({clash:clash});
  }

  componentDidMount(){
    this.loadClash();
  }

  render(){
    if (!this.state.clash){
      return (
        <div className="container-fluid bg-grey text-center">
          <img src={spinner} alt="Logo" />
        </div>
      )
    } else {      
      const clash = this.state.clash;
      return(
        <Fragment>
          <ClashHeader  clash={clash} 
                  currentUser = {this.state.currentUser} />
          <CurrentRound clash ={clash} 
                  currentUser = {this.state.currentUser} />
          <RoundsList rounds={clash.rounds}
                  currentUser = {this.state.currentUser} />
        </Fragment>
      )     
    }
  }
}

export default ClashContainer;