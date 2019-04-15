import React, {Component} from "react";
import Clashes from "../../api/Clashes";
import ClashTile from "../../components/Clash/ClashTile";
import spinner from "../../assets/spinner.gif";

class MyClashes extends Component{
  constructor(props){
    super(props);
    this.state = {
      myClashes: [],
      loading:true
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
      {myClashes,
      loading: false}
    )
  }

  render(){
    const clashTiles =()=>{
      if (this.state.loading){
        return <img src={spinner} alt="waiting.." />
      }
      if (this.state.myClashes.length>0){
        const clashTiles = this.state.myClashes.map(clash=> <ClashTile key={`clash-${clash.id}`} clash={clash} showFooter={true}/>)
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