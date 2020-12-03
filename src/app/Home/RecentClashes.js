import React, { useEffect } from "react";
import ClashTile from "./ClashTile";
import Loading from "../shared/Loading";
import ConnectStore from "../../lib/ConnectStore";
import { fetchRecentClashesAction } from "../../actions";

const RecentClashes = ({ dispatch, recentClashes }) => {
  useEffect(() => {
    dispatch(fetchRecentClashesAction);
  }, [dispatch]);

  const clashTiles = () => {
    if (!recentClashes.loading) {
      const clashTiles = recentClashes.data.map((clash) => (
        <ClashTile key={`clash-${clash.id}`} clash={clash} />
      ));
      return clashTiles;
    } else {
      return <Loading />;
    }
  };

  return (
    <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey pt-3">
      <div className="container-fluid bg-grey">
        <div className="container-gutters">
          <h2 className="px-2 p-3">Recent Clashes</h2>
          <div className="row">{clashTiles()}</div>
        </div>
      </div>
    </main>
  );
};

export default ConnectStore(RecentClashes);
