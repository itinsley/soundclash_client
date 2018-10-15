import React, { Component } from 'react';
import axios from 'axios';
import './Track.css';

class Track extends Component {

  constructor(props){
    super(props);
    this.state={
      track:{
        comments:[]
      }
    }
  }

  componentDidMount(){

    const me = this;
    const id = this.props.match.params.id;

    getTracks(id).then((track)=>{
      console.log(track);
      me.setState ({
        track: track
      });
    });
  }

  render(){
    return (
      <div>
        <TrackTile track={this.state['track']} />
      </div>
    )
  }


}

function TrackTile(props){
  return (
    <div>
      <div>NAME: {props.track.name}</div>
      <div>URL: {props.track.url}</div>
      <div><img alt={'Youtube image for ' + props.track.name} src={props.track.thumbnail}/></div>
      <hr/>
      <div>
        <div><b>COMMENTS</b></div>
        <div>
          {props.track.comments.map((comment, i) => <CommentTile key={comment.id} comment={comment}/>)}
        </div>
      </div>
    </div>

  );
}

function CommentTile(props){
  return (
    <div>
      <div>ID: {props.comment.id}</div>
      <div>USER: {props.comment.user.name}</div>
      <div>{props.comment.comment_text}</div>
      <hr/>
    </div>

  );
}


function getTracks(id){
  console.log("ID:"+id)

  return new Promise(function(resolve, reject) {
    axios.get('/tracks/' + id + '.json').then((response)=>{
      resolve(response['data']);
    })
  })

}

export default Track;