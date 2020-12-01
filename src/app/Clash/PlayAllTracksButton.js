import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PlayAllTracks = ({ clash }) => {
  return (
    <div>
      <Link
        className="btn-play-all text-center"
        to={`/clashes/${clash.id}/playlist`}
        target="_blank"
      >
        <FontAwesomeIcon icon={faPlayCircle} size="lg" />
        <span className="pl-2">Play all tracks</span>
      </Link>
    </div>
  );
};

export default PlayAllTracks;
