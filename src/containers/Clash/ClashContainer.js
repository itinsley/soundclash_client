import React, {Component} from "react";
import ClashApi from "../../api/Clashes";
import UserApi from "../../api/Users";
import Clash from "../../components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';

class ClashContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      clash: ClashApi.emptyStruct(),
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
    // const [owner, opponent] = await Promise.all([UserApi.get(clash.owner.id), UserApi.get(clash.opponent.id)]);
    this.setState({clash});
    console.log(clash)
  }

  componentDidMount(){
    this.loadClash();
  }

  render(){
    return (
      <Clash clash={this.state.clash} 
             currentUser = {this.state.currentUser}/>
    )
  }
}

export default ClashContainer;