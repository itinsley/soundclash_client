import React, {Component, Fragment} from "react";
import RecentClashes from '../components/RecentClashes';
import MyClashes from '../components/MyClashes'

function MyClashesWrapper(props){
  if(props.currentUser){
    return <MyClashes myClashes = {props.myClashes} />
  }
  return null
}

class Home extends Component{
  render(){
    return (
      <Fragment >
        <div className="top-element-margin"></div>
        <MyClashesWrapper myClashes={this.props.myClashes} 
                          currentUser={this.props.currentUser}/>
        <RecentClashes recentClashes={this.props.recentClashes}/>
      </Fragment>
    )
  }
}
export default Home;