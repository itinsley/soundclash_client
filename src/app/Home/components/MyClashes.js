import React, {Component} from "react";
import ClashTile from "./ClashTile";
import spinner from "../../../assets/spinner.gif"

class MyClashes extends Component{

  render(){
    const clashTiles =()=>{
      if (this.props.myClashes.loading){
        return <img src={spinner} alt="waiting.." />
      }
      if (this.props.myClashes.data.length>0){
        const clashTiles = this.props.myClashes.data.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} showFooter={true}/>)
        return clashTiles
      } else {
        return <div>
          You have not created any clashes yet. Submit the form above to challenge someone to a Soundclash.
        </div>
      }
    }
    return (
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey-1">
        <div className="container-fluid bg-grey-1">
          <h1 className="t-myclashes-header px-2 p-3">My Clashes</h1>
          <div className="t-myclashes-container row">
            {clashTiles()}
          </div>
        </div>
      </main>
    )
  }
}

export default MyClashes;