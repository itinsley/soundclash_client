import React, { Component, Fragment } from 'react';
import '../../App.css';
import Home from './components/Home';
import Clashes from "../../api/Clashes";

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      myClashes: {
        data: [],
        loading:true
      }
    }
  }

  componentDidMount(){
    this.loadClashes();
  }
  
  async loadClashes(){
    console.log("loading clashes ")
    const jwt = this.props.currentUser ? this.props.currentUser.jwt:'';
    const myClashes = await Clashes.forUser(jwt)
    this.setState(
      {
        myClashes: {
          data: myClashes,
          loading: false
        }
      }
    )
  }
    
  render() {
    return (
      <Home myClashes={this.state.myClashes} />
    );
  }
}

export default HomeContainer;