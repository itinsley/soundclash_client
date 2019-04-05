import React, {Component} from "react";
import Clashes from "../../api/Clashes";
import ClashTile from "../../components/Clash/ClashTile";

class RecentClashes extends Component{
  constructor(props){
    super(props);
    this.state = {
      recentClashes: [
        Clashes.emptyStruct()
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
    const clashTiles = this.state.recentClashes.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} />)
    return (
      <div className="container-fluid bg-grey">
        <h1 className="px-2 p-3">Recent Clashes</h1>
        <div className="row">
          {clashTiles}
        </div>
      </div>
    )
  }
}

export default RecentClashes;