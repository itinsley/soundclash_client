import React from "react";
// import spinner from "../assets/spinner";

const EmbedUrl = (url) => {
  try{
    const youTubeId = getUrlVars(url)["v"];
    return "https://www.youtube.com/embed/" + youTubeId + "?showinfo=0";
  } catch(e) {
    return <img src={'https://res.cloudinary.com/soundclash/image/asset/track-image-placeholder-864e783295f88d2cb8e4cb71f4b61dac.svg'} alt="Waiting.." />;
  }
}

function getUrlVars(url)
{
    var vars = [], hash;
    var hashes =url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

export default {
  EmbedUrl
}