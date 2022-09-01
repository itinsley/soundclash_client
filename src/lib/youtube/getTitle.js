import axios from "axios";
import getUrlId from "./getUrlId";

const getTitle = async (url) => {
  const youTubeId = getUrlId(url);
  const baseUrl = "https://content.googleapis.com/youtube/v3";
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;

  const response = await axios.get(
    `${baseUrl}/videos?id=${youTubeId}&part=snippet&key=${key}`
  );
  if (response.data.items.length > 0) {
    return response.data.items[0].snippet.title;
  } else {
    throw new Error("Unrecognised video URL");
  }
};

export default getTitle;
