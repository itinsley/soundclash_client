import React, { Component } from 'react';
import axios from 'axios';

class Clash extends Component {

  constructor(props) {
    super(props);
    this.state=
    {clash:
      {rounds:[
        { id: 0,
          owner_track:{},
          opponent_track:{}
        }]
      }
    }
  }

  componentDidMount(){
    //Is this an anti-pattern
    const me = this;

    const id = this.props.match.params.id;
    getClash(id).then((clash)=>{
      me.setState ({
        clash: clash
      });
    })
  }

  render() {
    // const rounds = this.state['clash']['rounds']
    return (
      <div>
        <div>
          <h1>{this.state['clash']['name']}
          </h1>
          <ClashTile clash={this.state['clash']} />
        </div>
      </div>
    );
  }
}

function ClashTile(props){
  return (
    <div>
      <div>NAME: {props.clash.name}</div>
      <div>OWNER: {props.clash.owner}</div>
      <div>OPPONENT: {props.clash.opponent}</div>
      <div>COMMENTS_COUNT: {props.clash.comments_count}</div>
      <div>LAST_TRACK: {props.clash.last_track_url}</div>
      <div>THUMBNAIL: {props.clash.thumbnail}</div>
      <div>URI: {props.clash.uri}</div>
      <hr />
      <div>
        {props.clash['rounds'].map((round, i) => <RoundTile key={'round'+round.id} round={round}/>)}
      </div>
    </div>

  );
}

function RoundTile(props){
  return (
    <div>
      <div>ROUND INDEX: {props.round.index}</div>
      <div>
      <b>OWNER</b>
        <TrackTile key={'track'+props.round.owner_track.id} track={props.round.owner_track}/>
      </div>
      <div>
      <b>OPPONENT</b>
        <TrackTile key={'track'+props.round.opponent_track.id} track={props.round.opponent_track}/>
      </div>
      <hr />
    </div>
  );
}

function TrackTile(props){

  return (
    <div>
      <div>ID: {props.track.id}</div>
      <div><a href={'/client/tracks/' + props.track.id}>{props.track.name}</a></div>
      <div>URL: {props.track.url}</div>
      <div>UNAVAILABLE: {props.track.unavailable+' '}</div>
      <div>THUMBNAIL: {props.track.thumbnail}</div>

    </div>
  );
}

function getClash(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/clashes/' + id + '.json').then((response)=>{
      resolve(response['data']);
    })
  })
}

export default Clash;