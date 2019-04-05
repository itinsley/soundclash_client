import React, {Component} from "react";
import ClashApi from "../../api/Clashes";
import Clash from "../../components/Clash/Clash";
import UserSession from '../../lib/UserSession/UserSession';

class ClashContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      clash: ClashApi.emptyStruct(),
      currentUser: UserSession.get()
    }
  }

  clashID(){
    return this.props.match.params.clashId;
  }

  async loadClash(){
    const clash = await ClashApi.get(this.clashID());
    this.setState({clash});
  }

  componentDidMount(){
    this.loadClash();
  }

  render(){
    const clash = this.state.clash;
    console.log("USerSesh", this.state.currentUser)

    return (
      <Clash clash={clash} />
    )
  }
}

export default ClashContainer;