import getUrlVars from "../getUrlVars";

const getUrlId = (url) => {
  if (url.match(/.*youtube.com.*/)) {
    return getUrlVars(url)["v"];
  }

  if (url.match(/.*youtu.be.*/)) {
    const parts = url.split("/");
    return parts[parts.length - 1];
  }
  console.log("Youtube URL provided is unrecognised");
  throw new Error("Youtube URL provided is unrecognised");
};

export default getUrlId;
