import React, { useEffect, Fragment, useState } from "react";
import loadingImg from "../../assets/loading.svg";
import ConnectStore from "../../lib/ConnectStore";
import ClashApi from "../../api/Clashes";
import sortByCreatedAt from "../../lib/sortByCreatedAt";
import getUrlVars from "../../lib/getUrlVars";

const ClashPlaylist = ({ match }) => {
  const clashId = match.params.clashId;
  const [clash, setClash] = useState(null);

  useEffect(() => {
    ClashApi.get(clashId).then((clash) => {
      setClash(clash);
    });
  }, [clashId]);

  const youtube_ids = () => {
    // Sort is not working Correctly
    // It is also having scaling issues to an extent too on big clashes.
    // Need to add paging

    return sortByCreatedAt.desc(clash.tracks).map((t) => {
      const id = getUrlVars(t.youtube_url)["v"];
      console.log("id", id);
      return id;
    });
  };

  if (clash == null) {
    return (
      <div className="container-fluid bg-grey text-center">
        <img src={loadingImg} alt="waiting.." />
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className="top-element-margin"></div>
        <div>
          <iframe
            className="youtube-playlist"
            allowFullScreen={true}
            src={`https://www.youtube.com/embed?autoplay=1&playlist=${youtube_ids()}`}
          ></iframe>
        </div>
      </Fragment>
    );
  }
};

export default ConnectStore(ClashPlaylist);
