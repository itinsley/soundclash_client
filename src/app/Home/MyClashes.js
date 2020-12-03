import React, { useEffect } from "react";
import ClashTile from "./ClashTile";
import loading from "../../assets/loading.svg";
import { fetchMyClashesAction } from "../../actions";
import ConnectStore from "../../lib/ConnectStore";

const MyClashes = ({ myClashes, dispatch }) => {
  useEffect(() => {
    dispatch(fetchMyClashesAction);
  }, [dispatch]);

  const clashTiles = () => {
    if (myClashes.loading) {
      return (
        <img
          src={loading}
          style={{ width: "100%", maxWidth: "300px" }}
          alt="waiting.."
        />
      );
    }
    if (myClashes.data.length > 0) {
      const clashTiles = myClashes.data.map((clash) => (
        <ClashTile key={`clash-${clash.id}`} clash={clash} showFooter={true} />
      ));
      return clashTiles;
    } else {
      return (
        <div>
          You have not created any clashes yet. Submit the form above to
          challenge someone to a Soundclash.
        </div>
      );
    }
  };

  return (
    <main className="container-fluid main-content col-lg-12 col-md-12 col-sm-12 px-5 bg-grey-1">
      <div className="container-fluid bg-grey-1">
        <div className="container-gutters">
          <h1 className="t-myclashes-header px-2 p-3">My Clashes</h1>
          <div className="t-myclashes-container row">{clashTiles()}</div>
        </div>
      </div>
    </main>
  );
};

export default ConnectStore(MyClashes);
