import React, {Component} from "react";
import Clashes from "../../../api/Clashes";
import ClashTile from "./ClashTile";
import spinner from "../../../assets/spinner.gif";

class RecentClashes extends Component{
  constructor(props){
    super(props);
    this.state = {
      recentClashes: [
      ]
    }

    this.loadClashes = this.loadClashes.bind(this);
  }

  componentDidMount(){
    this.loadClashes();
  }

  async loadClashes(){
    const recentClashes = await Clashes.recent();
    this.setState(
      {recentClashes}
    )
  }

  render(){
    const clashTiles =()=>{
      if (this.state.recentClashes.length>0){
        const clashTiles = this.state.recentClashes.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} />)
        return clashTiles
      } else {
        return <img src={spinner} alt="waiting.." />
      }
    }
    return (
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey pt-3">
        <div className="container-fluid bg-grey">
          <h1 className="px-2 p-3">Recent Clashes</h1>
          <div className="row">
            {clashTiles()}
          </div>
        </div>
      </main>
    )
  }
}

export default RecentClashes;