import React, {Component, Fragment} from "react";
import RecentClashes from '../components/RecentClashes';
import MyClashes from '../components/MyClashes'
import UserSession from '../../../lib/UserSession/UserSession';

function MyClashesWrapper(props){
  const currentUser = UserSession.get();
  if(currentUser){
    return <MyClashes currentUser={currentUser}
                      myClashes = {props.myClashes} />
  }
  return null
}

class Home extends Component{
  render(){
    return (
      <Fragment >
        <div className="top-element-margin"></div>
        <MyClashesWrapper myClashes={this.props.myClashes} />
        <RecentClashes />
      </Fragment>
    )
  }
}
export default Home;