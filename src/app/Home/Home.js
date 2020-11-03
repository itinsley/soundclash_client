import React, { Fragment } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import RecentClashes from "./RecentClashes";
import MyClashes from "./MyClashes";
import CreateClash from "./CreateClash";
import ConnectStore from "../../lib/ConnectStore";

const Home = ({ currentUser, myClashes, recentClashes, dispatch }) => {
  return (
    <Fragment>
      <div className="top-element-margin"></div>
      <CreateClash />
      {currentUser && <MyClashes myClashes={myClashes} />}
      <RecentClashes recentClashes={recentClashes} />
    </Fragment>
  );
};
export default withAuth0(ConnectStore(Home));
