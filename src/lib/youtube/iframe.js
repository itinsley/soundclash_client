import React, { Fragment } from "react";
import spinner from "../../assets/spinner.gif";

const iframe = (url, track_name) => {
  if (!url || !/.*youtube.*/.test(url)) {
    return <img src={spinner} alt="Logo" />;
  }

  return (
    <Fragment>
      <h2 className="t-track-title text-truncate p-4 clash-item__header">
        {track_name}
      </h2>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          title={track_name}
          src={url}
        ></iframe>
      </div>
    </Fragment>
  );
};

export default iframe;
