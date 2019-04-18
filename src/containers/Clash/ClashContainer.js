import React, {Component, Fragment} from "react";
import ClashApi from "../../api/Clashes";
import UserApi from "../../api/Users";
import ClashHeader from "./components/Clash/ClashHeader";
import UserSession from '../../lib/UserSession/UserSession';
import spinner from "../../assets/spinner.gif";
import RoundWrapper from "./components/Round/RoundWrapper";
import CurrentRound from "./components/CurrentRound/CurrentRound";

class RoundsList extends Component {
  render(){
    return this.props.rounds.map((round, idx)=>{
      return (
        <Fragment
          key={round.id}  >
          <div className='row' >
            <div className='col-sm-12 text-center' >
              <RoundWrapper 
                isOpen={idx===0}
                round={round}
                currentUser = {this.props.currentUser}
                />
            </div>
          </div>
        </Fragment>
      )
    })
  }
}

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