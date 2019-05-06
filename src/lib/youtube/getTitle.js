import axios from "axios";
import getUrlVars from "./getUrlVars";

const getTitle= async (url) => {
  const youTubeId = getUrlVars(url)["v"];
  const baseUrl = "https://content.googleapis.com/youtube/v3";
  const key = process.env.REACT_APP_YOUTUBE_API_KEY;
  console.log(process.env)

  const response = await axios.get(`${baseUrl}/videos?id=${youTubeId}&part=snippet&key=${key}`);
  if (response.data.items.length>0){
    return response.data.items[0].snippet.title;
  } else {
    throw new Error("Unrecognised video URL");
  }
}

export default getTitle;