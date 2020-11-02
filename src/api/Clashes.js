import axios from "axios";

const recent = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/clashes`
  );
  return response.data.data;
};

const get = async (clashId, jwt = "") => {
  const response = await axios.get(
    `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/clashes/${clashId}`
  );
  return response.data.data;
};

const forUser = async (jwt) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/user/current/clashes`,
    {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    }
  );
  return response.data.data;
};

const getChallenge = async (uniqueRef) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/clash_challenges/${uniqueRef}`
  );
  return response.data.data;
};

/**
 *
 * @param {string} jwt
 * @param {string} clash.name
 * @param {string} clash.commentText
 * @param {string} clash.youTubeUrl
 * @param {string} clash.trackName
 * @param {string} clash.opponentEmailAddress
 */
const create = async (jwt, clash) => {
  const launchClash = {
    launch_clash: {
      clash_name: clash.name,
      comment_text: clash.commentText,
      track_name: clash.trackName,
      youtube_track_url: clash.youTubeUrl,
      opponent_email_address: clash.opponentEmailAddress,
    },
  };
  const uri = `${process.env.REACT_APP_SOUNDCLASH_API_BASE_URI}/clashes`;
  return await axios.post(uri, launchClash, {
    headers: {
      Authorization: `bearer ${jwt}`,
    },
  });
};

export default {
  create,
  forUser,
  get,
  getChallenge,
  recent,
};
