import React, {Component, Fragment} from "react";
import ClashApi from "../../api/Clashes";
import UserApi from "../../api/Users";
import Clash from "../../components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';
import spinner from "../../assets/spinner.gif";
import Track from "../../components/Track/Track";
import Round from "../../components/Round";

class RoundsList extends Component {
  render(){
    return this.props.rounds.map(round=>{
      return (<Round key={round.id} round={round} />)
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
      return  <img src={spinner} alt="Logo" />;
    } else {
      console.log(this.state.clash)
      return(
        <Fragment>
          <Clash  clash={this.state.clash} 
                  currentUser = {this.state.currentUser} />
          <div className="container-fluid bg-grey px-0">
            <div className='row p-4'>
              <div className='col-sm-6 text-center p-3' >           
                <Track track = {this.state.clash.rounds[0].owner_track}
                          currentUser = {this.state.currentUser} />
              </div>
              <div className='col-sm-6 text-center p-3' >           
                <Track track = {this.state.clash.rounds[0].opponent_track}
                        currentUser = {this.state.currentUser} />
              </div>
            </div>
          </div>
          <div className='row' >
            <div className='col-sm-12 text-center' >
              <RoundsList rounds={this.state.clash.rounds}/>
            </div>
          </div>
        </Fragment>
      )     
    }
  }
}

export default ClashContainer;