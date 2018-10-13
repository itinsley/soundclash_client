import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state={clashes: []}
  }

  componentDidMount(){
    //Is this an anti-pattern
    const me = this;

    getClashes().then(function(clashes){
      me.setState ({
        clashes: clashes
      });
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Soundclash home page.</h1>
        </div>
        <div>
          <table border='1'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Owner</td>
                <td>Opponent</td>
                <td>Comments</td>
                <td>last_track</td>
                <td>thumbnail</td>
              </tr>
            </thead>
            <tbody>
              {this.state['clashes'].map((clash, i) => <ClashRow clash={clash}/>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function ClashRow(props){
  return (
    <tr>
      <td>{props.clash.name}</td>
      <td>{props.clash.owner}</td>
      <td>{props.clash.opponent}</td>
      <td>{props.clash.comments_count}</td>
      <td>{props.clash.last_track_url}</td>
      <td>{props.clash.thumbnail}</td>
    </tr>
  );
}

function getClashes() {
  return new Promise(function(resolve, reject) {
    axios.get('/clashes.json').then((response)=>{
      resolve(response['data']);
    })
  })
}

export default Home;