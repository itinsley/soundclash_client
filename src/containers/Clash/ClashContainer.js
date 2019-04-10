import React, {Component, Fragment} from "react";
import ClashApi from "../../api/Clashes";
import UserApi from "../../api/Users";
import Clash from "../../components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';
import spinner from "../../assets/spinner.gif";
import Round from "../../components/Round/Round"
import RoundWrapper from "../../components/Round/RoundWrapper";

class RoundsList extends Component {
  render(){
    return this.props.rounds.map(round=>{
      return (
        <div className='row' >
          <div className='col-sm-12 text-center' >
            <RoundWrapper 
              key={round.id} round={round} 
              currentUser = {this.props.currentUser}
              />
          </div>
        </div>
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
      owner: UserApi.emptyStruct(),
      opponent: UserApi.emptyStruct(),
    }
  }

  clashID(){
    return this.props.match.params.clashId;
  }

  async loadClash(){
    const clash = await ClashApi.get(this.clashID());
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
      const firstRound = clash.rounds[0];
      return(
        <Fragment>
          <Clash  clash={ this.state.clash} 
                  currentUser = {this.state.currentUser} />
          <Round round = {firstRound}
                  currentUser = {this.state.currentUser} />
          <RoundsList rounds={this.state.clash.rounds}
                  currentUser = {this.state.currentUser} />
        </Fragment>
      )     
    }
  }
}

export default ClashContainer;