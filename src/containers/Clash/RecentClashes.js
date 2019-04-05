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
      <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey mt-5">
        <div className="container-fluid bg-grey">
          <h1 className="px-2 p-3">Recent Clashes</h1>
          <div className="row">
            {clashTiles}
          </div>
        </div>
      </main>
    )
  }
}

export default RecentClashes;