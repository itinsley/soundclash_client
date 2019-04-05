import React, {Component} from "react";
import Clashes from "../../api/Clashes";


// Change a list into an array of lists, size defined by colCount
// Used for turning a one dimensional list into multiple rows 
function toChunks(list, colCount){
  const size = (list.length / colCount)>0?Math.ceil(list.length / colCount):1
  const rows = [...Array(size)];
  return rows.map( (row, idx) => list.slice(idx * colCount, idx * colCount + colCount) );
}

class RecentClashes extends Component{
  constructor(props){
    super(props);
    this.state = {
      recentClashes: [
        { name: 'xxx',
          id: '0',
          owner: 'ian',
          opponent: 'jay'
        }
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
    const clashTiles = this.state.recentClashes.map(clash=>{
      return (
        <div key={`clash-${clash.id}`} className="card col-sm-3 p-2 border-0 bg-grey" >
          <div className="card-body bg-white">
            <h5 className="card-title text-truncate">{clash.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {clash.owner} vs. {clash.opponent}
            </h6>
            <div className="card-text">
            <img style={{maxWidth:'100%'}} 
                  alt={`Track thumbnail image for ${clash.name}`}
                  src={clash.thumbnail}></img>
            </div>
            <div className='row'>
              <span className='col-sm-6 text-size-xx-small'>
                <img alt="Comments Icon" src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" 
                  width="20"/>
                {` ${clash.comments_count} comments`}
              </span>
              <span className='col-sm-6 text-size-xx-small'>
                <img alt="Tracks Icon" src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg" 
                  width="20"/>
                  {` ${clash.tracks_count} tracks`}
              </span>


            </div>            
          </div>
        </div>
      );
    })

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