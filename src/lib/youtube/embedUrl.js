import React from "react";
import getUrlId from "./getUrlId";

const embedUrl = (url) => {
  try {
    const youTubeId = getUrlId(url);
    return "https://www.youtube.com/embed/" + youTubeId + "?showinfo=0";
  } catch (e) {
    return (
      <img
        src={
          "https://res.cloudinary.com/soundclash/image/asset/track-image-placeholder-864e783295f88d2cb8e4cb71f4b61dac.svg"
        }
        alt="Waiting.."
      />
    );
  }
};

export default embedUrl;
