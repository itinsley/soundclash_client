import React, {Component} from "react";
import ClashApi from "../../api/Clashes";
import Youtube from "../../lib/YouTube";

class Clash extends Component{
  constructor(props){
    super(props)
    this.state={
      clash: ClashApi.emptyStruct()
    }
    this.state.clash.name="clashy mcclashy clash"
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
    console.log(clash)

    return (
      <main className="container-fluid main-content mt-5 px-0">

        <div className="container mx-auto text-center " style={{maxWidth: '56.25rem'}}>
          <h1 className="px-2 p-3">{this.state.clash.name}</h1>
          <h6 className="card-subtitle mb-2 text-muted">
            {clash.owner} vs. {clash.opponent}
          </h6>
          <div className='text-center pb-3'>
            <span className='text-size-xx-small'>
              <img alt="Comments Icon" src="https://res.cloudinary.com/soundclash/image/asset/comment-f01f9b1834a2e2bc80dae34d5cf70df3.svg" 
                width="20"/>
              {` ${clash.comments_count} comments`}
            </span>
            <span className='text-size-xx-small'>
              <img alt="Tracks Icon" src="https://res.cloudinary.com/soundclash/image/asset/vinyl-record-a40f320b60a2c98f4e4479f85ee1d218.svg" 
                width="20"/>
                {` ${clash.tracks_count} tracks`}
            </span>
          </div>
        </div>

        <div className="container-fluid bg-grey px-0">
          <div className='row p-4'>
            <div className='col-sm text-center'> 
              <h2 className='text-truncate p-4 clash-item__header'>{clash.rounds[0].owner_track.name}</h2>
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item p-3" 
                          src = {Youtube.EmbedUrl(clash.rounds[0].owner_track.url)}
                          allowfullscreen>
                  </iframe>
                </div>
            </div>
            <div className='col-sm text-center'> 
              <h2 className='text-truncate p-4 clash-item__header'>{clash.rounds[0].opponent_track.name}</h2>
              <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item p-3" 
                          src = {Youtube.EmbedUrl(clash.rounds[0].opponent_track.url)}
                          allowfullscreen>
                  </iframe>
                </div>
            </div>
          </div>
        </div>
      </main>

    )
  }
}

export default Clash;