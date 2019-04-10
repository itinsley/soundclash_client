import React, {Component} from "react";
import Clashes from "../../api/Clashes";
import ClashTile from "../../components/Clash/ClashTile";
import spinner from "../../assets/spinner.gif";

class MyClashes extends Component{
  constructor(props){
    super(props);
    this.state = {
      myClashes: [
      ]
    }

    this.loadClashes = this.loadClashes.bind(this);
  }

  componentDidMount(){
    this.loadClashes();
  }

  async loadClashes(){
    const jwt = this.props.currentUser.jwt;
    const myClashes = await Clashes.forUser(jwt)
    this.setState(
      {myClashes}
    )
  }

  render(){
    const clashTiles =()=>{
      if (this.state.myClashes.length>0){
        const clashTiles = this.state.myClashes.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} showFooter={true}/>)
        return clashTiles
      } else {
        return <img src={spinner} alt="waiting.." />
      }
    }
    return (
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey-1 mt-5">
        <div className="container-fluid bg-grey-1">
          <h1 className="px-2 p-3">My Clashes</h1>
          <div className="row">
            {clashTiles()}
          </div>
        </div>
      </main>
    )
  }
}

export default MyClashes;