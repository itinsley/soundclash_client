import React, {Component, Fragment} from "react";
import ClashApi from "../../api/Clashes";
import Clash from "./components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';
import spinner from "../../assets/spinner.gif";

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
        <Clash clash={clash} currentUser={this.state.currentUser} />
      )     
    }
  }
}

export default ClashContainer;