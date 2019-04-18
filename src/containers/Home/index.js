import React, { Component, Fragment } from 'react';
import '../../App.css';
import Home from './components/Home';
import Clashes from "../../api/Clashes";
import UserSession from "../../lib/UserSession/UserSession";

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
    const currentUser = UserSession.get();
    if (currentUser){
      const myClashes = await Clashes.forUser(currentUser.jwt);
      this.setState(
        {
          myClashes: {
            data: myClashes,
            loading: false
          }
        }
      )
    }
  }
    
  render() {
    const currentUser = UserSession.get();
    return (
      <Home myClashes={this.state.myClashes} currentUser={currentUser}/>
    );
  }
}

export default HomeContainer;