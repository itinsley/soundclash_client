import axios from 'axios';

const recent = async()=>{
  const response = await axios.get('/clashes.json');
  return response.data;
}

const get = async(clashId, jwt='')=>{
  const response = await axios.get(`/clashes/${clashId}.json?jwt=${jwt}`);
  return response.data;
}

const forUser = async(jwt)=>{
  const response = await axios.get(`/api/user/clashes.json?jwt=${jwt}`);
  return response.data;
}

/**
 *
 * @param {string} jwt
 * @param {string} clash.name
 * @param {string} clash.commentText
 * @param {string} clash.youTubeUrl
 * @param {string} clash.trackName
 * @param {string} clash.opponentEmailAddress
 */
const create = async(jwt, clash)=>{
  // Unfortunately, because Rails, slightly awkward document format
  const launchClash = {launch_clash:
    {
      clash:
      {
        opponent_email_address: clash.opponentEmailAddress,
        name: clash.name
      },
      comment:
      {
        comment_text: clash.commentText
      },
      owner_track:
      {
        url: clash.youTubeUrl,
        name: clash.trackName
      }
    }
  }

  const uri = `/clashes.json?jwt=${jwt}`
  const response = await axios.post(uri, launchClash);
  return response;
}

export default {
  recent,
  get,
  forUser,
  create
}