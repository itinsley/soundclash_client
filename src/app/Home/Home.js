import React, {Component, Fragment} from "react";
import RecentClashes from './RecentClashes';
import MyClashes from './MyClashes';
import Challenge from './Challenge';

class Home extends Component{
  constructor(props){
    super(props);
    this.props.onLoad();
  }
  render(){
    return (
      <Fragment >
        <div className="top-element-margin"></div>
        {this.props.currentUser && <Challenge currentUser = {this.props.currentUser} />}
        {this.props.currentUser && <MyClashes myClashes = {this.props.myClashes} />}
        <RecentClashes recentClashes={this.props.recentClashes}/>
      </Fragment>
    )
  }
}
export default Home;