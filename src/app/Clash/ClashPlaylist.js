import React, { useEffect, useState } from "react";
import loadingImg from "../../assets/loading.svg";
import ConnectStore from "../../lib/ConnectStore";
import { ClashApi, TrackApi } from "../../api";
import sortByCreatedAt from "../../lib/sortByCreatedAt";
import getUrlVars from "../../lib/getUrlVars";
import Avatar from "../shared/Avatar";
import OpponentAvatar from "../shared/OpponentAvatar";

const ClashPlaylist = ({ match }) => {
  const clashId = match.params.clashId;
  const [tracks, setTracks] = useState([]);
  const [clash, setClash] = useState({ name: "", loading: true });

  useEffect(() => {
    ClashApi.get(clashId).then((clash) => setClash(clash));
    TrackApi.forClash(clashId).then((tracks) => setTracks(tracks));
  }, [clashId]);

  const youtubeIds = () => {
    return sortByCreatedAt.desc(tracks).map((t) => {
      const id = getUrlVars(t.youtube_url)["v"];
      return id;
    });
  };

  if (clash.loading === true) {
    return (
      <div className="container-fluid bg-grey text-center">
        <img src={loadingImg} alt="waiting.." />
      </div>
    );
  } else {
    return (
      <div
        className="container-gutters mx-auto text-center top-element-margin"
        style={{ maxWidth: "56.25rem" }}
      >
        <h2 className="px-2 pt-5">{clash.name}</h2>
        <h4 className="p-2 text-muted">
          YouTube playlist. Hit play to listen.
        </h4>
        <h6 className="card-subtitle mb-2 text-muted">
          <div className="text-center pb-3">
            <span className="text-size-xx-small p-2">
              <Avatar
                user={clash.owner}
                description="Comment user avatar"
                size="35"
              />
              <strong>{clash.owner_name}</strong>
            </span>
            <span>vs.</span>
            <span className="text-size-xx-small p-2">
              {OpponentAvatar(clash)}
            </span>
          </div>
        </h6>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title={`Soundclash Playlist:: ${clash.name}`}
            className="embed-responsive-item"
            allowFullScreen={false}
            src={`https://www.youtube.com/embed?autoplay=1&playlist=${youtubeIds()}&controls=1`}
          ></iframe>
        </div>
      </div>
    );
  }
};

export default ConnectStore(ClashPlaylist);
