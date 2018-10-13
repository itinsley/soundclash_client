import React, { Component } from 'react';
import axios from 'axios';

class Clash extends Component {

  constructor(props) {
    super(props);
    this.state={clash: {}}
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
      <div>{props.clash.name}</div>
      <div>{props.clash.owner}</div>
      <div>{props.clash.opponent}</div>
      <div>{props.clash.comments_count}</div>
      <div>{props.clash.last_track_url}</div>
      <div>{props.clash.thumbnail}</div>
      <div>{props.clash.uri}</div>
    </div>
  );
}

function getClash(id) {
  return new Promise(function(resolve, reject) {
    axios.get('/clashes/' + id).then((response)=>{
      resolve(response['data']);
    })
  })
}

export default Clash;