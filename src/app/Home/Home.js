import React, {Component, Fragment} from "react";
import { withAuth0 } from '@auth0/auth0-react';
import RecentClashes from './RecentClashes';
import MyClashes from './MyClashes';
import CreateClashContainer from './CreateClashContainer';
import {fetchMyClashesAction, fetchRecentClashesAction} from '../../actions';
import ConnectStore from '../../lib/ConnectStore';


class Home extends Component{
  constructor(props){
    super(props);
    this.onLoad();
  }

  onLoad (){
    this.props.dispatch(fetchMyClashesAction)
    this.props.dispatch(fetchRecentClashesAction)
  }

  render(){
    return (
      <Fragment >
        <div className="top-element-margin"></div>
        {<CreateClashContainer />}
        {this.props.currentUser && <MyClashes myClashes = {this.props.myClashes} />}
        <RecentClashes recentClashes={this.props.recentClashes}/>
      </Fragment>
    )
  }
}
export default withAuth0(ConnectStore(Home));