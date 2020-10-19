import React, {Component} from "react";
import ClashTile from "./ClashTile";
import spinner from "../../assets/spinner.gif";

class RecentClashes extends Component{
  clashTiles =()=>{
    const recentClashes = this.props.recentClashes.data;
    if (recentClashes.length>0){
      const clashTiles = recentClashes.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} />)
      return clashTiles
    } else {
      return <img src={spinner} style={{width:'100%', maxWidth:'300px'}} alt="waiting.." />
    }
  }

  render(){
    return (
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey pt-3">
        <div className="container-fluid bg-grey">
          <h2 className="px-2 p-3">Recent Clashes</h2>
          <div className="row">
            {this.clashTiles()}
          </div>
        </div>
      </main>
    )
  }
}

export default RecentClashes;